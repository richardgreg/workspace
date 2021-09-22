import { CloudIcon, TrendingUpIcon } from '@heroicons/react/outline';
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import {
  Contract,
  Transaction,
} from '../../../../interfaces/emissions-dashboard';
import { EmissionSummaryStats } from '../../../../interfaces/index';
import { getDummyEmissionData } from '../dummyEmissionsData';
import * as transactions from '../../../../fixtures/transactions.json';

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

const Template: Story = (args) => (
  <ContractContainer
    transactionsCurrentPeriod={transactions as unknown as Transaction[]}
    transactionsPreviousPeriod={transactions as unknown as Transaction[]}
    startDate={undefined}
    endDate={undefined}
    contract={undefined}
    {...args}
  />
);
export const Primary = Template.bind({});
Primary.args = {
  statCardData,
  contract,
  data: getDummyEmissionData(),
};
