import { TransactionGroup } from 'interfaces';
import React from 'react';
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export interface AreaChartProps {
  data: TransactionGroup[];
  height?: number;
  width?: number;
  areaColor?: string;
  barColor?: string;
  gridColor?: string;
}

export const AreaBarChart: React.FC<AreaChartProps> = ({
  data,
  height,
  areaColor = '#C7D2FE',
  barColor = '#4F46E5',
  gridColor = '#E0E0E0',
}) => {
  const containsData =
    data.reduce((pr, cu) => {
      return pr + cu.co2Emissions;
    }, 0) > 0;
  return (
    <div className="w-screen grid justify-items-stretch">
      <ResponsiveContainer
        className="justify-self-start ml-3"
        width="87%"
        height={height}
      >
        {containsData ? (
          <ComposedChart data={data}>
            <XAxis dataKey="blockStartDate" scale="band" hide={true}></XAxis>
            <YAxis
              yAxisId="left"
              orientation="left"
              dataKey="numTransactions"
              tick={false}
              hide={true}
              type="number"
              domain={[0, 200]}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              dataKey="co2Emissions"
              tick={false}
              hide={true}
              type="number"
              domain={[0, 200]}
            />
            <Tooltip />
            <CartesianGrid stroke="#f5f5f5" />
            <Area
              type="monotone"
              dataKey="co2Emissions"
              stroke="#C7D2FE"
              yAxisId="left"
            />
            <Bar
              yAxisId="right"
              dataKey="numTransactions"
              barSize={20}
              fill="#4F46E5"
            />
          </ComposedChart>
        ) : (
          <ComposedChart data={[]}>
            <XAxis dataKey="blockStartDate" scale="band" hide={true}></XAxis>
            <CartesianGrid stroke={gridColor} />
            <text x="50%" fill="#D0D0D0" text-anchor="middle" dy="50%">
              `No trades were made under this contract in the date range
              provided`
            </text>
          </ComposedChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};
