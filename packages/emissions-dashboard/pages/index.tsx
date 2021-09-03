import { Web3Provider } from '@ethersproject/providers';
import {
  CursorClickIcon,
  MailOpenIcon,
  UsersIcon,
} from '@heroicons/react/solid';
import Patch from '@patch-technology/patch';
import { NavBar } from '@popcorn/ui/components/popcorn/emissions-dashboard/NavBar/index';
import { useWeb3React } from '@web3-react/core';
import { ContractContainer } from 'components/ContractContainer';
import { DateRangePicker } from 'components/DateRangePicker';
import { TotalStats } from 'components/TotalStats';
import { Contract, EmissionStats, StatCardData, Transaction } from 'interfaces';
import { useRouter } from 'next/router';
import fetch from 'node-fetch';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { percentChange } from 'utils/percentChange';
import web3 from 'web3';
import { connectors } from '../context/Web3/connectors';
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

const getBlockTimestampEstimate = (
  i: number,
  totalNumberOfBlocks: number,
  startTimestamp: number,
  endTimestamp: number,
): string => {
  const timestampEstimationUnixTime = Math.floor(
    startTimestamp +
      (i / totalNumberOfBlocks) * (endTimestamp - startTimestamp),
  );
  const timestampEstimateISOString = new Date(
    timestampEstimationUnixTime * 1000,
  ).toISOString();
  return timestampEstimateISOString;
};

