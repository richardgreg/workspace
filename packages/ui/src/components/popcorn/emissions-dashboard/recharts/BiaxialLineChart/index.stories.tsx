import { Meta, Story } from '@storybook/react/types-6-0';
import { getDummyEmissionData } from '../../dummyEmissionsData';
import {
  BiaxialLineChart,
  BiaxialLineChartProps,
  ChartError,
  ChartLoading,
} from './index';

export default {
  title: 'Emissions Dashboard / Components / Charts / BiaxialLineChart',
  component: BiaxialLineChart,
  decorators: [
    (Story) => (
      <div className="flex flex-row justify-center">
        <Story></Story>
      </div>
    ),
  ],
} as Meta;

const ChartTemplate: Story<BiaxialLineChartProps> = (args) => (
  <BiaxialLineChart {...args} />
);
const LoadingTemplate: Story<Partial<BiaxialLineChartProps>> = (args) => (
  <ChartLoading {...args} />
);
const ErrorTemplate: Story<Partial<BiaxialLineChartProps>> = (args) => (
  <ChartError {...args} />
);

export const WithData = ChartTemplate.bind({});
WithData.args = {
  data: getDummyEmissionData(),
  height: 200,
  transactionsDataKey: 'numTransactions',
  dateDataKey: 'date',
  co2EmissionDataKey: 'co2Emissions',
};

export const Empty = ChartTemplate.bind({});
Empty.args = {
  data: [],
  height: 200,
  transactionsDataKey: 'numTransactions',
  dateDataKey: 'date',
  co2EmissionDataKey: 'co2Emissions',
};

export const Loading = LoadingTemplate.bind({});
Loading.args = {
  height: 200,
};

export const Error = ErrorTemplate.bind({});
Error.args = {
  height: 200,
};
