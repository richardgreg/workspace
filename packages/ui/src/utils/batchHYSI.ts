import { DateTime } from 'luxon';

const getDateXAxisValues = (range: string): string[] => {
  const now = DateTime.now();
  switch (range) {
    case '1YR':
      return new Array(13).fill(undefined).map((x, i) => {
        const date = now.plus({ months: i });
        return date.monthShort + ' ' + (date.year % 100);
      });
    case '180D':
      return new Array(7).fill(undefined).map((x, i) => {
        const date = now.plus({ months: i });
        return date.day + ' ' + date.monthShort;
      });
    case '30D':
      return new Array(11).fill(undefined).map((x, i) => {
        const date = now.plus({ days: i * 3 });
        return date.day + ' ' + date.monthShort;
      });
    case '14D':
      return new Array(8).fill(undefined).map((x, i) => {
        const date = now.plus({ days: (i * 14) / 8 });
        return date.day + ' ' + date.monthShort;
      });
    case '7D':
      return new Array(7).fill(undefined).map((x, i) => {
        const date = now.plus({ days: i * 7 });
        return date.day + ' ' + date.monthShort;
      });

    default:
      break;
  }
};

export const getDummyData = (range: string) => {
  const xAxis = getDateXAxisValues(range);
  return xAxis.map((date, i) => {
    return {
      date: date,
      yield: i * 200 + Math.random() * 200,
    };
  });
};
