import { Transaction } from '@popcorn/ui/interfaces/emissions-dashboard';
import * as convert from 'convert-units';
import TimeSeriesAggregator from 'time-series-aggregator';
import { getGranularity, getNumDaysBetweenTwoDates, getPeriod } from './index';
const aggregator = new TimeSeriesAggregator();

export const getMassUnitForTxns = (
  transactions: Transaction[],
  startDate: Date,
  endDate: Date,
) => {
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
  const numNonEmptyChartEntries = new Array(period)
    .fill(undefined)
    .map((x, i) => {
      const emissions = data.select(0 + i, i + i).sum('emissions');
      return emissions;
    })
    .filter((emissions) => emissions !== 0).length;
  const meanEmissionsNonEmptyChartEntries =
    data.select(0, period).sum('emissions') / numNonEmptyChartEntries;
  const emissionsConverted = convert(meanEmissionsNonEmptyChartEntries)
    .from('mcg')
    .toBest();
  return emissionsConverted.unit;
};
