import { DateTime } from 'luxon';
import React from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface HYSIAreaChartProps {
  range: string;
}

const getDateXAxisValues = (range: string, numTicks: number): string[] => {
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
        return date.hour + ':00 ' + date.day + ' ' + date.monthShort;
      });
    case '7D':
      return new Array(7).fill(undefined).map((x, i) => {
        const date = now.plus({ days: i * 7 });
        return date.hour + ':00 ' + date.day + ' ' + date.monthShort;
      });
    case '24hr':
      return new Array(9).fill(undefined).map((x, i) => {
        const date = now.plus({ hours: i * 3 });
        return date.hour + ':00 ' + date.day + ' ' + date.monthShort;
      });
    default:
      break;
  }
};

const getDummyData = (range: string, numTicks) => {
  const xAxis = getDateXAxisValues(range, numTicks);
  console.log({ xAxis });
  return xAxis.map((date, i) => {
    return {
      date: date,
      yield: i * 200 + Math.random() * 200,
    };
  });
};

export const HYSIAreaChart: React.FC<HYSIAreaChartProps> = ({ range }) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart
        data={getDummyData(range, 12)}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <XAxis
          dataKey="date"
          interval={0}
          tick={{ fontSize: 10 }}
          // tick={(props) => <Text>{props.payload.value}</Text>}
        />
        <YAxis tick={{ fontSize: 10 }} />
        <CartesianGrid />
        <Tooltip />
        <Area
          strokeWidth={3}
          type="monotone"
          dataKey="yield"
          stroke="#28bd87"
          fill="#effdf6"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
