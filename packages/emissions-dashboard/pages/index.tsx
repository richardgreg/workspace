import { Web3Provider } from '@ethersproject/providers';
import { ContractContainer } from '@popcorn/ui/components/popcorn/emissions-dashboard/ContractContainer/index';
import { DateRangePicker } from '@popcorn/ui/components/popcorn/emissions-dashboard/DateRangePicker';
import { NavBar } from '@popcorn/ui/components/popcorn/emissions-dashboard/NavBar';
import { TotalStats } from '@popcorn/ui/components/popcorn/emissions-dashboard/TotalStats/index';
import {
  ChartReadyState,
  Contract,
  Transaction,
} from '@popcorn/ui/interfaces/emissions-dashboard';
import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router';
import fetch from 'node-fetch';
import React, { useEffect, useState } from 'react';
import web3 from 'web3';

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
  const [startDate, setStartDate] = useState<Date>(new Date('2021-06-15'));
  const [endDate, setEndDate] = useState<Date>(new Date('2021-08-01'));
  const [readyState, setReadyState] = useState<ChartReadyState>('loading');

  const [transactionsPreviousPeriod, setTransactionsPreviousPeriod] = useState<
    Transaction[]
  >([]);
  const [transactionsCurrentPeriod, setTransactionsCurrentPeriod] = useState<
    Transaction[]
  >([]);

  useEffect(() => {
    if (endDate && startDate) getTransactions();
  }, [endDate, startDate]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      router.replace(window.location.pathname);
    }
  }, [router.pathname]);

  const getTransactions = async () => {
    const transactionsPreviousPeriod = await fetch(
      `.netlify/functions/loadtransactions?startDate=${previousPeriodStartDate}&endDate=${startDate}`,
    )
      .then((res) => {
        return res.json();
      })
      .then((txns) => {
        // Convert gasUsed and gasPrice to number
        return txns.map((txn) => {
          txn.gasUsed = Number(txn.gasUsed);
          txn.gasPrice = Number(txn.gasPrice);
          return txn;
        });
      })
      .catch((err) => {
        console.log('error', err);
        setReadyState('error');
      });
    const transactionsCurrentPeriod = await fetch(
      `.netlify/functions/loadtransactions?startDate=${startDate}&endDate=${endDate}`,
    )
      .then((res) => {
        return res.json();
      })
      .then((txns) => {
        // Convert gasUsed and gasPrice to number
        return txns.map((txn) => {
          txn.gasUsed = Number(txn.gasUsed);
          txn.gasPrice = Number(txn.gasPrice);
          return txn;
        });
      })
      .catch((err) => {
        console.log('error', err);
        setReadyState('error');
      });
    setReadyState('done');
    transactionsPreviousPeriod
      ? setTransactionsPreviousPeriod(transactionsPreviousPeriod)
      : setTransactionsPreviousPeriod([]);
    transactionsCurrentPeriod
      ? setTransactionsCurrentPeriod(transactionsCurrentPeriod)
      : setTransactionsCurrentPeriod([]);
  };

  const updateDates = (startDate: Date, endDate: Date): void => {
    setReadyState('loading');
    clearTransactions();
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

    if (!contractAddress) {
      message = `No Contract Address was provided. ${enterMessage}`;
    } else if (!web3.utils.isAddress(contractAddress)) {
      message = `The address is not a valid Ethereum address. ${enterMessage}`;
    } else {
      const code = await library.getCode(contractAddress);
      const isConnected = !(code === '0x0' || code === '0x');
      if (!isConnected) {
        message = `The address does not point to a valid Ethereum contract. ${enterMessage}`;
      } else {
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
          localStorage.setItem('contracts', JSON.stringify([contractAddress]));
        }
      }
    }

    setErrorMessage(message);
    setOpen(false);
  };

  const clearTransactions = () => {
    setTransactionsCurrentPeriod([]);
    setTransactionsPreviousPeriod([]);
  };

  const openAddContractModal = (): void => {
    setOpen(true);
    setErrorMessage('');
  };
  return (
    <div>
      <NavBar
        title="Smart Contract Emissions Dashboard"
        logo="/images/popcorn-logo.png"
        contractProps={{ addContract, open, setOpen }}
        contractErrorProps={{
          openAddContractModal,
          errorMessage,
          setErrorMessage,
        }}
      />
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 ">
        <DateRangePicker
          updateDates={updateDates}
          startDate={startDate}
          endDate={endDate}
        />
        <TotalStats
          transactionsPreviousPeriod={transactionsPreviousPeriod}
          transactionsCurrentPeriod={transactionsCurrentPeriod}
          startDate={startDate}
          readyState={readyState}
          endDate={endDate}
        />
        {contracts.map((contract) => {
          return (
            <ContractContainer
              transactionsPreviousPeriod={transactionsPreviousPeriod.filter(
                (txn) => txn.to === contract.address,
              )}
              transactionsCurrentPeriod={transactionsCurrentPeriod.filter(
                (txn) => txn.to === contract.address,
              )}
              contract={contract}
              endDate={endDate}
              startDate={startDate}
              readyState={readyState}
            />
          );
        })}
      </div>
    </div>
  );
};

export default IndexPage;
