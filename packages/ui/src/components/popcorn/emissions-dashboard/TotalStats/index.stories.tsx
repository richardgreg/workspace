import { CloudIcon } from '@heroicons/react/outline';
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { Globe, Wind } from 'react-feather';
import {
  getDummyTxnsCurrentPeriod,
  getDummyTxnsPreviousPeriod,
} from '../dummyTxns';
import { TotalStats } from './index';
const statCardData = [
  {
    id: 1,
    name: 'CO2 Emissions (µg)',
    stat: 71897,
    icon: CloudIcon,
    change: '122',
    changeType: 'increase',
  },
  {
    id: 2,
    name: 'Transactions',
    stat: 12,
    icon: Globe,
    change: '5.4%',
    changeType: 'increase',
  },
  {
    id: 3,
    name: 'Average Gas Price',
    stat: 34,
    icon: Wind,
    change: '3.2%',
    changeType: 'decrease',
  },
];

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
