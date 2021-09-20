import {
  ChartData,
  Transaction,
} from '@popcorn/ui/src/interfaces/emissions-dashboard';
import TimeSeriesAggregator from 'time-series-aggregator';
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
