import bluebird from 'bluebird';
import fetch from 'node-fetch';

const TIMESTAMP_AT_010121 = new Date('01/01/2021').getTime() / 1000;
const CURRENT_TIMESTAMP = Math.floor(new Date().getTime() / 1000);
const BLOCK_AT_010121 = '11564729';
const BLOCK_AT_310821 = '13133291';

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

const CONTRACTS: Contract[] = [
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

const getBlockNumberByTimestamp = async (
  timestamp: number,
): Promise<number> => {
  const requestUrl = `https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=${timestamp}&closest=before&apikey=${process.env.ETHERSCAN_API_KEY}`;
  return await fetch(requestUrl)
    .then((res) => res.json())
    .then((json) => json.result)
    .catch((error) => console.log('error', error));
};

const getAllTransactions = async (
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

export async function run(): Promise<void> {
  const startBlock = await getBlockNumberByTimestamp(TIMESTAMP_AT_010121);
  const endBlock = await getBlockNumberByTimestamp(CURRENT_TIMESTAMP);

  const transactions = await (
    await bluebird.map(
      CONTRACTS,
      async (contract) => {
        return getAllTransactions(contract, startBlock, endBlock);
      },
      { concurrency: 1 },
    )
  ).flat();
  return transactions;
}

run().catch((err) => console.log(err));
