import { Web3Provider } from '@ethersproject/providers';
import { CloudIcon } from '@heroicons/react/outline';
import Patch from '@patch-technology/patch';
import { ContractContainer } from '@popcorn/ui/components/popcorn/emissions-dashboard/ContractContainer/index';
import { DateRangePicker } from '@popcorn/ui/components/popcorn/emissions-dashboard/DateRangePicker';
import { NavBar } from '@popcorn/ui/components/popcorn/emissions-dashboard/NavBar/index';
import { TotalStats } from '@popcorn/ui/components/popcorn/emissions-dashboard/TotalStats/index';
import {
  Contract,
  ContractEmissions,
  EmissionEstimate,
  StatCardData,
  Transaction,
  TransactionGroupSummary,
} from '@popcorn/ui/interfaces/emissions-dashboard';
import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router';
import fetch from 'node-fetch';
import React, { useEffect, useState } from 'react';
import { Globe, Wind } from 'react-feather';
import toast, { Toaster } from 'react-hot-toast';
import { percentChange } from 'utils/percentChange';
import web3 from 'web3';

const patch = Patch(process.env.PATCH_API_KEY);
const GWEI_ETH_MULTIPLIER = Math.pow(10, 9);
const WEI_ETH_MULTIPLIER = Math.pow(10, 18);
const MICROGRAM_GRAM_CONVERTER = Math.pow(10, 6);

// TODO: Call toast methods upon success/failure
const success = (msg: string) => toast.success(msg);
const loading = (msg: string) => toast.loading(msg);
const error = (msg: string) => toast.error(msg);
const NUM_FULL_PERIODS = 19;
const DEFAULT_CONTRACTS = [
  { name: 'POP', address: '0xd0cd466b34a24fcb2f87676278af2005ca8a78c4' },
  {
    name: 'yvCurve-USDN',
    address: '0x3b96d491f067912d18563d56858ba7d6ec67a6fa',
  },
  {
    name: 'yvCurve-DUSD',
    address: '0x30fcf7c6cdfc46ec237783d94fc78553e79d4e9c',
  },
  {
    name: 'yvCurve-FRAX',
    address: '0xb4ada607b9d6b2c9ee07a275e9616b84ac560139',
  },
  {
    name: 'yvCurve-UST',
    address: '0x1c6a9783f812b3af3abbf7de64c3cd7cc7d1af44',
  },
];

const EMPTY_STAT_CARDS: StatCardData[] = [
  {
    id: 1,
    name: 'CO2 Emissions (µg)',
    stat: 0,
    icon: CloudIcon,
    change: '0',
    changeType: 'increase',
  },
  {
    id: 2,
    name: 'Transactions',
    stat: 0,
    icon: Globe,
    change: '0',
    changeType: 'increase',
  },
];

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

export const navigation = [{ name: 'Dashboard', href: '#', current: true }];

export const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];

const getBlockNumberByTimestamp = async (
  timestamp: number,
): Promise<number> => {
  const requestUrl = `https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=${timestamp}&closest=before&apikey=${process.env.ETHERSCAN_API_KEY}`;
  return await fetch(requestUrl)
    .then((res) => res.json())
    .then((json) => json.result)
    .catch((error) => console.log('error', error));
};

const getBlockTimestamp = async (blockNumber: number): Promise<number> => {
  const requestUrl = `https://api.etherscan.io/api?module=block&action=getblockreward&blockno=${blockNumber}apikey=${process.env.ETHERSCAN_API_KEY}`;
  const result = await fetch(requestUrl)
    .then((res) => res.json())
    .then((json) => json.result)
    .catch((error) => console.log('error', error));
  return result.timeStamp;
};

const getBlockDateEstimate = (
  i: number,
  totalNumberOfBlocks: number,
  startTimestamp: number,
  endTimestamp: number,
): Date => {
  const timestampEstimationUnixTime = Math.floor(
    startTimestamp +
      (i / totalNumberOfBlocks) * (endTimestamp - startTimestamp),
  );
  const timestampEstimateISOString = new Date(
    timestampEstimationUnixTime * 1000,
  );
  return timestampEstimateISOString;
};

