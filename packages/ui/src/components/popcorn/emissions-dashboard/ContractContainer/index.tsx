import { CloudIcon } from '@heroicons/react/outline';
import { ChartData } from '@popcorn/ui/src/interfaces/emissions-dashboard';
import { percentChange } from '@popcorn/utils';
import React from 'react';
import { Globe, Wind } from 'react-feather';
import TimeSeriesAggregator from 'time-series-aggregator';
import {
  Contract,
  StatCardData,
  Transaction,
} from '../../../../interfaces/emissions-dashboard';
import { BiaxialLineChart } from '../recharts/BiaxialLineChart';
import { StatsCards } from '../StatsCards';

const aggregator = new TimeSeriesAggregator();

interface ContractContainerProps {
  transactionsCurrentPeriod: Transaction[];
  transactionsPreviousPeriod: Transaction[];
  previousPeriodStartDate: Date;
  startDate: Date;
  endDate: Date;
  contract: Contract;
}

const GWEI_TO_ETH = Math.pow(10, 9);

const getStatCardData = (
  transactionsCurrentPeriod: Transaction[],
  transactionsPreviousPeriod: Transaction[],
  startDate: Date,
  endDate: Date,
  previousPeriodStartDate: Date,
): StatCardData[] => {
  const transactionGroupSummariesCurrentPeriod = getChartData(
    transactionsCurrentPeriod,
    startDate,
    endDate,
  );
  const transactionGroupSummariesPreviousPeriod = getChartData(
    transactionsPreviousPeriod,
    previousPeriodStartDate,
    startDate,
  );
  const totalEmissionsCurrentPeriod =
    transactionGroupSummariesCurrentPeriod.reduce((acc, currentGroup) => {
      return acc + currentGroup.co2Emissions;
    }, 0);
  const totalEmissionsPreviousPeriod =
    transactionGroupSummariesPreviousPeriod.reduce((acc, currentGroup) => {
      return acc + currentGroup.co2Emissions;
    }, 0);
  const emissionsChangePercentChange = percentChange(
    totalEmissionsPreviousPeriod,
    totalEmissionsCurrentPeriod,
  );

  const totalTransactionVolCurrentPeriod =
    transactionGroupSummariesCurrentPeriod.reduce((acc, currentGroup) => {
      return acc + currentGroup.numTransactions;
    }, 0);
  const totalTransactionVolPreviousPeriod =
    transactionGroupSummariesPreviousPeriod.reduce((acc, currentGroup) => {
      return acc + currentGroup.numTransactions;
    }, 0);
  const transactionVolPercentChange = percentChange(
    totalTransactionVolPreviousPeriod,
    totalTransactionVolCurrentPeriod,
  );

  const totalGasPriceCurrentPeriod =
    transactionGroupSummariesCurrentPeriod.reduce((acc, currentGroup) => {
      return acc + currentGroup.averageGasPrice;
    }, 0);
  const totalGasPricePreviousPeriod =
    transactionGroupSummariesPreviousPeriod.reduce((acc, currentGroup) => {
      return acc + currentGroup.averageGasPrice;
    }, 0);
  const averageGasPriceCurrentPeriod =
    totalGasPriceCurrentPeriod === 0
      ? 0
      : Math.round(
          totalGasPriceCurrentPeriod /
            transactionGroupSummariesCurrentPeriod.length,
        );
  const averageGasPricePreviousPeriod =
    totalGasPriceCurrentPeriod === 0
      ? 0
      : Math.round(
          totalGasPricePreviousPeriod /
            transactionGroupSummariesPreviousPeriod.length,
        );

  const gasPricePercentChange = percentChange(
    averageGasPricePreviousPeriod,
    averageGasPriceCurrentPeriod,
  );
  return [
    {
      id: 1,
      name: 'CO2 Emissions (µg)',
      stat: totalEmissionsCurrentPeriod,
      icon: CloudIcon,
      change: `${Math.round(emissionsChangePercentChange)}%`,
      changeType: emissionsChangePercentChange > 0 ? 'increase' : 'decrease',
    },
    {
      id: 2,
      name: 'Transactions',
      stat: totalTransactionVolCurrentPeriod,
      icon: Globe,
      change: `${transactionVolPercentChange}%`,
      changeType: transactionVolPercentChange > 0 ? 'increase' : 'decrease',
    },
    {
      id: 3,
      name: 'Average Gas Price',
      stat: averageGasPriceCurrentPeriod,
      icon: Wind,
      change: `${gasPricePercentChange}%`,
      changeType: gasPricePercentChange > 0 ? 'increase' : 'decrease',
    },
  ];
};

const getTransactionGroupSummary = (transactions: Transaction[], date) => {
  const numTransactions = transactions.length;
  const gasUsed = transactions.reduce((pr, cu) => {
    return pr + Number(cu.gasUsed);
  }, 0);
  const totalGasPrice = transactions.reduce((pr, cu) => {
    return pr + Number(cu.gasPrice) / GWEI_TO_ETH;
  }, 0);

  const averageGasPrice =
    totalGasPrice === 0 ? 0 : Math.round(totalGasPrice / numTransactions);

  const emissions = Math.round(
    transactions.reduce((pr, cu) => {
      return pr + Number(cu.emissions);
    }, 0),
  );
  return {
    averageGasPrice,
    co2Emissions: emissions,
    date: new Date(date),
    gasUsed,
    numTransactions,
  };
};

const getChartData = (
  transactions: Transaction[],
  startDate: Date,
  endDate: Date,
): ChartData[] => {
  const timeRange = endDate.getTime() - startDate.getTime();
  const numDays = Math.round(timeRange / (1000 * 3600 * 24));
  const data = aggregator
    .setCollection(transactions)
    .setPeriod(numDays)
    .setGranularity('day')
    .setGroupBy('date')
    .setEndTime(endDate.toISOString())
    .aggregate();
  const groupedCollection = Object(data).groupedCollection;
  var groupSummaries = [];
  for (const [date, transactions] of Object.entries(groupedCollection)) {
    const groupSummary = getTransactionGroupSummary(
      transactions as Transaction[],
      date,
    );
    groupSummaries.push(groupSummary);
  }
  return groupSummaries.sort((a, b) => a.date - b.date);
};

export const ContractContainer: React.FC<ContractContainerProps> = ({
  transactionsCurrentPeriod,
  transactionsPreviousPeriod,
  startDate,
  endDate,
  previousPeriodStartDate,
  contract,
}): JSX.Element => {
  return (
    <div className="mb-5 mt-12 mx-8 self-center">
      <div className="max-w-7xl">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">
          {contract.name}
        </h1>
      </div>
      <div className="max-w-7xl mb-5">
        <StatsCards
          stats={getStatCardData(
            transactionsCurrentPeriod,
            transactionsPreviousPeriod,
            startDate,
            endDate,
            previousPeriodStartDate,
          )}
        />
      </div>
      <div className="max-w-7xl">
        <div className="grid grid-cols-1 gap-4 lg:col-span-2">
          <div className="rounded-lg bg-white overflow-hidden shadow py-6">
            <BiaxialLineChart
              data={getChartData(transactionsCurrentPeriod, startDate, endDate)}
              height={224}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
