import {
  CursorClickIcon,
  MailOpenIcon,
  UsersIcon,
} from '@heroicons/react/solid';
import Patch from '@patch-technology/patch';
import { NavBar } from '@popcorn/ui/components/popcorn/emissions-dashboard/NavBar/index';
import { ContractContainer } from 'components/ContractContainer';
import { DateRangePicker } from 'components/DateRangePicker';
import { useRouter } from 'next/router';
import fetch from 'node-fetch';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { dummyEmissionsData } from '../dummyData';
const patch = Patch(process.env.PATCH_API_KEY);

// TODO: Call toast methods upon success/failure
const success = (msg: string) => toast.success(msg);
const error = (msg: string) => toast.error(msg);

interface ChartData {
  date: string;
  co2Emissions: number;
  numTransactions: number;
}

const NUM_FULL_PERIODS = 19;

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
interface EmissionStats {
  transactionVol: number;
  gasUsed: number;
  emissions: number;
  address: string;
  startBlock: number;
  endBlock: number;
  averageGasPrice: number;
}

interface Contract {
  name: string;
  address: string;
}

interface Transaction {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  isError: string;
  txreceipt_status: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  confirmations: string;
}

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

const IndexPage = () => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [contracts, setContracts] = useState<Contract[]>([
    {
      address: '0xa258C4606Ca8206D8aA700cE2143D7db854D168c',
      name: 'Yearn ETH Vault',
    },
    {
      address: '0xdA816459F1AB5631232FE5e97a05BBBb94970c95',
      name: 'Yearn ETH Vault',
    },
  ]);

  const [startDate, setStartDate] = useState<Date>(
    new Date('2021-08-20T00:00:00Z'),
  );
  const [endDate, setEndDate] = useState<Date>(
    new Date('2021-08-26T00:10:00Z'),
  );
  const [startBlock, setStartBlock] = useState<number>();
  const [endBlock, setEndBlock] = useState<number>();
  const [blockRanges, setBlockRanges] = useState<number[][]>();
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [emissionData, setEmissionData] = useState([]);

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

  const getAllTransactions = async () => {
    const allTransactions = await (
      await Promise.all(
        contracts.map(async (contract) => {
          const requestUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${contract.address}&startblock=${startBlock}&endblock=${endBlock}&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`;
          return await fetch(requestUrl)
            .then((res) => res.json())
            .then((json) => json.result)
            .catch((error) => console.log('error', error));
        }),
      )
    ).flat();
    setAllTransactions(allTransactions);
  };

  const getEmissionsData = async () => {
    const emissionsData = await (
      await Promise.all(
        contracts.map(async (contract) => {
          const emissionDataForContract = await Promise.all(
            blockRanges.map(async (blockRange) => {
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
              const startBlockTimestamp = await getBlockTimestamp(start);

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
                      timestamp: startBlockTimestamp,
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
  // useEffect(() => {
  //   updateBlocks();
  // }, []);

  // useEffect(() => {
  //   updateBlocks();
  // }, [endDate, startDate]);

  // useEffect(() => {
  //   if (blockRanges) {
  //     getAllTransactions();
  //   }
  // }, [blockRanges]);

  // useEffect(() => {
  //   if (allTransactions && blockRanges) {
  //     getEmissionsData();
  //   }
  // }, [blockRanges]);

  const updateDates = (startDate: Date, endDate: Date): void => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleAddContract = (contractAddress): void => {
    if (localStorage.getItem('contracts')) {
      const existingContracts = JSON.parse(localStorage.getItem('contracts'));
      existingContracts.push(contractAddress);
      localStorage.setItem('contracts', JSON.stringify(existingContracts));
    } else {
      localStorage.setItem('contracts', JSON.stringify([contractAddress]));
    }
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

  const getDataForContract = (contract: Contract): ChartData[] => {
    // TODO: Source data from transactions
    return new Array(20).fill(undefined).map((x, i) => {
      return {
        date: `${i}/05/2021`,
        co2Emissions: Math.floor(500 * Math.random()),
        numTransactions: Math.floor(500 * Math.random()),
      };
    });
  };

  return (
    <div>
      <NavBar
        title="Smart Contract Emissions Dashboard"
        headerNavigation={navigation}
        userNavigation={userNavigation}
        user={user}
        logo="/images/popcorn-logo.png"
        contractProps={{ addContract: handleAddContract, open, setOpen }}
      />
      <Toaster position="top-right" />
      <div className="sm:flex sm:flex-col sm:align-center">
        <DateRangePicker updateDates={updateDates} />
        {contracts.map((contract) => {
          return (
            <ContractContainer
              emissionSummaryStats={getStatsForContract(contract)}
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
