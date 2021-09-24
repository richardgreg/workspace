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
import { ColorSwatch } from '../../ColorSwatch';
import { getEmptyChartData } from '../../dummyEmissionsData';
import Spinner from '../../Spinner';

export interface ComposedBarChartProps {
  data?: ChartData[];
  height?: number;
  width?: number;
  areaColor?: string;
  barColor?: string;
  gridColor?: string;
  transactionsDataKey?: string;
  dateDataKey?: string;
  co2EmissionDataKey?: string;
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<string, string>) => {
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
            <ColorSwatch color="indigo" />{' '}
            <div className="text-xs">{`Transaction: ${payload[0].value.toLocaleString()}`}</div>
          </li>
          <li className="flex gap-2">
            <ColorSwatch color="green" />{' '}
            <div className="text-xs">{`CO2 Emissions: ${Math.round(
              emissionsConverted.val,
            )}${emissionsConverted.unit}`}</div>
          </li>
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
  areaColor = '#C7D2FE',
  barColor = '#4F46E5',
  gridColor = '#E0E0E0',
  transactionsDataKey = 'numTransactions',
  dateDataKey = 'date',
  co2EmissionDataKey = 'co2Emissions',
}) => {
  // we need a reference to the chart html element to get the total width
  const [chartRef, setChartRef] =
    React.useState<React.MutableRefObject<HTMLElement>>();
  // this state variable is here to be able to trigger a rerender when the window resizes
  const [_windowSize, setWindowSize] = React.useState<number>();

  /**
   * Get an array of x positions for each vertical line to draw on the cartesian grid
   */
  function getVerticalPoints() {
    // return empty array if data isn't provided or is not ready yet
    if (!data) return [];

    // get the html element of the chart
    const chartEl = chartRef.current as HTMLElement;

    // if the element can't be found just return empty array
    if (!chartEl || !chartEl.offsetWidth) return [];

    // get total width of the chart
    const chartWidth = chartEl.offsetWidth - 10;
    // calculate the width of a single bar in this chart
    const barWidth = chartWidth / data.length;

    // create x positions for each data entry so they end up in the middle of each bar in the chart
    // note: this also matches up with the vertical line for the tooltip
    return data.map((_item, index) => {
      return barWidth * index + barWidth / 2 + 5;
    });
  }

  /**
   * When the window resizes the VerticalPoints need to be recalculated and we need to trigger a rerender.
   */
  const handleWindowResize = React.useCallback(() => {
    setWindowSize(window.innerWidth);
  }, []);

  /**
   * Window resize effect
   */
  React.useEffect(() => {
    // add event listeners for window resize
    window.addEventListener('resize', handleWindowResize);
    // remove event listeners when component unmounts
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  function renderChart() {
    // don't render anything while we are waiting for a ref to the chart
    // note can't return null here as the ResponsiveContainer expects a child
    if (!chartRef) return <div></div>;

    // render empty view if there is no data
    if (!data?.length) {
      // NOTE: can't reuse ChartContentWrapper here because it applies it's own margins.
      // a separate ChartEmptyContent should be created that would serve as a re-usable component for displaying this empty chart content
      return (
        <div
          className="w-full flex flex-wrap content-center border-2 border-gray-50 justify-center"
          style={{ height }}
        >
          <p className="text-lg text-gray-500">No transactions were made</p>
        </div>
      );
    }

    return (
      <ComposedChart data={data}>
        <XAxis dataKey={dateDataKey} hide={true}></XAxis>
        <YAxis dataKey="numTransactions" yAxisId="left" hide={true} />
        <YAxis
          dataKey={transactionsDataKey}
          yAxisId="right"
          orientation="right"
          hide={true}
        />
        <YAxis
          dataKey={co2EmissionDataKey}
          yAxisId="right2"
          orientation="right"
          hide={true}
        />
        <CartesianGrid
          stroke={gridColor}
          horizontal={false}
          verticalPoints={getVerticalPoints()}
        />
        <Area
          type="monotone"
          dataKey={co2EmissionDataKey}
          stroke={areaColor}
          fill={areaColor}
          yAxisId="right2"
        />
        <Bar
          yAxisId="right"
          dataKey={transactionsDataKey}
          barSize={20}
          fill={barColor}
        />
        <Tooltip content={<CustomTooltip />} />
      </ComposedChart>
    );
  }

  return (
    <ResponsiveContainer
      className="justify-self-center"
      width="100%"
      height={height}
      ref={setChartRef}
    >
      {renderChart()}
    </ResponsiveContainer>
  );
};
