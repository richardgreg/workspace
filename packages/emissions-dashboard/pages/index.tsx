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
import { ChartData, Contract, Transaction } from 'interfaces';
import { useRouter } from 'next/router';
import fetch from 'node-fetch';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import web3 from 'web3';
import { connectors } from '../context/Web3/connectors';
import { dummyEmissionsData } from '../dummyData';
const transactionFixtures =
  require('../fixtures/transactionFixtures').transactions;

const patch = Patch(process.env.PATCH_API_KEY);

// TODO: Call toast methods upon success/failure
const success = (msg: string) => toast.success(msg);
const error = (msg: string) => toast.error(msg);

const NUM_FULL_PERIODS = 19;
const START_BLOCK = 11565019;
const END_BLOCK = 11565019;

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

  const [contracts, setContracts] = useState<Contract[]>([
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
  ]);

  const [startDate, setStartDate] = useState<Date>(
    new Date('2021-01-01T00:00:00Z'),
  );
  const [endDate, setEndDate] = useState<Date>(
    new Date('2021-08-31T00:10:00Z'),
  );
  const [startBlock, setStartBlock] = useState<number>(13133291);
  const [endBlock, setEndBlock] = useState<number>(11564729);
  const [blockRanges, setBlockRanges] = useState<number[][]>();
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [emissionData, setEmissionData] = useState([]);

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
    setStartBlock(startBlock);
    setEndBlock(endBlock);
    setBlockRanges(blockRanges);
  };

  const getTransactions = async () => {
    console.log(
      `Getting transactions between blocks ${startBlock} and ${endBlock}`,
    );

    // const requestUrl = `.netlify/functions/gettransactions?startBlock=${startBlock}&endBlock=${endBlock}`;
    // const allTransactions = await fetch(requestUrl)
    //   .then((res) => res.json())
    //   .then((json) => json.result)
    //   .catch((error) => console.log('error', error));
    // TODO: Using local fixtures
    setAllTransactions(transactionFixtures);
  };

  const getEmissionsData = async () => {
    const emissionsData = await (
      await Promise.all(
        contracts.map(async (contract) => {
          const emissionDataForContract = await Promise.all(
            blockRanges.map(async (blockRange, i) => {
              const start = blockRange[0];
              const end = blockRange[1];
              const transactionsForBlock = allTransactions.filter(
                (transaction) => {
                  return (
                    Number(transaction.blockNumber) >= start &&
                    Number(transaction.blockNumber) <= end &&
                    transaction.to === contract.address
                  );
                },
              );
              const transactionVol = transactionsForBlock.length;
              // TODO: Due to API limits, we interpolate startBlockTimestamp
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

              const averageGasPrice =
                transactionsForBlock.reduce((pr, cu) => {
                  return pr + Number(cu.gasPrice);
                }, 0) / transactionsForBlock.length;
              const co2Emissions =
                gasUsed > 0
                  ? await patch.estimates.createEthereumEstimate({
                      timestamp: startBlockTimestampEstimate, // Using interpolated estimate
                      gas_used: gasUsed,
                    })
                  : 0;
              const emissions = gasUsed > 0 ? co2Emissions.data.mass_g : 0;
              return {
                emissions,
                gasUsed,
                transactionVol,
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

  // NOTE: We are currently using dummy data previously sources from etherscan and patch.io for demo purposes
  // TODO: Source data externally
  useEffect(() => {
    updateBlocks();
  }, []);

  useEffect(() => {
    updateBlocks();
  }, [endDate, startDate]);

  useEffect(() => {
    if (blockRanges) {
      getTransactions();
    }
  }, [blockRanges]);

  useEffect(() => {
    if (allTransactions && blockRanges) {
      getEmissionsData();
    }
  }, [blockRanges]);

  const updateDates = (startDate: Date, endDate: Date): void => {
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

  useEffect(() => {
    if (!active) {
      activate(connectors.Network);
    }
  }, [active]);

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

  const getStatsForContract = (contract: Contract) => {
    const transactions = dummyEmissionsData.filter(
      (emissionsData) => contract.address === emissionsData.address,
    );
    const totalEmissions = transactions.reduce((pr, cu) => {
      return pr + cu.emissions;
    }, 0);
    const totalTransactionVol = transactions.reduce((pr, cu) => {
      return pr + cu.transactionVol;
    }, 0);
    const averageGasPrice =
      transactions.reduce((pr, cu) => {
        return pr + cu.averageGasPrice;
      }, 0) / transactions.length;
    return [
      {
        id: 1,
        name: 'CO2 Emissions (kg)',
        stat: totalEmissions,
        icon: UsersIcon,
        change: '122',
        changeType: 'increase',
      },
      {
        id: 2,
        name: 'Transactions',
        stat: totalTransactionVol,
        icon: MailOpenIcon,
        change: '5.4%',
        changeType: 'increase',
      },
      {
        id: 3,
        name: 'Average Gas Price',
        stat: averageGasPrice,
        icon: CursorClickIcon,
        change: '3.2%',
        changeType: 'decrease',
      },
    ];
  };

  const getDataForContract = (transactions): ChartData[] => {
    return transactions.map((transaction) => {
      return {
        date: transaction.blockStartDate,
        co2Emissions: transaction.emissions,
        numTransactions: transaction.transactionVol,
      };
    });
  };

  const openAddContractModal = (): void => {
    setOpen(true);
    setErrorMessage('');
  };

  return (
    <div>
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
      <Toaster position="top-right" />
      <div className="sm:flex sm:flex-col sm:align-center">
        <DateRangePicker updateDates={updateDates} />
        {contracts.map((contract) => {
          const transactions = emissionData.filter(
            (data) => contract.address === data.address,
          );
          return (
            <ContractContainer
              emissionSummaryStats={getStatsForContract(contract)}
              contract={contract}
              data={getDataForContract(transactions)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default IndexPage;
