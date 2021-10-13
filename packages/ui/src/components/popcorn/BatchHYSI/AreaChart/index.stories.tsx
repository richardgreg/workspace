import { Meta, Story } from '@storybook/react/types-6-0';
import { getDummyEmissionData } from '../../dummyEmissionsData';
import mockEmissionsData from '../../mockEmmisionsData';
import {
  ChartError,
  ChartLoading,
  ComposedBarChart,
  ComposedBarChartProps,
} from './index';

export default {
  title: 'Emissions Dashboard / Components / Charts / ComposedBarChart',
  component: ComposedBarChart,
  decorators: [
    (Story) => (
      <div className="flex flex-row justify-center">
        <Story></Story>
      </div>
    ),
  ],
} as Meta;

type ComposedBarChartControls = {
  dataSet: string;
} & Partial<ComposedBarChartProps>;

const ChartTemplate: Story<ComposedBarChartControls> = (args) => {
  const data = args.data
    ? args.data
    : args.dataSet === 'dummy'
    ? getDummyEmissionData()
    : mockEmissionsData[args.dataSet];

  return <ComposedBarChart {...args} data={data} />;
};

const LoadingTemplate: Story<ComposedBarChartProps> = (args) => (
  <ChartLoading {...args} />
);
const ErrorTemplate: Story<ComposedBarChartProps> = (args) => (
  <ChartError {...args} />
);

export const Complete = ChartTemplate.bind({});
Complete.args = {
  dataSet: 'ex1',
  height: 200,
  topPadding: 10,
};

Complete.argTypes = {
  dataSet: {
    options: ['ex1', 'ex2', 'ex3', 'ex4', 'ex5', 'dummy', 'empty'],
    control: { type: 'select' },
  },
};

export const Empty = ChartTemplate.bind({});
Empty.args = {
  data: [],
  height: 200,
};

export const Loading = LoadingTemplate.bind({});
Loading.args = {
  data: [],
  height: 200,
};

export const Error = ErrorTemplate.bind({});
Error.args = {
  height: 200,
};
