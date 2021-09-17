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
