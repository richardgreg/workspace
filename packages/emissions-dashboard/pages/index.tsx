import { Web3Provider } from '@ethersproject/providers';
import { CloudIcon } from '@heroicons/react/outline';
import Patch from '@patch-technology/patch';
import { ContractContainer } from '@popcorn/ui/components/popcorn/emissions-dashboard/ContractContainer/index';
import { DateRangePicker } from '@popcorn/ui/components/popcorn/emissions-dashboard/DateRangePicker';
import { NavBar } from '@popcorn/ui/components/popcorn/emissions-dashboard/NavBar/index';
import { TotalStats } from '@popcorn/ui/components/popcorn/emissions-dashboard/TotalStats/index';
import { useWeb3React } from '@web3-react/core';
import { connectors } from 'context/Web3/connectors';
import {
  Contract,
  ContractEmissions,
  EmissionEstimate,
  StatCardData,
  Transaction,
  TransactionGroup,
} from 'interfaces';
import { useRouter } from 'next/router';
import fetch from 'node-fetch';
import React, { useEffect, useState } from 'react';
import { Globe, Wind } from 'react-feather';
import toast, { Toaster } from 'react-hot-toast';
import { percentChange } from 'utils/percentChange';
import web3 from 'web3';
const transactionFixtures =
  require('../fixtures/transactionFixtures').transactions;

const patch = Patch(process.env.PATCH_API_KEY);

