import React from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export const HYSIAreaChart = ({}) => {
  return (
    <AreaChart
      width={730}
      height={250}
      data={[
        {
          name: 'Page A',
          pv: 2400,
        },
        {
          name: 'Page B',
          pv: 1398,
        },
        {
          name: 'Page C',
          pv: 9800,
        },
        {
          name: 'Page D',
          pv: 3908,
        },
        {
          name: 'Page E',
          pv: 4800,
        },
        {
          name: 'Page F',
          pv: 3800,
        },
        {
          name: 'Page G',
          pv: 4300,
        },
        {
          name: 'Page H',
          pv: 4300,
        },
        {
          name: 'Page I',
          pv: 4300,
        },
        {
          name: 'Page J',
          pv: 4300,
        },
        {
          name: 'Page K',
          pv: 4300,
        },
        {
          name: 'Page L',
          pv: 4300,
        },
      ]}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid />
      <Tooltip />
      <Area
        strokeWidth={3}
        type="monotone"
        dataKey="pv"
        stroke="#28bd87"
        fill="#effdf6"
      />
    </AreaChart>
  );
};
