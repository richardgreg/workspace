import { CloudIcon } from '@heroicons/react/outline';
import {
  StatCardData,
  Transaction,
} from '@popcorn/ui/interfaces/emissions-dashboard';
import { ChartData } from '@popcorn/ui/src/interfaces/emissions-dashboard';
import {
  getGranularity,
  getInterpolatedDate,
  getNumDaysBetweenTwoDates,
  getPeriod,
  percentChange,
} from '@popcorn/utils';
import React from 'react';
import { Globe, Wind } from 'react-feather';
import TimeSeriesAggregator from 'time-series-aggregator';
import { BiaxialLineChart } from '../recharts/BiaxialLineChart';
import { StatsCards } from '../StatsCards';
const aggregator = new TimeSeriesAggregator();

interface TotalStatsProps {
  transactionsCurrentPeriod: Transaction[];
  transactionsPreviousPeriod: Transaction[];
  previousPeriodStartDate: Date;
  startDate: Date;
  endDate: Date;
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

  const averageGasPriceCurrentPeriod =
    totalTransactionVolCurrentPeriod === 0
      ? 0
      : transactionGroupSummariesCurrentPeriod
          .filter((txnGroup) => txnGroup.numTransactions !== 0)
          .reduce((acc, currentGroup) => {
            return acc + currentGroup.averageGasPrice;
          }, 0) /
        transactionGroupSummariesCurrentPeriod.filter(
          (txnGroup) => txnGroup.numTransactions !== 0,
        ).length;
  const averageGasPricePreviousPeriod =
    totalTransactionVolPreviousPeriod === 0
      ? 0
      : transactionGroupSummariesPreviousPeriod
          .filter((txnGroup) => txnGroup.numTransactions !== 0)
          .reduce((acc, currentGroup) => {
            return acc + currentGroup.averageGasPrice;
          }, 0);

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

const getChartData = (
  transactions: Transaction[],
  startDate: Date,
  endDate: Date,
): ChartData[] => {
  const dateRangeInDays = getNumDaysBetweenTwoDates(startDate, endDate);
  const granularity = getGranularity(dateRangeInDays);
  const period = getPeriod(granularity, dateRangeInDays);
  const data = aggregator
    .setCollection(transactions)
    .setPeriod(period)
    .setGranularity(granularity)
    .setGroupBy('date')
    .setEndTime(endDate.toISOString())
    .aggregate();
  return new Array(period)
    .fill(undefined)
    .map((x, i) => {
      const dataForRange = data.select(i);
      const date = getInterpolatedDate(endDate, granularity, i);
      const numTransactions = dataForRange.count();
      const gasUsed = dataForRange.sum('gasUsed');
      const totalGasPrice = dataForRange.sum('gasPrice') / GWEI_TO_ETH;
      const emissions = Math.round(dataForRange.sum('emissions'));
      const averageGasPrice =
        numTransactions === 0 ? 0 : Math.round(totalGasPrice / numTransactions);
      return {
        averageGasPrice,
        co2Emissions: emissions,
        date,
        gasUsed,
        numTransactions,
      };
    })
    .reverse();
};

export const TotalStats: React.FC<TotalStatsProps> = ({
  transactionsCurrentPeriod,
  transactionsPreviousPeriod,
  startDate,
  endDate,
  previousPeriodStartDate,
}): JSX.Element => {
  return (
    <div className="py-10 mx-8 self-center">
      <div className="max-w-7xl">
        <div className="mt-2 mb-5">
          <dt>
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              Total Stats
            </h1>
          </dt>
          <dd className=" text-base text-gray-500">
            ({startDate.toUTCString()})
          </dd>
        </div>
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
              height={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
