import { InfuraProvider } from '@ethersproject/providers';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
const EthDater = require('ethereum-block-by-date');

const UNISWAP_V2_CONTRACT_ADDRESSES =
  '0x7a250d5630b4cf539739df2c5dacb4c659f2488d';
const START_DATE = '2021-08-20T00:00:00Z';
const END_DATE = '2021-08-20T00:02:00Z';

const IndexPage = () => {
  const router = useRouter();
  const [provider, setProvider] = useState<InfuraProvider>();
  const [dater, setDater] = useState();
  const [startBlock, setStartBlock] = useState<string>();
  const [endBlock, setEndBlock] = useState<string>();
  const [blocksInRange, setBlocksInRange] = useState<number[]>([]);
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      router.replace(window.location.pathname);
    }
  }, [router.pathname]);

  const initialize = async () => {
    console.log('Setting up Infura provider...');
    const provider = new InfuraProvider('homestead', {
      projectId: process.env.INFURA_PROJECT_ID,
      projectSecret: process.env.INFURA_PROJECT_SECRET,
    });
    const dater = new EthDater(provider);

    setProvider(provider);
    setDater(dater);
  };

  const getBlocks = async () => {
    const startBlock = await (await dater.getDate(START_DATE)).block;
    const endBlock = await (await dater.getDate(END_DATE)).block;
    setStartBlock(startBlock);
    setEndBlock(endBlock);
    setBlocksInRange(
      new Array(endBlock - startBlock)
        .fill(undefined)
        .map((x, i) => startBlock + i),
    );
  };

  const getTransactions = async () => {
    const blockData = await Promise.all(
      blocksInRange.map(async (block) => await provider.getBlock(block)),
    );
    const txs = blockData.map((block) => block.transactions).flat();
    const transactions = await Promise.all(
      txs.map(async (tx) => await provider.getTransaction(tx)),
    );
    setTransactions(transactions);
  };

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (dater !== undefined && provider !== undefined) {
      getBlocks();
    }
  }, [provider, dater]);

  useEffect(() => {
    if (startBlock !== undefined && endBlock !== undefined) {
      getTransactions();
    }
  }, [startBlock, endBlock]);

  useEffect(() => {
    if (blocksInRange.length > 0) {
      getTransactions();
    }
  }, [startBlock, endBlock]);

  return (
    <div
      className="w-full h-screen flex flex-col justify-center font-landing"
      style={{ backgroundColor: '#F8F8FB' }}
    >
      <div className="flex-row w-full h-5/6">
        <div className="w-1/2 h-full">
          <div className="flex flex-col justify-between ml-24 md:w-8/12 2xl:mx-auto xl:w-1/2 h-full">
            Smart Contract Carbon Emissions Dashboard
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
