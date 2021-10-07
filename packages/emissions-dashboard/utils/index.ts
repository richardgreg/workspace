import { CloudIcon } from '@heroicons/react/outline';
import {
  ChartData,
  StatCardData,
  Transaction,
} from '@popcorn/ui/src/interfaces/emissions-dashboard';
import * as convert from 'convert-units';
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
  startDate: Date,
  granularity: string,
  count: number,
): Date => {
  const numSecondsByGranularity = getNumSecondsByGranularity(granularity);
  const startTimestamp = startDate.getTime() + count * numSecondsByGranularity;
  return new Date(startTimestamp);
};

export const getChartData = (
  transactions: Transaction[],
  startDate: Date,
  endDate: Date,
  unit: string,
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
    const date = getInterpolatedDate(startDate, granularity, i);
    const numTransactions = dataForRange.count();
    const gasUsed = dataForRange.sum('gasUsed');
    const totalGasPrice = dataForRange.sum('gasPrice') / GWEI_TO_ETH;
    const emissions = convert(dataForRange.sum('emissions'))
      .from('mcg')
      .to(unit);
    const averageGasPrice =
      numTransactions === 0 ? 0 : Math.round(totalGasPrice / numTransactions);
    return {
      averageGasPrice,
      co2Emissions: emissions,
      date,
      gasUsed,
      numTransactions,
      unit,
    };
  });
};

export const getStatCardData = (
  transactionsCurrentPeriod: Transaction[],
  transactionsPreviousPeriod: Transaction[],
  isTotalStats: boolean,
  unit: string,
  startDate: Date,
  endDate: Date,
): StatCardData[] => {
  const dateRangeInDays = getNumDaysBetweenTwoDates(startDate, endDate);
  const granularity = getGranularity(dateRangeInDays);
  const period = getPeriod(granularity, dateRangeInDays);
  const dataCur = aggregator
    .setCollection(transactionsCurrentPeriod)
    .setPeriod(period)
    .setGranularity(granularity)
    .setGroupBy('date')
    .setEndTime(endDate.toISOString())
    .aggregate()
    .select(0, period);

  const dataPrev = aggregator
    .setCollection(transactionsPreviousPeriod)
    .setPeriod(period)
    .setGranularity(granularity)
    .setGroupBy('date')
    .setEndTime(startDate.toISOString())
    .aggregate()
    .select(0, period);
  const totalEmissionsCurrentPeriod = Math.round(dataCur.sum('emissions'));
  const totalEmissionsPreviousPeriod = Math.round(dataPrev.sum('emissions'));
  const totalTransactionVolCurrentPeriod = dataCur.count();
  const totalTransactionVolPreviousPeriod = dataPrev.count();
  const emissionsChangePercentChange =
    totalEmissionsPreviousPeriod === 0
      ? `N/A`
      : `${percentChange(
          totalEmissionsPreviousPeriod,
          totalEmissionsCurrentPeriod,
        )}%`;

  const transactionVolPercentChange =
    totalTransactionVolPreviousPeriod === 0
      ? `N/A`
      : `${percentChange(
          totalTransactionVolPreviousPeriod,
          totalTransactionVolCurrentPeriod,
        )}%`;

  if (!isTotalStats) {
    return [
      {
        id: 1,
        name: `CO2 Emissions (${unit})`,
        stat: convert(totalEmissionsCurrentPeriod).from('mcg').to(unit),
        icon: CloudIcon,
        change: emissionsChangePercentChange,
        changeType:
          totalEmissionsCurrentPeriod > totalEmissionsPreviousPeriod
            ? 'increase'
            : 'decrease',
      },
      {
        id: 2,
        name: 'Transactions',
        stat: totalTransactionVolCurrentPeriod,
        icon: Globe,
        change: transactionVolPercentChange,
        changeType:
          totalTransactionVolCurrentPeriod > totalTransactionVolPreviousPeriod
            ? 'increase'
            : 'decrease',
      },
    ];
  }
  const averageGasPriceCurrentPeriod =
    dataCur.sum('gasPrice') / (GWEI_TO_ETH * dataCur.count());
  const averageGasPricePreviousPeriod =
    dataPrev.sum('gasPrice') / (GWEI_TO_ETH * dataPrev.count());

  const gasPricePercentChange =
    averageGasPricePreviousPeriod === 0
      ? `N/A`
      : `${percentChange(
          averageGasPricePreviousPeriod,
          averageGasPriceCurrentPeriod,
        )}%`;
  return [
    {
      id: 1,
      name: `CO2 Emissions (${unit})`,
      stat: convert(totalEmissionsCurrentPeriod).from('mcg').to(unit),
      icon: CloudIcon,
      change: emissionsChangePercentChange,
      changeType:
        totalEmissionsCurrentPeriod > totalEmissionsPreviousPeriod
          ? 'increase'
          : 'decrease',
    },
    {
      id: 2,
      name: 'Transactions',
      stat: totalTransactionVolCurrentPeriod,
      icon: Globe,
      change: transactionVolPercentChange,
      changeType:
        totalTransactionVolCurrentPeriod > totalTransactionVolPreviousPeriod
          ? 'increase'
          : 'decrease',
    },
    {
      id: 3,
      name: 'Average Gas Price',
      stat: Math.round(averageGasPriceCurrentPeriod),
      icon: Wind,
      change: gasPricePercentChange,
      changeType:
        averageGasPriceCurrentPeriod > averageGasPricePreviousPeriod
          ? 'increase'
          : 'decrease',
    },
  ];
};
