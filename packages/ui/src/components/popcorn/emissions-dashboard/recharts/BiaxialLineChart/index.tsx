import { ChartData } from '@popcorn/ui/src/interfaces/emissions-dashboard';
import * as convert from 'convert-units';
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

export interface BiaxialLineChartProps {
  data: ChartData[];
  height?: number;
  width?: number;
  areaColor?: string;
  barColor?: string;
  gridColor?: string;
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const emissionsConverted = convert(payload[1].value).from('mcg').toBest();
    return (
      <div className="bg-gray-50 p-1">
        <p className="text-xs ">{`${label}`}</p>
        <p className="text-xs text-indigo-500">{`Transaction Volume: ${payload[0].value.toLocaleString()}`}</p>
        <p className="text-xs text-green-500">{`CO2 Emissions (${
          emissionsConverted.unit
        }): ${Math.round(emissionsConverted.val)}`}</p>
      </div>
    );
  }
  return null;
};

export const BiaxialLineChart: React.FC<BiaxialLineChartProps> = ({
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
          <XAxis dataKey="date" hide={true} />
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
            stroke="#7c3aed" // indigo-500
            activeDot={{ r: 8 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="co2Emissions"
            fill="#10b981" // green-500
          />
          <Tooltip
            content={
              <CustomTooltip
                active={undefined}
                payload={undefined}
                label={undefined}
              />
            }
          />
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
