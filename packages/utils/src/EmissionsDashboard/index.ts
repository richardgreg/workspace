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
