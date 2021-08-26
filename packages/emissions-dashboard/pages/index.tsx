import Patch from '@patch-technology/patch';
import { useRouter } from 'next/router';
import fetch from 'node-fetch';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
const patch = Patch(process.env.PATCH_API_KEY);

const success = (msg: string) => toast.success(msg);
const error = (msg: string) => toast.error(msg);

const DEFAULT_STATS: ContractStats = {
  emissions: 0,
  gasUsed: 0,
  transactionVol: 0,
};
interface ContractStats {
  transactionVol: number;
  gasUsed: number;
  emissions: number;
}

interface Contract {
  name: string;
  address: string;
  stats: ContractStats;
}

const convertISODateToUnixTimestamp = (date: string): number =>
  new Date(date).getTime() / 1000;

const getBlockNumberByTimestamp = async (
  timestamp: number,
): Promise<number> => {
  const requestUrl = `https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=${timestamp}&closest=before&apikey=${process.env.ETHERSCAN_API_KEY}`;
  return await fetch(requestUrl)
    .then((res) => res.json())
    .then((json) => json.result)
    .catch((error) => console.log('error', error));
};

const IndexPage = () => {
  const router = useRouter();
  const [contracts, setContracts] = useState<Contract[]>([
    {
      address: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
      name: 'Uniswap V2',
      stats: DEFAULT_STATS,
    },
    {
      address: '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2',
      name: 'Sushi',
      stats: DEFAULT_STATS,
    },
  ]);
  const [startDate, setStartDate] = useState<string>('2021-08-26T00:00:00Z');
  const [endDate, setEndDate] = useState<string>('2021-08-26T00:10:00Z');
  const [startBlock, setStartBlock] = useState<number>();
  const [endBlock, setEndBlock] = useState<number>();
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      router.replace(window.location.pathname);
    }
  }, [router.pathname]);

  const setBlocks = async () => {
    const startTimestamp = await convertISODateToUnixTimestamp(startDate);
    const endTimestamp = await convertISODateToUnixTimestamp(endDate);
    const startBlock = await getBlockNumberByTimestamp(startTimestamp);
    const endBlock = await await getBlockNumberByTimestamp(endTimestamp);
    setStartBlock(startBlock);
    setEndBlock(endBlock);
  };

  const updateStats = async (contract: Contract) => {
    const MAX_TRANSACTIONS = 10;
    const requestUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${contract.address}&startblock=${startBlock}&endblock=${endBlock}&sort=asc&offset=${MAX_TRANSACTIONS}&apikey=${process.env.ETHERSCAN_API_KEY}`;
    const res = await fetch(requestUrl)
      .then((res) => res.json())
      .then((json) => json.result)
      .catch((error) => console.log('error', error));
    if (Array.isArray(res)) {
      success(
        `Successfully got ${res.length} transactions for ${contract.name}`,
      );
      const transactionVol = res.length;
      const gasUsed = res.reduce((pr, cu) => {
        return pr + Number(cu.gasUsed);
      }, 0);
      const co2Emissions = await patch.estimates.createEthereumEstimate({
        timestamp: startDate,
        gasUsed: gasUsed,
      });
      const emissions = co2Emissions.data.mass_g;
      const newStats: ContractStats = {
        emissions,
        gasUsed,
        transactionVol,
      };
      const newContract: Contract = {
        name: contract.name,
        address: contract.address,
        stats: newStats,
      };
      const newContracts = contracts
        .filter((contract) => contract.address !== newContract.address)
        .concat(newContract);
      setContracts(newContracts);
    } else {
      error(`Failed to get transactions for ${contract.name} because ${res}`);
      const newContract: Contract = {
        name: contract.name,
        address: contract.address,
        stats: DEFAULT_STATS,
      };
      const newContracts = contracts
        .filter((contract) => contract.address !== newContract.address)
        .concat(newContract);
      setContracts(newContracts);
    }
  };

  useEffect(() => {
    setBlocks();
  }, []);

  useEffect(() => {
    setBlocks();
  }, [endDate, startDate]);

  useEffect(() => {
    if (startBlock !== undefined && endBlock !== undefined) {
      contracts.forEach((contract) => updateStats(contract));
    }
  }, [startBlock, endBlock]);
  console.log({ contracts });
  return (
    <div
      className="w-full h-screen flex flex-col justify-center font-landing"
      style={{ backgroundColor: '#F8F8FB' }}
    >
      <Toaster position="top-right" />
      <div className="ml-8 w-full h-5/6">
        <p>Smart Contract Carbon Emissions Dashboard</p>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Vol</th>
              <th>Gas Used</th>
              <th>Emissions</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((contract) => {
              return (
                <tr>
                  <td>{contract.name}</td>
                  <td>{contract.address}</td>
                  <td>{contract.stats.transactionVol}</td>
                  <td>{contract.stats.gasUsed}</td>
                  <td>{contract.stats.emissions}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IndexPage;