// TODO: Call toast methods upon success/failure
const success = (msg: string) => toast.success(msg);
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
  const [previousPeriodStartBlock, setPreviousPeriodStartBlock] =
    useState<number>(11564729);
  const [emissionEstimates, setEmissionsEstimates] =
    useState<EmissionEstimate[]>();
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

  const [transactionGroupsPreviousPeriod, setTransactionGroupsPreviousPeriod] =
    useState<ContractEmissions[]>([]);
  const [transactionGroupsCurrentPeriod, setTransactionGroupsCurrentPeriod] =
    useState<ContractEmissions[]>([]);
  const [transactionTotals, setTransactionTotals] = useState<
    TransactionGroup[]
  >([]);

  // NOTE: We are currently using dummy data previously sources from etherscan and patch.io for demo purposes
  // TODO: Source data externally
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
    if (emissionEstimates) addEmissionsDataToTransactions();
  }, [transactionsCurrentPeriod, transactionsPreviousPeriod]);

  useEffect(() => {
    if (
      transactionsPreviousPeriodWithEmissions.length > 0 &&
      transactionsCurrentPeriodWithEmissions.length > 0 &&
      blockRanges
    ) {
      groupTransactionsPreviousPeriod();
      groupTransactionsCurrentPeriod();
      groupTransactionsForTotals();
    }
  }, [
    transactionsPreviousPeriodWithEmissions,
    transactionsCurrentPeriodWithEmissions,
  ]);

  useEffect(() => {
    if (!active) {
      activate(connectors.Network);
    }
  }, [active]);

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
    // const transactionsPreviousPeriod = await fetch(`.netlify/functions/gettransactions?startBlock=${previousPeriodStartBlock}&endBlock=${startBlock - 1}`)
    //   .then((res) => res.json())
    //   .then((json) => json.result)
    //   .catch((error) => console.log('error', error));

    // const allTransactions = await fetch(`.netlify/functions/gettransactions?startBlock=${startBlock}&endBlock=${endBlock}`)
    //   .then((res) => res.json())
    //   .then((json) => json.result)
    //   .catch((error) => console.log('error', error));

    // setTransactionsPreviousPeriod(transactionsPreviousPeriod)
    // setTransactionsCurrentPeriod(allTransactions);

    // TODO: Using local fixtures
    setTransactionsPreviousPeriod(
      transactionFixtures.filter(
        (transaction) => Number(transaction.blockNumber) < startBlock,
      ),
    );
    setTransactionsCurrentPeriod(
      transactionFixtures.filter(
        (transaction) => Number(transaction.blockNumber) >= startBlock,
      ),
    );
  };

  const groupTransactionsPreviousPeriod = async () => {
    const transactionGroups = await await Promise.all(
      contracts.map(async (contract) => {
        const transactionsForContract =
          transactionsPreviousPeriodWithEmissions.filter((transaction) => {
            return transaction.to === contract.address;
          });
        const numTransactions = transactionsForContract.length;
        const gasUsed = transactionsForContract.reduce((pr, cu) => {
          return pr + Number(cu.gasUsed);
        }, 0);
        const totalGasPrice = transactionsForContract.reduce((pr, cu) => {
          return pr + Number(cu.gasPrice);
        }, 0);
        const averageGasPrice =
          totalGasPrice === 0
            ? 0
            : totalGasPrice / transactionsForContract.length;
        const emissions = transactionsForContract.reduce((pr, cu) => {
          return pr + Number(cu.emissions);
        }, 0);
        return {
          contractAddress: contract.address,
          transactionGroups: [
            {
              averageGasPrice,
              blockStartDate: previousPeriodStartDate.toLocaleString(),
              co2Emissions: emissions,
              endBlock: startBlock - 1,
              gasUsed,
              numTransactions,
              startBlock: previousPeriodStartBlock,
            },
          ],
        };
      }),
    );
    setTransactionGroupsPreviousPeriod(transactionGroups);
  };

  const groupTransactionsCurrentPeriod = async () => {
    const transactionGroups = await await Promise.all(
      contracts.map(async (contract) => {
        const transactionGroups = await Promise.all(
          blockRanges.map(async (blockRange, i) => {
            const start = blockRange[0];
            const end = blockRange[1];
            const transactionsForBlock = transactionsCurrentPeriod.filter(
              (transaction) => {
                return (
                  Number(transaction.blockNumber) >= start &&
                  Number(transaction.blockNumber) <= end &&
                  transaction.to === contract.address
                );
              },
            );
            const numTransactions = transactionsForBlock.length;
            // TODO: Remove block time interpolation
            // const startBlockTimestamp = await getBlockTimestamp(start);
            const startBlockDateEstimate = getBlockDateEstimate(
              i,
              NUM_FULL_PERIODS,
              startDate.getTime() / 1000,
              endDate.getTime() / 1000,
            );
            const gasUsed = transactionsForBlock.reduce((pr, cu) => {
              return pr + Number(cu.gasUsed);
            }, 0);
            const totalGasPrice = transactionsForBlock.reduce((pr, cu) => {
              return pr + Number(cu.gasPrice);
            }, 0);
            const averageGasPrice =
              totalGasPrice === 0
                ? 0
                : totalGasPrice / transactionsForBlock.length;
            const emissions = Math.round(
              transactionsForBlock.reduce((pr, cu) => {
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
          }),
        );
        return {
          contractAddress: contract.address,
          transactionGroups: transactionGroups,
        };
      }),
    );

    setTransactionGroupsCurrentPeriod(transactionGroups);
  };

  const groupTransactionsForTotals = async () => {
    const transactionGroups = await Promise.all(
      blockRanges.map(async (blockRange, i) => {
        const start = blockRange[0];
        const end = blockRange[1];
        const transactionsForBlock = transactionsCurrentPeriod.filter(
          (transaction) => {
            return (
              Number(transaction.blockNumber) >= start &&
              Number(transaction.blockNumber) <= end
            );
          },
        );
        const numTransactions = transactionsForBlock.length;
        // TODO: Remove block time interpolation
        // const startBlockTimestamp = await getBlockTimestamp(start);
        const startBlockDateEstimate = getBlockDateEstimate(
          i,
          NUM_FULL_PERIODS,
          startDate.getTime() / 1000,
          endDate.getTime() / 1000,
        );
        const gasUsed = transactionsForBlock.reduce((pr, cu) => {
          return pr + Number(cu.gasUsed);
        }, 0);
        const totalGasPrice = transactionsForBlock.reduce((pr, cu) => {
          return pr + Number(cu.gasPrice);
        }, 0);
        const averageGasPrice =
          totalGasPrice === 0 ? 0 : totalGasPrice / transactionsForBlock.length;
        const emissions = Math.round(
          transactionsForBlock.reduce((pr, cu) => {
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
      }),
    );
    setTransactionTotals(transactionGroups);
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

    const GAS_USED = 1000000;
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
          const patchEstimate = await patch.estimates.createEthereumEstimate({
            create_order: false,
            gas_used: GAS_USED,
            timestamp: date,
          });
          return {
            co2EmissionPerKg: patchEstimate.data.mass_g / 1000,
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

  const getEmissionDataForTransaction = (transaction) => {
    const closestEmissions = emissionEstimates.reduce((prev, current) => {
      return Math.abs(prev.timestamp - Number(transaction.timeStamp)) <
        Math.abs(current.timestamp - Number(transaction.timeStamp))
        ? prev
        : current;
    });
    return closestEmissions;
  };

  const addEmissionsDataToTransactions = () => {
    setTransactionsCurrentPeriodWithEmissions(
      transactionsCurrentPeriod.map((transaction) => {
        const emissionsData = getEmissionDataForTransaction(transaction);
        const emissions =
          (emissionsData.co2EmissionPerKg * Number(transaction.gasUsed)) /
          1000000;
        transaction.emissions = emissions;
        return transaction;
      }),
    );

    setTransactionsPreviousPeriodWithEmissions(
      transactionsPreviousPeriod.map((transaction) => {
        const emissionsData = getEmissionDataForTransaction(transaction);
        transaction.emissions =
          (emissionsData.co2EmissionPerKg * Number(transaction.gasUsed)) /
          1000000;
        return transaction;
      }),
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
    if (transactionGroupsCurrentPeriod.length === 0)
      return [
        {
          id: 1,
          name: 'CO2 Emissions (kg)',
          stat: 0,
          icon: CloudIcon,
          change: ``,
          changeType: 'increase',
        },
        {
          id: 2,
          name: 'Transactions',
          stat: 0,
          icon: Globe,
          change: ``,
          changeType: 'increase',
        },
      ];
    const emissionsDataForContractCurrentPeriod =
      transactionGroupsCurrentPeriod.filter(
        (contractEmissions) =>
          contractEmissions.contractAddress === contract.address,
      )[0].transactionGroups;
    const emissionsDataForContractPreviousPeriod =
      transactionGroupsPreviousPeriod.filter(
        (contractEmissions) =>
          contractEmissions.contractAddress === contract.address,
      )[0].transactionGroups;
    const totalEmissionsCurrentPeriod =
      emissionsDataForContractCurrentPeriod.reduce((pr, cu) => {
        return pr + cu.co2Emissions;
      }, 0);
    const totalEmissionsPreviousPeriod =
      emissionsDataForContractPreviousPeriod.reduce((pr, cu) => {
        return pr + cu.co2Emissions;
      }, 0);
    const totalTransactionVolCurrentPeriod =
      emissionsDataForContractCurrentPeriod.reduce((pr, cu) => {
        return pr + cu.numTransactions;
      }, 0);
    const totalTransactionVolPreviousPeriod =
      emissionsDataForContractPreviousPeriod.reduce((pr, cu) => {
        return pr + cu.numTransactions;
      }, 0);
    const emissionsChange = Math.round(
      totalEmissionsCurrentPeriod - totalEmissionsPreviousPeriod,
    );
    const transactionVolPercentChange = percentChange(
      totalTransactionVolPreviousPeriod,
      totalTransactionVolCurrentPeriod,
    );
    return [
      {
        id: 1,
        name: 'CO2 Emissions (kg)',
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
    const totalEmissionsCurrentPeriod = transactionGroupsCurrentPeriod.reduce(
      (pr, cu) => {
        return (
          pr +
          cu.transactionGroups.reduce((pr, cu) => {
            return pr + cu.co2Emissions;
          }, 0)
        );
      },
      0,
    );
    const totalEmissionsPreviousPeriod = transactionGroupsPreviousPeriod.reduce(
      (pr, cu) => {
        return pr + cu.transactionGroups[0].co2Emissions;
      },
      0,
    );
    const totalTransactionVolCurrentPeriod =
      transactionGroupsCurrentPeriod.reduce((pr, cu) => {
        return (
          pr +
          cu.transactionGroups.reduce((pr, cu) => {
            return pr + cu.numTransactions;
          }, 0)
        );
      }, 0);
    const totalTransactionVolPreviousPeriod =
      transactionGroupsPreviousPeriod.reduce((pr, cu) => {
        return pr + cu.transactionGroups[0].numTransactions;
      }, 0);
    const totalGasPriceCurrentPeriod = transactionGroupsCurrentPeriod.reduce(
      (pr, cu) => {
        return (
          pr +
          cu.transactionGroups.reduce((pr, cu) => {
            return pr + cu.averageGasPrice;
          }, 0)
        );
      },
      0,
    );
    const totalGasPricePreviousPeriod = transactionGroupsPreviousPeriod.reduce(
      (pr, cu) => {
        return pr + cu.transactionGroups[0].averageGasPrice;
      },
      0,
    );
    const averageGasPriceCurrentPeriod =
      totalGasPriceCurrentPeriod === 0
        ? 0
        : Math.round(
            totalGasPriceCurrentPeriod / transactionGroupsCurrentPeriod.length,
          );
    const averageGasPricePreviousPeriod =
      totalGasPriceCurrentPeriod === 0
        ? 0
        : Math.round(
            totalGasPricePreviousPeriod /
              transactionGroupsPreviousPeriod.length,
          );
    const emissionsChangePercentChange = percentChange(
      totalEmissionsPreviousPeriod / 1000,
      totalEmissionsCurrentPeriod / 1000,
    );
    const transactionVolPercentChange = percentChange(
      totalTransactionVolPreviousPeriod,
      totalTransactionVolCurrentPeriod,
    );
    const gasPricePercentChange = percentChange(
      averageGasPricePreviousPeriod,
      averageGasPriceCurrentPeriod,
    );
    return [
      {
        id: 1,
        name: 'CO2 Emissions (kg)',
        stat: totalEmissionsCurrentPeriod / 1000,
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

  const getDataForContract = (contract: Contract): TransactionGroup[] => {
    if (transactionGroupsCurrentPeriod.length === 0) return [];
    return transactionGroupsCurrentPeriod.filter(
      (contractEmissions) =>
        contractEmissions.contractAddress === contract.address,
    )[0].transactionGroups;
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