const IndexPage = (): JSX.Element => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const [contracts, setContracts] = useState<Contract[]>(DEFAULT_CONTRACTS);
  const [previousPeriodStartDate, setPreviousPeriodStartDate] = useState<Date>(
    new Date('2021-01-01T00:00:00Z'),
  );
  const [startDate, setStartDate] = useState<Date>(
    new Date('2021-04-30T00:00:00Z'),
  );
  const [endDate, setEndDate] = useState<Date>(
    new Date('2021-08-31T00:00:00Z'),
  );
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
  const [emissionsDataPreviousPeriod, setEmissionsDataPreviousPeriod] =
    useState<EmissionStats[]>([]);
  const [emissionData, setEmissionData] = useState<EmissionStats[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const context = useWeb3React<Web3Provider>();
  const { library, activate, active } = context;

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
        (transaction) => Number(transaction.blockNumber) > startBlock,
      ),
    );
  };

  const getEmissionsDataPreviousPeriod = async () => {
    const emissionsData = await (
      await Promise.all(
        contracts.map(async (contract) => {
          const numTransactions = transactionsPreviousPeriod.length;
          const gasUsed = transactionsPreviousPeriod.reduce((pr, cu) => {
            return pr + Number(cu.gasUsed);
          }, 0);
          const totalGasPrice = transactionsPreviousPeriod.reduce((pr, cu) => {
            return pr + Number(cu.gasPrice);
          }, 0);
          const averageGasPrice =
            totalGasPrice === 0
              ? 0
              : totalGasPrice / transactionsPreviousPeriod.length;
          const co2Emissions =
            gasUsed > 0
              ? await patch.estimates.createEthereumEstimate({
                  timestamp: previousPeriodStartDate.getTime(),
                  gas_used: gasUsed,
                })
              : 0;
          const emissions = gasUsed > 0 ? co2Emissions.data.mass_g / 1000 : 0;
          return {
            co2Emissions: emissions,
            gasUsed,
            numTransactions,
            address: contract.address,
            startBlock: previousPeriodStartBlock,
            endBlock: startBlock - 1,
            averageGasPrice,
            blockStartDate: previousPeriodStartDate.getTime(),
          };
        }),
      )
    ).flat();
    setEmissionsDataPreviousPeriod(emissionsData);
  };

  const getEmissionsDataCurrentPeriod = async () => {
    const emissionsData = await (
      await Promise.all(
        contracts.map(async (contract) => {
          const emissionDataForContract = await Promise.all(
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
              const startBlockTimestampEstimate = getBlockTimestampEstimate(
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
              let emissions =
                gasUsed > 0
                  ? await patch.estimates.createEthereumEstimate({
                      timestamp: startBlockTimestampEstimate, // Using interpolated estimate
                      gas_used: gasUsed,
                    })
                  : 0;
              emissions = gasUsed > 0 ? emissions.data.mass_g / 1000 : 0;
              return {
                co2Emissions: emissions,
                gasUsed,
                numTransactions,
                address: contract.address,
                startBlock: start,
                endBlock: end,
                averageGasPrice,
                blockStartDate: startBlockTimestampEstimate,
              };
            }),
          );
          return emissionDataForContract;
        }),
      )
    ).flat();
    setEmissionData(emissionsData);
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
    const GAS_USED = 1000000;
    const dateArray = getDateArray(previousPeriodStartDate, endDate);
    const cachedEmissionsData = localStorage.getItem('emissiondata');
    const cachedDates = cachedEmissionsData
      ? JSON.parse(cachedEmissionsData).map(({ date }) => date)
      : [];
    const datesToCache = dateArray.filter((date) => {
      return !cachedDates.includes(date.toISOString());
    });
    if (datesToCache.length > 0) {
      const emissionByDate = await Promise.all(
        datesToCache.map(async (date) => {
          const patchEstimate = await patch.estimates.createEthereumEstimate({
            timestamp: date,
            gas_used: GAS_USED,
          });
          return {
            date: date,
            co2EmissionPerKg: patchEstimate.data.mass_g / 1000,
          };
        }),
      );
      const emissionsToCache = cachedEmissionsData
        ? JSON.stringify(JSON.parse(cachedEmissionsData).concat(emissionByDate))
        : JSON.stringify(emissionByDate);
      localStorage.setItem('emissiondata', emissionsToCache);
    }
  };

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
    if (transactionsCurrentPeriod && blockRanges) {
      getEmissionsDataCurrentPeriod();
      getEmissionsDataPreviousPeriod();
    }
  }, [blockRanges]);

  useEffect(() => {
    if (!active) {
      activate(connectors.Network);
    }
  }, [active]);

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
    const emissionsDataForContractCurrentPeriod = emissionData.filter(
      (data) => contract.address === data.address,
    );
    const emissionsDataForContractPreviousPeriod =
      emissionsDataPreviousPeriod.filter(
        (data) => contract.address === data.address,
      );
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
    const totalGasPriceCurrentPeriod =
      emissionsDataForContractCurrentPeriod.reduce((pr, cu) => {
        return pr + cu.averageGasPrice;
      }, 0);
    const totalGasPricePreviousPeriod =
      emissionsDataForContractPreviousPeriod.reduce((pr, cu) => {
        return pr + cu.averageGasPrice;
      }, 0);

    const emissionsChange =
      totalEmissionsCurrentPeriod - totalEmissionsPreviousPeriod;
    const transactionVolPercentChange = percentChange(
      totalTransactionVolPreviousPeriod,
      totalTransactionVolCurrentPeriod,
    );

    return [
      {
        id: 1,
        name: 'CO2 Emissions (kg)',
        stat: totalEmissionsCurrentPeriod,
        icon: UsersIcon,
        change: `${emissionsChange / 1000}`,
        changeType: emissionsChange > 0 ? 'increase' : 'decrease',
      },
      {
        id: 2,
        name: 'Transactions',
        stat: totalTransactionVolCurrentPeriod,
        icon: MailOpenIcon,
        change: `${transactionVolPercentChange}%`,
        changeType: transactionVolPercentChange > 0 ? 'increase' : 'decrease',
      },
    ];
  };

  const getTotalStatCardData = (): StatCardData[] => {
    const totalEmissionsCurrentPeriod = emissionData.reduce((pr, cu) => {
      return pr + cu.co2Emissions;
    }, 0);
    const totalEmissionsPreviousPeriod = emissionsDataPreviousPeriod.reduce(
      (pr, cu) => {
        return pr + cu.co2Emissions;
      },
      0,
    );
    const totalTransactionVolCurrentPeriod = emissionData.reduce((pr, cu) => {
      return pr + cu.numTransactions;
    }, 0);
    const totalTransactionVolPreviousPeriod =
      emissionsDataPreviousPeriod.reduce((pr, cu) => {
        return pr + cu.numTransactions;
      }, 0);
    const totalGasPriceCurrentPeriod = emissionData.reduce((pr, cu) => {
      return pr + cu.averageGasPrice;
    }, 0);
    const totalGasPricePreviousPeriod = emissionsDataPreviousPeriod.reduce(
      (pr, cu) => {
        return pr + cu.averageGasPrice;
      },
      0,
    );
    const averageGasPriceCurrentPeriod =
      totalGasPriceCurrentPeriod === 0
        ? 0
        : Math.round(totalGasPriceCurrentPeriod / emissionData.length);
    const averageGasPricePreviousPeriod =
      totalGasPriceCurrentPeriod === 0
        ? 0
        : Math.round(
            totalGasPricePreviousPeriod / emissionsDataPreviousPeriod.length,
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
        icon: UsersIcon,
        change: `${Math.round(emissionsChangePercentChange)}%`,
        changeType: emissionsChangePercentChange > 0 ? 'increase' : 'decrease',
      },
      {
        id: 2,
        name: 'Transactions',
        stat: totalTransactionVolCurrentPeriod,
        icon: MailOpenIcon,
        change: `${transactionVolPercentChange}%`,
        changeType: transactionVolPercentChange > 0 ? 'increase' : 'decrease',
      },
      {
        id: 3,
        name: 'Average Gas Price',
        stat: averageGasPriceCurrentPeriod,
        icon: CursorClickIcon,
        change: `${gasPricePercentChange}%`,
        changeType: gasPricePercentChange > 0 ? 'increase' : 'decrease',
      },
    ];
  };

  const getDataForContract = (contract: Contract): EmissionStats[] => {
    return emissionData.filter((data) => {
      return data.address === contract.address;
    });
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
      <div className="sm:flex sm:flex-col sm:align-center">
        <DateRangePicker updateDates={updateDates} />
        <TotalStats
          statCardData={getTotalStatCardData()}
          data={emissionData}
          startDate={startDate}
        />
        {contracts.map((contract) => {
          return (
            <ContractContainer
              statCardData={getStatCardDataForContract(contract)}
              contract={contract}
              data={getDataForContract(contract)}
              startDate={startDate}
            />
          );
        })}
      </div>
    </div>
  );
};

export default IndexPage;
