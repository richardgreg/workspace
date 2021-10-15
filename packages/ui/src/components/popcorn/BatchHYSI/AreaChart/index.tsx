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
  data: ChartData[];
  xAxisDataKey?: string;
  yAxisDataKey?: string;
  areaCol?: string;
  strokeCol?: string;
}

export interface ChartData {
  date: string;
  yield: number;
}

export const HYSIAreaChart: React.FC<HYSIAreaChartProps> = ({
  data,
  xAxisDataKey = 'date',
  yAxisDataKey = 'yield',
  strokeCol = '#28bd87',
  areaCol = '#effdf6',
}) => {
  return (
    <ResponsiveContainer width="100%" height={455}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <XAxis
          dataKey={xAxisDataKey}
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
          dataKey={yAxisDataKey}
          stroke={strokeCol}
          fill={areaCol}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
