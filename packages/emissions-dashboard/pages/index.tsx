import { ContractContainer } from '@popcorn/ui/components/popcorn/emissions-dashboard/ContractContainer/index';
import { DateRangePicker } from '@popcorn/ui/components/popcorn/emissions-dashboard/DateRangePicker';
import { NavBar } from '@popcorn/ui/components/popcorn/emissions-dashboard/NavBar';
import {
  ChartReadyState,
  Contract,
  Transaction,
} from '@popcorn/ui/interfaces/emissions-dashboard';
import { ethers } from 'ethers';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import fetch from 'node-fetch';
import React, { useEffect, useState } from 'react';
import * as DEFAULT_CONTRACTS from './defaultContracts.json';

const CHART_COLORS = [
  { barColor: '#24b7a7', areaColor: '#ccfbf0' },
  { barColor: '#eb4c98', areaColor: '#fde6f3' },
  { barColor: '#f6732b', areaColor: '#feedd7' },
  { barColor: '#4084f2', areaColor: '#dbeafd' },
  { barColor: '#24b7a7', areaColor: '#ccfbf0' },
];

const IndexPage = (): JSX.Element => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [contracts, setContracts] = useState<Contract[]>(
    DEFAULT_CONTRACTS.defaultContracts,
  );
  const [previousPeriodStartDate, setPreviousPeriodStartDate] = useState<Date>(
    new Date(DateTime.now().minus({ days: 20 }).toISO()),
  );
  const [startDate, setStartDate] = useState<Date>(
    new Date(DateTime.now().minus({ days: 10 }).toISO()),
  );
  const [endDate, setEndDate] = useState<Date>(new Date());
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
    setReadyState('loading');
    const transactionsPreviousPeriod = await fetch(
      `.netlify/functions/load-transactions?startDate=${previousPeriodStartDate}&endDate=${startDate}`,
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
      `.netlify/functions/load-transactions?startDate=${startDate}&endDate=${endDate}`,
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

  const addContract = async (contract: Contract): Promise<void> => {
    let message: string;
    if (!contract.name) {
      message = `The contract name cannot be blank`;
    } else if (!contract.address) {
      message = `The contract address cannot be blank`;
    } else if (!ethers.utils.isAddress(contract.address)) {
      message = `The address must be a valid Ethereum address`;
    } else {
      const isContract = await fetch(
        `.netlify/functions/is-contract?contractAddress=${contract.address}`,
      )
        .then((res) => {
          return res.json();
        })
        .catch((err) => {
          console.log('error', err);
          setReadyState('error');
        });
      if (!isContract) {
        message = `The address does not point to a valid Ethereum contract`;
      } else {
        if (localStorage.getItem('contracts')) {
          const existingContracts = JSON.parse(
            localStorage.getItem('contracts'),
          );
          const listOfContractAddresses = existingContracts.map(
            (contract) => contract.address,
          );
          if (!listOfContractAddresses.includes(contract.address)) {
            existingContracts.push(contract);
            localStorage.setItem(
              'contracts',
              JSON.stringify(existingContracts),
            );
          }
        } else {
          localStorage.setItem('contracts', JSON.stringify([contract]));
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
    <div className="bg-white">
      <NavBar
        logo="/images/popcorn-logo.png"
        contractProps={{ addContract, open, setOpen }}
        contractErrorProps={{
          openAddContractModal,
          errorMessage,
          setErrorMessage,
        }}
        refresh={getTransactions}
      />
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto pb-8">
          <header>
            <div className="pt-6 py-5  ">
              <h1 className="text-5xl text-center font-medium leading-tight text-black">
                Smart Contract Emissions Dashboard
              </h1>
            </div>
          </header>
          <DateRangePicker
            updateDates={updateDates}
            startDate={startDate}
            endDate={endDate}
          />
          <ContractContainer
            transactionsPreviousPeriod={transactionsPreviousPeriod}
            transactionsCurrentPeriod={transactionsCurrentPeriod}
            startDate={startDate}
            readyState={readyState}
            endDate={endDate}
            areaColor={CHART_COLORS[3].areaColor}
            barColor={CHART_COLORS[3].barColor}
            isTotal={true}
            height={300}
          />
          {contracts.map((contract, index) => {
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
                areaColor={CHART_COLORS[index].areaColor}
                barColor={CHART_COLORS[index].barColor}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
