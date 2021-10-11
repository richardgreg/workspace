import { Meta, Story } from '@storybook/react/types-6-0';
import { DateTime } from 'luxon';
import React from 'react';
import { getDummyTxns } from '../dummyTxns';
import { StatsCards } from './index';

export default {
  title: 'Emissions Dashboard / Components / StatsCards',
  component: StatsCards,
  decorators: [
    (Story) => (
      <div className="flex flex-row justify-center">
        <Story></Story>
      </div>
    ),
  ],
} as Meta;

const Template: Story = (args) => <StatsCards stats={[]} {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  iconCol: '#4084f2',
  readyState: 'done',
  transactionsCurrentPeriod: getDummyTxns(
    new Date(DateTime.now().minus({ months: 1 }).toISO()),
  ),
  transactionsPreviousPeriod: getDummyTxns(
    new Date(DateTime.now().minus({ months: 2 }).toISO()),
  ),
  isTotal: true,
  unit: 'mcg',
  previousPeriodStartDate: new Date(
    DateTime.now().minus({ months: 2 }).toISO(),
  ),
  startDate: new Date(DateTime.now().minus({ months: 1 }).toISO()),
  endDate: new Date(),
  contractName: 'POP',
};