const IndexPage = (): JSX.Element => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const context = useWeb3React<Web3Provider>();
  const { library, activate, active } = context;

  const [contracts, setContracts] = useState<Contract[]>(DEFAULT_CONTRACTS);
  const [previousPeriodStartDate, setPreviousPeriodStartDate] = useState<Date>(
    new Date('2021-05-01T00:00:00Z'),
  );
  const [startDate, setStartDate] = useState<Date>(
    new Date('2021-06-15T00:00:00Z'),
  );
  const [endDate, setEndDate] = useState<Date>(
    new Date('2021-08-01T00:00:00Z'),
  );

  const [emissionEstimates, setEmissionsEstimates] =
    useState<EmissionEstimate[]>();
  const [previousPeriodStartBlock, setPreviousPeriodStartBlock] =
    useState<number>(11564729);
  const [startBlock, setStartBlock] = useState<number>(12338493);
  const [endBlock, setEndBlock] = useState<number>(13133291);
  const [blockRanges, setBlockRanges] = useState<number[][]>();
  const [transactionsPreviousPeriod, setTransactionsPreviousPeriod] = useState<
    Transaction[]
  >([]);
  const [transactionsCurrentPeriod, setTransactionsCurrentPeriod] = useState<
    Transaction[]
  >([]);
  const [
    transactionsPreviousPeriodWithEmissions,
    setTransactionsPreviousPeriodWithEmissions,
  ] = useState<Transaction[]>([]);
  const [
    transactionsCurrentPeriodWithEmissions,
    setTransactionsCurrentPeriodWithEmissions,
  ] = useState<Transaction[]>([]);

  const [
    transactionGroupSummariesPreviousPeriod,
    setTransactionGroupSummariesPreviousPeriod,
  ] = useState<ContractEmissions[]>([]);
  const [
    transactionGroupSummariesCurrentPeriod,
    setTransactionGroupSummariesCurrentPeriod,
  ] = useState<ContractEmissions[]>([]);
  const [transactionTotals, setTransactionTotals] = useState<
    TransactionGroupSummary[]
  >([]);
  useEffect(() => {
    cacheEmissionsData();
    updateBlocks();
  }, []);

  useEffect(() => {
    cacheEmissionsData();
    updateBlocks();
  }, [endDate, startDate]);

  useEffect(() => {
    if (blockRanges) {
      getTransactions();
    }
  }, [blockRanges]);

  useEffect(() => {
    if (emissionEstimates) {
      addEmissionsDataToTransactions();
    }
  }, [
    transactionsCurrentPeriod,
    transactionsPreviousPeriod,
    emissionEstimates,
  ]);

  useEffect(() => {
    if (
      transactionsPreviousPeriodWithEmissions.length > 0 &&
      transactionsCurrentPeriodWithEmissions.length > 0 &&
      blockRanges
    ) {
      groupTransactionsPreviousPeriod();
      groupTransactionsCurrentPeriod();
      groupTransactionsTotalStats();
    }
  }, [
    transactionsPreviousPeriodWithEmissions,
    transactionsCurrentPeriodWithEmissions,
  ]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      router.replace(window.location.pathname);
    }
  }, [router.pathname]);

  const updateBlocks = async () => {
    const startTimestamp = startDate.getTime() / 1000;
    const endTimestamp = endDate.getTime() / 1000;
    const startBlock = await Number(
      await getBlockNumberByTimestamp(startTimestamp),
    );
    const endBlock = await Number(
      await await getBlockNumberByTimestamp(endTimestamp),
    );
    const numBlocks = endBlock - startBlock;
    const numBlocksInPeriod = Math.floor(numBlocks / NUM_FULL_PERIODS);
    let blockRanges = new Array(NUM_FULL_PERIODS)
      .fill(undefined)
      .map((x, i) => {
        return [
          startBlock + numBlocksInPeriod * i,
          startBlock + numBlocksInPeriod * (i + 1) - 1,
        ];
      });
    const lastEndBlock = blockRanges[blockRanges.length - 1][1];
    if (lastEndBlock !== endBlock)
      blockRanges.push([lastEndBlock + 1, endBlock]);
    setPreviousPeriodStartBlock(startBlock - (endBlock - startBlock));
    setStartBlock(startBlock);
    setEndBlock(endBlock);
    setBlockRanges(blockRanges);
  };

  const getTransactions = async () => {
    loading('Loading transactions...');
    const transactionsPreviousPeriod = await fetch(
      `.netlify/functions/loadtransactions?startBlock=${previousPeriodStartBlock}&endBlock=${startBlock}`,
    )
      .then((res) => {
        toast.dismiss();
        success('Loaded transactions for previous period ');
        return res.json();
      })
      .catch((err) => {
        toast.dismiss();
        error('Error loading transactions for previous period');
        console.log('error', error);
      });
    const transactionsCurrentPeriod = await fetch(
      `.netlify/functions/loadtransactions?startBlock=${startBlock}&endBlock=${endBlock}`,
    )
      .then((res) => {
        toast.dismiss();
        success('Loaded transactions for current period ');
        return res.json();
      })
      .catch((err) => {
        toast.dismiss();
        error('Error loading transactions for current period');
        console.log('error', error);
      });
    setTransactionsPreviousPeriod(transactionsPreviousPeriod);
    setTransactionsCurrentPeriod(transactionsCurrentPeriod);
  };

  const getTransactionGroupSummary = (
    transactions: Transaction[],
    start,
    end,
    blockIndex,
  ): TransactionGroupSummary => {
    const numTransactions = transactions.length;
    // const startBlockTimestamp = await getBlockTimestamp(start);
    // NOTE: We interpolate block timestamps
    const startBlockDateEstimate = getBlockDateEstimate(
      blockIndex,
      NUM_FULL_PERIODS,
      startDate.getTime() / 1000,
      endDate.getTime() / 1000,
    );
    const gasUsed = transactions.reduce((pr, cu) => {
      return pr + Number(cu.gasUsed);
    }, 0);
    const totalGasPrice = transactions.reduce((pr, cu) => {
      return pr + Number(cu.gasPrice) / GWEI_ETH_MULTIPLIER;
    }, 0);

    const averageGasPrice =
      totalGasPrice === 0 ? 0 : Math.round(totalGasPrice / numTransactions);

    const emissions = Math.round(
      transactions.reduce((pr, cu) => {
        return pr + Number(cu.emissions);
      }, 0),
    );
    return {
      averageGasPrice,
      blockStartDate: startBlockDateEstimate.toLocaleString(),
      co2Emissions: emissions,
      endBlock: end,
      gasUsed,
      numTransactions,
      startBlock: start,
    };
  };

  const groupTransactionsPreviousPeriod = async () => {
    const transactionGroupSummaries = await await Promise.all(
      contracts.map(async (contract) => {
        const transactions = transactionsPreviousPeriodWithEmissions.filter(
          (transaction) => {
            return transaction.to === contract.address;
          },
        );
        const transactionGroupSummary = getTransactionGroupSummary(
          transactions,
          previousPeriodStartBlock,
          startBlock - 1,
          0,
        );
        return {
          contractAddress: contract.address,
          transactionGroupSummaries: [transactionGroupSummary],
        };
      }),
    );
    setTransactionGroupSummariesPreviousPeriod(transactionGroupSummaries);
  };

  const groupTransactionsCurrentPeriod = async () => {
    const transactionGroupSummaries = await await Promise.all(
      contracts.map(async (contract) => {
        const transactionGroups = await Promise.all(
          blockRanges.map(async (blockRange, i) => {
            const start = blockRange[0];
            const end = blockRange[1];
            const transactions = transactionsCurrentPeriod.filter(
              (transaction) => {
                return (
                  Number(transaction.blockNumber) >= start &&
                  Number(transaction.blockNumber) <= end &&
                  transaction.to === contract.address
                );
              },
            );
            return getTransactionGroupSummary(transactions, start, end, i);
          }),
        );
        return {
          contractAddress: contract.address,
          transactionGroupSummaries: transactionGroups,
        };
      }),
    );
    setTransactionGroupSummariesCurrentPeriod(transactionGroupSummaries);
  };

  const groupTransactionsTotalStats = async () => {
    const transactionGroupSummaries = await Promise.all(
      blockRanges.map(async (blockRange, i) => {
        const start = blockRange[0];
        const end = blockRange[1];
        const transactions = transactionsCurrentPeriod.filter((transaction) => {
          return (
            Number(transaction.blockNumber) >= start &&
            Number(transaction.blockNumber) <= end
          );
        });
        return getTransactionGroupSummary(transactions, start, end, i);
      }),
    );
    setTransactionTotals(transactionGroupSummaries);
  };

  const getDateArray = function (start: Date, end: Date): Date[] {
    for (
      var arr = [], dt = new Date(start);
      dt <= end;
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt));
    }
    return arr;
  };

  const cacheEmissionsData = async () => {
    let cachedEmissionsData = JSON.parse(
      localStorage.getItem('emissionEstimates'),
    );

    const dateArray = getDateArray(previousPeriodStartDate, endDate);
    const cachedDates =
      cachedEmissionsData !== null
        ? cachedEmissionsData.map(({ date }) => date)
        : [];
    const datesToCache = dateArray.filter((date) => {
      return !cachedDates.includes(date.toISOString());
    });

    if (datesToCache.length > 0) {
      const emissionEstimatesByDate = await Promise.all(
        datesToCache.map(async (date) => {
          loading('Sourcing emission estimates...');
          const patchEstimate = await patch.estimates.createEthereumEstimate({
            create_order: false,
            gas_used: GWEI_ETH_MULTIPLIER, // 1 ETH
            timestamp: date,
          });
          toast.dismiss();
          success('Loaded emission estimates');
          return {
            emissionsGpEth: patchEstimate.data.mass_g,
            date: date,
            timestamp: date.getTime() / 1000,
          };
        }),
      );

      const emissionsToCache =
        cachedEmissionsData === null || cachedEmissionsData === 'undefined'
          ? JSON.stringify(emissionEstimatesByDate)
          : JSON.stringify(cachedEmissionsData.concat(emissionEstimatesByDate));
      setEmissionsEstimates(JSON.parse(emissionsToCache));
      localStorage.setItem('emissionEstimates', emissionsToCache);
    } else {
      setEmissionsEstimates(cachedEmissionsData);
    }
  };

  const getEmissionDataForTransaction = (
    transaction: Transaction,
  ): EmissionEstimate => {
    const closestEmissions = emissionEstimates.reduce((prev, current) => {
      return Math.abs(prev.timestamp - Number(transaction.timeStamp)) <
        Math.abs(current.timestamp - Number(transaction.timeStamp))
        ? prev
        : current;
    });
    return closestEmissions;
  };

  const addEmissionDataToSingleTransaction = (
    transaction: Transaction,
  ): Transaction => {
    const emissionsData = getEmissionDataForTransaction(transaction);
    transaction.emissions =
      ((emissionsData.emissionsGpEth * Number(transaction.gasUsed)) /
        WEI_ETH_MULTIPLIER) *
      MICROGRAM_GRAM_CONVERTER;
    return transaction;
  };

  const addEmissionsDataToTransactions = () => {
    setTransactionsCurrentPeriodWithEmissions(
      transactionsCurrentPeriod.map(addEmissionDataToSingleTransaction),
    );

    setTransactionsPreviousPeriodWithEmissions(
      transactionsPreviousPeriod.map(addEmissionDataToSingleTransaction),
    );
  };

  const updateDates = (startDate: Date, endDate: Date): void => {
    const previousPeriodStartDate = new Date(
      startDate.getTime() - (endDate.getTime() - startDate.getTime()),
    );
    setPreviousPeriodStartDate(previousPeriodStartDate);
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleAddContract = (contractAddress): void => {
    if (localStorage.getItem('contracts')) {
      const existingContracts = JSON.parse(localStorage.getItem('contracts'));
      existingContracts.push(contractAddress);
      localStorage.setItem('contracts', JSON.stringify(existingContracts));
    }
  };

  const addContract = async (contractAddress: string): Promise<void> => {
    const enterMessage: string = 'Please enter a valid address';
    let message: string;
    if (contractAddress) {
      if (web3.utils.isAddress(contractAddress)) {
        const code = await library.getCode(contractAddress);
        const isConnected = !(code === '0x0' || code === '0x');
        if (isConnected) {
          if (localStorage.getItem('contracts')) {
            const existingContracts = JSON.parse(
              localStorage.getItem('contracts'),
            );
            if (!existingContracts.includes(contractAddress)) {
              existingContracts.push(contractAddress);
              localStorage.setItem(
                'contracts',
                JSON.stringify(existingContracts),
              );
            }
          } else {
            localStorage.setItem(
              'contracts',
              JSON.stringify([contractAddress]),
            );
          }
        } else {
          message = `The address you entered does not point to a valid Ethereum contract. ${enterMessage}`;
        }
      } else {
        message = `The address you entered is not a valid Ethereum contract. ${enterMessage}`;
      }
    } else {
      message = `No Contract Address was provided. ${enterMessage}`;
    }
    setErrorMessage(message);
    setOpen(false);
  };

  const getStatCardDataForContract = (contract: Contract): StatCardData[] => {
    if (transactionGroupSummariesCurrentPeriod.length === 0) {
      return EMPTY_STAT_CARDS;
    }

    const emissionsCurrentPeriod =
      transactionGroupSummariesCurrentPeriod.filter(
        (contractEmissions) =>
          contractEmissions.contractAddress === contract.address,
      )[0].transactionGroupSummaries;
    const emissionsPreviousPeriod =
      transactionGroupSummariesPreviousPeriod.filter(
        (contractEmissions) =>
          contractEmissions.contractAddress === contract.address,
      )[0].transactionGroupSummaries;

    const totalEmissionsCurrentPeriod = emissionsCurrentPeriod.reduce(
      (acc, currentGroup) => {
        return acc + currentGroup.co2Emissions;
      },
      0,
    );
    const totalEmissionsPreviousPeriod = emissionsPreviousPeriod.reduce(
      (acc, currentGroup) => {
        return acc + currentGroup.co2Emissions;
      },
      0,
    );
    const totalTransactionVolCurrentPeriod = emissionsCurrentPeriod.reduce(
      (acc, currentGroup) => {
        return acc + currentGroup.numTransactions;
      },
      0,
    );
    const emissionsChange = Math.round(
      totalEmissionsCurrentPeriod - totalEmissionsPreviousPeriod,
    );
    const totalTransactionVolPreviousPeriod = emissionsPreviousPeriod.reduce(
      (acc, currentGroup) => {
        return acc + currentGroup.numTransactions;
      },
      0,
    );

    const transactionVolPercentChange = percentChange(
      totalTransactionVolPreviousPeriod,
      totalTransactionVolCurrentPeriod,
    );
    return [
      {
        id: 1,
        name: 'CO2 Emissions (µg)',
        stat: totalEmissionsCurrentPeriod,
        icon: CloudIcon,
        change: `${emissionsChange}`,
        changeType: emissionsChange > 0 ? 'increase' : 'decrease',
      },
      {
        id: 2,
        name: 'Transactions',
        stat: totalTransactionVolCurrentPeriod,
        icon: Globe,
        change: `${transactionVolPercentChange}%`,
        changeType: transactionVolPercentChange > 0 ? 'increase' : 'decrease',
      },
    ];
  };

  const getTotalStatCardData = (): StatCardData[] => {
    const totalEmissionsCurrentPeriod =
      transactionGroupSummariesCurrentPeriod.reduce((acc, currentContract) => {
        const totalEmissions = currentContract.transactionGroupSummaries.reduce(
          (acc, currentGroup) => {
            return acc + currentGroup.co2Emissions;
          },
          0,
        );
        return acc + totalEmissions;
      }, 0);
    const totalEmissionsPreviousPeriod =
      transactionGroupSummariesPreviousPeriod.reduce((acc, currentGroup) => {
        return acc + currentGroup.transactionGroupSummaries[0].co2Emissions;
      }, 0);
    const emissionsChangePercentChange = percentChange(
      totalEmissionsPreviousPeriod,
      totalEmissionsCurrentPeriod,
    );

    const totalTransactionVolCurrentPeriod =
      transactionGroupSummariesCurrentPeriod.reduce((acc, currentContract) => {
        const totalTransactions =
          currentContract.transactionGroupSummaries.reduce(
            (acc, currentGroup) => {
              return acc + currentGroup.numTransactions;
            },
            0,
          );
        return acc + totalTransactions;
      }, 0);
    const totalTransactionVolPreviousPeriod =
      transactionGroupSummariesPreviousPeriod.reduce((acc, currentGroup) => {
        return acc + currentGroup.transactionGroupSummaries[0].numTransactions;
      }, 0);
    const transactionVolPercentChange = percentChange(
      totalTransactionVolPreviousPeriod,
      totalTransactionVolCurrentPeriod,
    );

    const totalGasPriceCurrentPeriod =
      transactionGroupSummariesCurrentPeriod.reduce((acc, currentContract) => {
        const sumOfAverageGasPrices =
          currentContract.transactionGroupSummaries.reduce(
            (acc, currentGroup) => {
              return acc + currentGroup.averageGasPrice;
            },
            0,
          );
        return (
          acc +
          sumOfAverageGasPrices /
            currentContract.transactionGroupSummaries.length
        );
      }, 0);
    const totalGasPricePreviousPeriod =
      transactionGroupSummariesPreviousPeriod.reduce((acc, currentGroup) => {
        return acc + currentGroup.transactionGroupSummaries[0].averageGasPrice;
      }, 0) / transactionGroupSummariesPreviousPeriod.length;
    const averageGasPriceCurrentPeriod =
      totalGasPriceCurrentPeriod === 0
        ? 0
        : Math.round(
            totalGasPriceCurrentPeriod /
              transactionGroupSummariesCurrentPeriod.length,
          );
    const averageGasPricePreviousPeriod =
      totalGasPriceCurrentPeriod === 0
        ? 0
        : Math.round(
            totalGasPricePreviousPeriod /
              transactionGroupSummariesPreviousPeriod.length,
          );

    const gasPricePercentChange = percentChange(
      averageGasPricePreviousPeriod,
      averageGasPriceCurrentPeriod,
    );
    return [
      {
        id: 1,
        name: 'CO2 Emissions (µg)',
        stat: totalEmissionsCurrentPeriod,
        icon: CloudIcon,
        change: `${Math.round(emissionsChangePercentChange)}%`,
        changeType: emissionsChangePercentChange > 0 ? 'increase' : 'decrease',
      },
      {
        id: 2,
        name: 'Transactions',
        stat: totalTransactionVolCurrentPeriod,
        icon: Globe,
        change: `${transactionVolPercentChange}%`,
        changeType: transactionVolPercentChange > 0 ? 'increase' : 'decrease',
      },
      {
        id: 3,
        name: 'Average Gas Price',
        stat: averageGasPriceCurrentPeriod,
        icon: Wind,
        change: `${gasPricePercentChange}%`,
        changeType: gasPricePercentChange > 0 ? 'increase' : 'decrease',
      },
    ];
  };

  const getDataForContract = (
    contract: Contract,
  ): TransactionGroupSummary[] => {
    if (transactionGroupSummariesCurrentPeriod.length === 0) return [];
    return transactionGroupSummariesCurrentPeriod.filter(
      (contractEmissions) =>
        contractEmissions.contractAddress === contract.address,
    )[0].transactionGroupSummaries;
  };

  const openAddContractModal = (): void => {
    setOpen(true);
    setErrorMessage('');
  };
  return (
    <div>
      <Toaster position="top-right" />
      <NavBar
        title="Smart Contract Emissions Dashboard"
        headerNavigation={navigation}
        userNavigation={userNavigation}
        user={user}
        logo="/images/popcorn-logo.png"
        contractProps={{ addContract, open, setOpen }}
        contractErrorProps={{
          openAddContractModal,
          errorMessage,
          setErrorMessage,
        }}
      />
      <div className="sm:flex sm:flex-col sm:align-center bg-gray-50">
        <DateRangePicker
          updateDates={updateDates}
          startDate={startDate}
          endDate={endDate}
        />
        <TotalStats
          statCardData={getTotalStatCardData()}
          data={transactionTotals}
          startDate={startDate}
        />
        {contracts.map((contract) => {
          return (
            <ContractContainer
              statCardData={getStatCardDataForContract(contract)}
              contract={contract}
              data={getDataForContract(contract)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default IndexPage;
