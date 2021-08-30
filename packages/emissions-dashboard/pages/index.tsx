import Patch from '@patch-technology/patch';
import { DateRangePicker } from 'components/DateRangePicker';
import { useRouter } from 'next/router';
import fetch from 'node-fetch';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
const patch = Patch(process.env.PATCH_API_KEY);

const success = (msg: string) => toast.success(msg);
const error = (msg: string) => toast.error(msg);

const NUM_FULL_PERIODS = 19;

interface EmissionStats {
  transactionVol: number;
  gasUsed: number;
  emissions: number;
  address: string;
  startBlock: number;
  endBlock: number;
}

interface Contract {
  name: string;
  address: string;
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
  const [emissionData, setEmissionData] = useState([]);
  const [startDate, setStartDate] = useState<Date>(
    new Date('2021-08-20T00:00:00Z'),
  );
  const [endDate, setEndDate] = useState<Date>(
    new Date('2021-08-26T00:10:00Z'),
  );
  const [startBlock, setStartBlock] = useState<number>();
  const [endBlock, setEndBlock] = useState<number>();
  const [blockRanges, setBlockRanges] = useState<number[][]>();
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      router.replace(window.location.pathname);
    }
  }, [router.pathname]);

  const setBlocks = async () => {
    const startTimestamp = startDate.getTime() / 1000;
    const endTimestamp = endDate.getTime() / 1000;
    const startBlock = await Number(
      await getBlockNumberByTimestamp(startTimestamp),
    );
    const endBlock = await Number(
      await await getBlockNumberByTimestamp(endTimestamp),
    );
    setStartBlock(startBlock);
    setEndBlock(endBlock);
  };

  const updateBlockRanges = async () => {
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
    console.log({ blockRanges });
    setBlockRanges(blockRanges);
  };

  const getTransactions = async (contract: Contract) => {
    const MAX_TRANSACTIONS = 10;
    const requestUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${contract.address}&startblock=${startBlock}&endblock=${endBlock}&sort=asc&offset=${MAX_TRANSACTIONS}&apikey=${process.env.ETHERSCAN_API_KEY}`;
    return await fetch(requestUrl)
      .then((res) => res.json())
      .then((json) => json.result)
      .catch((error) => console.log('error', error));
  };

  const updateStats = async () => {
    const res = await Promise.all(
      contracts.map(async (contract) => {
        const transactions = await getTransactions(contract);
        if (Array.isArray(transactions)) {
          success(
            `Successfully got ${transactions.length} transactions for ${contract.name}`,
          );
          const emissionDataForContract = await Promise.all(
            blockRanges.map(async (blockRange) => {
              const start = blockRange[0];
              const end = blockRange[1];
              const transactionsForBlock = transactions.filter(
                (transaction) =>
                  Number(transaction.blockNumber) >= start &&
                  Number(transaction.blockNumber) <= end,
              );
              // const startBlockTimestamp = await getBlockTimestamp(start);
              // const endBlockTimestamp = await getBlockTimestamp(end);
              // console.log({ startBlockTimestamp, endBlockTimestamp });
              const transactionVol = transactionsForBlock.length;
              const gasUsed = transactionsForBlock.reduce((pr, cu) => {
                return pr + Number(cu.gasUsed);
              }, 0);
              const co2Emissions =
                gasUsed > 0
                  ? await patch.estimates.createEthereumEstimate({
                      timestamp: startDate,
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
              };
            }),
          );
          const newEmissionsData = emissionData.concat(emissionDataForContract);
          return newEmissionsData;
        } else {
          error(
            `Failed to get transactions for ${contract.name} because ${transactions}`,
          );
        }
      }),
    );
    console.log(res.flat());
  };

  useEffect(() => {
    setBlocks();
  }, []);

  useEffect(() => {
    setBlocks();
    updateBlockRanges();
  }, [endDate, startDate]);

  useEffect(() => {
    if (startBlock && endBlock) {
      updateStats();
    }
  }, [blockRanges]);

  const updateDates = (startDate: Date, endDate: Date): void => {
    setStartDate(startDate);
    setEndDate(endDate);
  };
  return (
    <div>
      <Toaster position="top-right" />
      <div className="sm:flex sm:flex-col sm:align-center">
        <h1 className="text-5xl font-extrabold text-gray-900 sm:text-center">
          Smart Contract Carbon Emissions Dashboard
        </h1>
        <DateRangePicker updateDates={updateDates} />
        <table>
          <thead>
            <tr>
              <th>Address</th>
              <th>Vol</th>
              <th>Gas Used</th>
              <th>Emissions</th>
              <th>Start Block</th>
              <th>End Block</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};

export default IndexPage;
