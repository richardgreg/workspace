import { Meta, Story } from '@storybook/react/types-6-0';
import { getDummyEmissionData } from '../../dummyEmissionsData';
import { BiaxialLineChart } from './index';
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

const Template: Story = (args) => <BiaxialLineChart {...args} />;

export const ChartWithData = Template.bind({});
ChartWithData.args = {
  data: getDummyEmissionData(),
  height: 200,
  transactionsDataKey: 'numTransactions',
  dateDataKey: 'date',
  co2EmissionDataKey: 'co2Emissions',
};
