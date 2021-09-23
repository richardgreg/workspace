import { CloudIcon } from '@heroicons/react/outline';
import {
  ChartData,
  StatCardData,
  Transaction,
} from '@popcorn/ui/src/interfaces/emissions-dashboard';
import { Globe, Wind } from 'react-feather';
import TimeSeriesAggregator from 'time-series-aggregator';
import { percentChange } from './percentChange';
const aggregator = new TimeSeriesAggregator();

const GWEI_TO_ETH = Math.pow(10, 9);

export const getNumDaysBetweenTwoDates = (
  startDate: Date,
  endDate: Date,
): number => {
  const timeRange = endDate.getTime() - startDate.getTime();
  const numDays = Math.round(timeRange / (1000 * 3600 * 24));
  return numDays;
};

export const getGranularity = (numDays: number): any => {
  if (numDays < 5) return 'hour';
  if (numDays < 56) return 'day';
  if (numDays < 270) return 'week';
  return 'month';
};

export const getPeriod = (granularity: string, numDays: number): number => {
  if (granularity === 'hour') return numDays * 24;
  if (granularity === 'day') return numDays;
  if (granularity === 'week') return Math.round(numDays / 7);
  return Math.round(numDays / 30);
};

export const getNumSecondsByGranularity = (granularity: string): number => {
  if (granularity === 'hour') return 60 * 60 * 1000;
  if (granularity === 'day') return 60 * 60 * 24 * 1000;
  if (granularity === 'week') return 60 * 60 * 24 * 7 * 1000;
  // Note assuming 30 day months
  return 60 * 60 * 24 * 30 * 1000;
};

export const getInterpolatedDate = (
  endDate: Date,
  granularity: string,
  count: number,
): Date => {
  const numSecondsByGranularity = getNumSecondsByGranularity(granularity);
  const startTimestamp = endDate.getTime() - count * numSecondsByGranularity;
  return new Date(startTimestamp);
};

export const getChartData = (
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
  return new Array(period).fill(undefined).map((x, i) => {
    const dataForRange = data.select(period - i - 1, period - i);
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
  });
};

export const getStatCardData = (
  transactionsCurrentPeriod: Transaction[],
  transactionsPreviousPeriod: Transaction[],
  isTotalStats: boolean,
): StatCardData[] => {
  const totalEmissionsCurrentPeriod = Math.round(
    transactionsCurrentPeriod.reduce((acc, cu) => acc + cu.emissions, 0),
  );
  const totalEmissionsPreviousPeriod = Math.round(
    transactionsPreviousPeriod.reduce((acc, cu) => acc + cu.emissions, 0),
  );
  const emissionsChangePercentChange = percentChange(
    totalEmissionsPreviousPeriod,
    totalEmissionsCurrentPeriod,
  );

  const totalTransactionVolCurrentPeriod = transactionsCurrentPeriod.length;
  const totalTransactionVolPreviousPeriod = transactionsPreviousPeriod.length;
  const transactionVolPercentChange = percentChange(
    totalTransactionVolPreviousPeriod,
    totalTransactionVolCurrentPeriod,
  );

  if (!isTotalStats) {
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
    ];
  }
  const averageGasPriceCurrentPeriod =
    transactionsCurrentPeriod.length === 0
      ? 0
      : Math.round(
          transactionsPreviousPeriod.reduce(
            (acc, cu) => acc + Number(cu.gasPrice),
            0,
          ) /
            (GWEI_TO_ETH * transactionsCurrentPeriod.length),
        );
  const averageGasPricePreviousPeriod =
    transactionsPreviousPeriod.length === 0
      ? 0
      : Math.round(
          transactionsPreviousPeriod.reduce(
            (acc, cu) => acc + Number(cu.gasPrice),
            0,
          ) /
            (GWEI_TO_ETH * transactionsPreviousPeriod.length),
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
