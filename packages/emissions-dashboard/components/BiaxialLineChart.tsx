import { TransactionGroup } from 'interfaces';
import React from 'react';
import {
  CartesianGrid,
  ComposedChart,
  Line,
  LineChart,
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

export const BiaxialLineChart: React.FC<AreaChartProps> = ({
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
    <ResponsiveContainer
      className="justify-self-center"
      width="100%"
      height={height}
    >
      {containsData ? (
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 30,
            bottom: 5,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="blockStartDate" hide={true} />
          <YAxis dataKey="numTransactions" yAxisId="left" hide={true} />
          <YAxis
            dataKey="co2Emissions"
            yAxisId="right"
            orientation="right"
            hide={true}
          />

          <Line
            yAxisId="left"
            type="monotone"
            dataKey="numTransactions"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="co2Emissions"
            fill="#82ca9d"
          />
          <Tooltip />
        </LineChart>
      ) : (
        <ComposedChart
          data={[]}
          margin={{
            top: 5,
            right: 30,
            left: 30,
            bottom: 5,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <text x="50%" fill="#D0D0D0" text-anchor="middle" dy="50%">
            `No trades were made under this contract in the date range provided`
          </text>
        </ComposedChart>
      )}
    </ResponsiveContainer>
  );
};
