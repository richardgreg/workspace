import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import {
  getDummyTxnsCurrentPeriod,
  getDummyTxnsPreviousPeriod,
} from '../dummyTxns';
import { TotalStats } from './index';

export default {
  title: 'Emissions Dashboard / Components / TotalStats',
  component: TotalStats,
  decorators: [
    (Story) => (
      <div className="flex flex-row justify-center ">
        <Story></Story>
      </div>
    ),
  ],
} as Meta;

const Template: Story = (args) => <TotalStats {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  readyState: 'done',
  transactionsCurrentPeriod: getDummyTxnsCurrentPeriod(),
  transactionsPreviousPeriod: getDummyTxnsPreviousPeriod(),
  startDate: new Date('2021/08/01'),
  endDate: new Date('2021/08/02'),
  contract: { name: 'POP', address: '0x' },
};
export const Loading = Template.bind({});
Loading.args = {
  readyState: 'loading',
  transactionsCurrentPeriod: getDummyTxnsCurrentPeriod(),
  transactionsPreviousPeriod: getDummyTxnsPreviousPeriod(),
  startDate: new Date('2021/08/01'),
  endDate: new Date('2021/08/02'),
  contract: { name: 'POP', address: '0x' },
};
