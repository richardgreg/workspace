import { ChartData } from '@popcorn/ui/src/interfaces/emissions-dashboard';
import * as convert from 'convert-units';
import { format } from 'date-fns';
import React from 'react';
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts';
import { getEmptyChartData } from '../../dummyEmissionsData';
import Spinner from '../../Spinner';

export interface ComposedBarChartProps {
  data?: ChartData[];
  height?: number;
  width?: number;
  topPadding?: number;
  areaColor?: string;
  barColor?: string;
  gridColor?: string;
  transactionsDataKey?: string;
  dateDataKey?: string;
  co2EmissionDataKey?: string;
}

export interface CustomTooltipProps extends TooltipProps<string, string> {
  transactionsColor: string;
  co2EmissionColor: string;
}

const CustomTooltip = ({
  active,
  payload,
  label,
  transactionsColor,
  co2EmissionColor,
}: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const emissionsConverted = convert(payload[1].value).from('mcg').toBest();

    return (
      <div className="bg-white rounded p-2 shadow-lg">
        <p className="text-xs font-bold mb-2">{`${format(
          new Date(label),
          'MM/dd/yyyy',
        )}`}</p>

        <ul className="m-0 p-0 space-y-2">
          <li className="flex gap-2 m-0 p-0">
            <div
              className={`w-4 h-4 border `}
              style={{ background: transactionsColor }}
            ></div>

            <div className="text-xs">{`Transaction: ${payload[0].value.toLocaleString()}`}</div>
          </li>
          {emissionsConverted !== null && (
            <li className="flex gap-2">
              <div
                className={`w-4 h-4 border `}
                style={{ background: co2EmissionColor }}
              ></div>
              <div className="text-xs">{`CO2 Emissions: ${Math.round(
                emissionsConverted.val,
              )}${emissionsConverted.unit}`}</div>
            </li>
          )}
        </ul>
      </div>
    );
  }

  return null;
};

const ChartContentWrapper: React.FC<
  React.PropsWithChildren<ComposedBarChartProps>
> = (props) => {
  return (
    <div
      className="w-full flex flex-wrap content-center border-2 border-gray-50 justify-center "
      style={{
        objectFit: 'cover',
        height: props.height,
        marginTop: 5,
        marginRight: 30,
        marginLeft: 30,
        marginBottom: 5,
      }}
    >
      {props.children}
    </div>
  );
};

export const ChartLoading: React.FC<ComposedBarChartProps> = ({ height }) => {
  return (
    <ChartContentWrapper height={height}>
      <Spinner />
    </ChartContentWrapper>
  );
};

export const ChartError: React.FC<ComposedBarChartProps> = ({ height }) => {
  return (
    <ChartContentWrapper height={height}>
      <p className="text-lg text-gray-500">Error loading transactions</p>
    </ChartContentWrapper>
  );
};

export const ChartEmpty: React.FC<ComposedBarChartProps> = ({ height }) => {
  return (
    <ChartContentWrapper height={height}>
      <p className="text-lg text-gray-500">No transactions were made</p>
    </ChartContentWrapper>
  );
};

const emptyData = getEmptyChartData();

export const ComposedBarChart: React.FC<ComposedBarChartProps> = ({
  data,
  height,
  topPadding = 10,
  areaColor = '#C7D2FE',
  barColor = '#4F46E5',
  gridColor = '#E0E0E0',
  transactionsDataKey = 'numTransactions',
  co2EmissionDataKey = 'co2Emissions',
}) => {
  const containsData =
    data?.reduce((pr, cu) => {
      return pr + cu.co2Emissions;
    }, 0) > 0;

  return containsData ? (
    <ResponsiveContainer
      className="justify-self-center"
      width="100%"
      height={height}
    >
      <ComposedChart data={data}>
        <XAxis dataKey={transactionsDataKey} hide={true}></XAxis>

        <YAxis
          padding={{
            // top padding for the highest value in the chart
            top: topPadding,
          }}
          dataKey={transactionsDataKey}
          yAxisId="right-transactions"
          orientation="left"
          hide={true}
        />
        <YAxis
          dataKey={co2EmissionDataKey}
          yAxisId="right-emissions"
          orientation="left"
          hide={true}
        />

        <CartesianGrid horizontal={false} stroke={gridColor} />

        <Area
          type="monotone"
          dataKey={co2EmissionDataKey}
          yAxisId="right-emissions"
          stroke="transparent"
          fill={areaColor}
          activeDot={{ r: 0 }}
          x={10}
        />

        <Bar
          radius={[5, 5, 0, 0]}
          yAxisId="right-transactions"
          dataKey={transactionsDataKey}
          fill={barColor}
        />
        <Area
          type="monotone"
          yAxisId="right-transactions"
          dataKey={transactionsDataKey}
          fill="transparent"
          stroke="transparent"
          activeDot={{ r: 6, fill: 'red', stroke: 'white', strokeWidth: 3 }}
        />

        <Tooltip
          cursor={{ stroke: 'red', strokeDasharray: 5 }}
          content={
            <CustomTooltip
              transactionsColor={barColor}
              co2EmissionColor={areaColor}
            />
          }
        />
      </ComposedChart>
    </ResponsiveContainer>
  ) : (
    <ChartEmpty height={height} />
  );
};
