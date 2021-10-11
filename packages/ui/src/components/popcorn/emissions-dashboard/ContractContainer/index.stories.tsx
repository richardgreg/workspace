import { CloudIcon, TrendingUpIcon } from '@heroicons/react/outline';
import { Meta, Story } from '@storybook/react/types-6-0';
import { DateTime } from 'luxon';
import React from 'react';
import { Contract } from '../../../../interfaces/emissions-dashboard';
import { EmissionSummaryStats } from '../../../../interfaces/index';
import { getDummyTxns } from '../dummyTxns';
import { ContractContainer } from './index';

const statCardData: EmissionSummaryStats[] = [
  {
    id: 1,
    name: 'CO2 Emissions (µg)',
    stat: '71',
    icon: CloudIcon,
    change: '12.38%',
    changeType: 'increase',
  },
  {
    id: 2,
    name: 'Transactions',
    stat: '23',
    icon: TrendingUpIcon,
    change: '5.4%',
    changeType: 'increase',
  },
];

const contract: Contract = {
  name: 'Popcorn HYSI Staking Pool',
  address: '0xd0cd466b34a24fcb2f87676278af2005ca8a78c4',
};

export default {
  title: 'Emissions Dashboard / Components / ContractContainer',
  component: ContractContainer,
  decorators: [
    (Story) => (
      <div className="flex flex-row justify-center ">
        <Story></Story>
      </div>
    ),
  ],
} as Meta;

const Template: Story = (args) => <ContractContainer {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  readyState: 'done',
  transactionsCurrentPeriod: getDummyTxns(
    new Date(DateTime.now().minus({ months: 1 }).toISO()),
  ),
  transactionsPreviousPeriod: getDummyTxns(
    new Date(DateTime.now().minus({ months: 2 }).toISO()),
  ),
  startDate: new Date(DateTime.now().minus({ months: 1 }).toISO()),
  previousPeriodStartDate: new Date(
    DateTime.now().minus({ months: 2 }).toISO(),
  ),
  endDate: new Date(),
  contract: { name: 'POP', address: '0x' },
};
export const Loading = Template.bind({});
Loading.args = {
  readyState: 'loading',
  transactionsCurrentPeriod: getDummyTxns(
    new Date(DateTime.now().minus({ months: 1 }).toISO()),
  ),
  transactionsPreviousPeriod: getDummyTxns(
    new Date(DateTime.now().minus({ months: 2 }).toISO()),
  ),
  startDate: new Date(DateTime.now().minus({ months: 1 }).toISO()),
  previousPeriodStartDate: new Date(
    DateTime.now().minus({ months: 2 }).toISO(),
  ),
  endDate: new Date(),
  contract: { name: 'POP', address: '0x' },
};
