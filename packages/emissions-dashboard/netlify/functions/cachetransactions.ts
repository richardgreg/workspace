import {
  EmissionEstimate,
  Transaction,
} from '@popcorn/ui/interfaces/emissions-dashboard';
import bluebird from 'bluebird';
import { MongoClient } from 'mongodb';
import fetch from 'node-fetch';
require('dotenv').config();

const GWEI_TO_ETH = Math.pow(10, 9);
const WEI_TO_ETH = Math.pow(10, 18);
const MICROGRAM_TO_GRAM = Math.pow(10, 6);

const CONTRACTS = [
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

// Etherscan API functions
const getCurrentBlockNumber = async (): Promise<number> => {
  const timestamp = new Date().getTime() / 1000;
  const requestUrl = `https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=${timestamp}&closest=before&apikey=${process.env.ETHERSCAN_API_KEY}`;
  return await fetch(requestUrl)
    .then((res) => res.json())
    .then((json) => json.result)
    .catch((error) => console.log('error', error));
};

const getTransactions = async (
  contract,
  startBlock,
  endBlock,
): Promise<Transaction[]> => {
  const requestUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${contract.address}&startblock=${startBlock}&endblock=${endBlock}&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`;
  return await fetch(requestUrl)
    .then((res) => res.json())
    .then((json) => json.result)
    .catch((error) => console.log('error', error));
};

const getBlockTimestamp = async (blockNumber: number): Promise<number> => {
  const requestUrl = `https://api.etherscan.io/api?module=block&action=getblockreward&blockno=${blockNumber}&apikey=${process.env.ETHERSCAN_API_KEY}`;
  const result = await fetch(requestUrl)
    .then((res) => res.json())
    .then((json) => json.result)
    .catch((error) => console.log('error', error));
  return Number(result.timeStamp);
};

const addEmissionDataToSingleTransaction = (
  transaction: Transaction,
  emissionEstimates: any,
): Transaction => {
  // Get closest emission data
  const emissionData = emissionEstimates.reduce((prev, current) => {
    return Math.abs(prev.timestamp - Number(transaction.timeStamp)) <
      Math.abs(current.timestamp - Number(transaction.timeStamp))
      ? prev
      : current;
  });
  transaction.emissions =
    ((emissionData.emissionsGpEth * Number(transaction.gasUsed)) / WEI_TO_ETH) *
    MICROGRAM_TO_GRAM;
  return transaction;
};

exports.handler = async (event, context) => {
  try {
    // Connect to db
    const uri = process.env.DB_URI;
    const client = new MongoClient(uri);
    await client.connect();
    const database = client.db('emissions');
    const mostRecentTxBlock = await database
      .collection('transactions')
      .aggregate([{ $group: { _id: null, max: { $max: '$blockNumber' } } }])
      .toArray();
    const startBlock = Number(mostRecentTxBlock[0].max) + 1;
    const startTimestamp = await getBlockTimestamp(startBlock);
    const endBlock = await getCurrentBlockNumber();
    // Get transactions between a) and b) from etherscan api
    const transactions = await (
      await bluebird.map(
        CONTRACTS,
        async (contract) => {
          return getTransactions(contract, startBlock, endBlock);
        },
        { concurrency: 1 },
      )
    ).flat();
    console.log(
      `${transactions.length} new transactions across ${CONTRACTS.length} contracts`,
    );
    if (transactions.length) {
      const emissionEstimates = (await database
        .collection('patch-estimates')
        .find({ timestamp: { $gt: startTimestamp } })
        .toArray()) as EmissionEstimate[];
      console.log(`Retrieved ${emissionEstimates.length} emission estimates`);
      // Add estimates to transactions
      const transactionsWithEstimates = transactions.map((transaction) => {
        return addEmissionDataToSingleTransaction(
          transaction,
          emissionEstimates,
        );
      });
      console.log(
        `Added emission data to ${transactionsWithEstimates.length} transactions across ${CONTRACTS.length} contracts`,
      );
      const bulkUpdateOps = transactionsWithEstimates.map((transaction) => {
        return {
          updateOne: {
            filter: { hash: transaction.hash },
            update: { $set: transaction },
            upsert: true,
          },
        };
      });

      const res = await database
        .collection('transactions')
        .bulkWrite(bulkUpdateOps);
      if (res.result.ok === 1) {
        return {
          statusCode: 200,
          body: `${transactions.length} transactions cached for ${CONTRACTS.length} contracts`,
        };
      }
      console.log({ res });
      return {
        statusCode: 500,
        body: 'Failed to cache transactions',
      };
    }
    return {
      statusCode: 200,
      body: `There were no transactions to cache since last run`,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: 'Failed to cache transactions',
    };
  }
};
