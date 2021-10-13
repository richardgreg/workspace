import {
  CashIcon,
  HandIcon,
  KeyIcon,
  SparklesIcon,
} from '@heroicons/react/outline';
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { StatCardRow } from './index';

export default {
  title: 'App / Batch HYSI / Components / Stat Card Row',
  component: StatCardRow,
  decorators: [
    (Story) => (
      <div className="flex flex-row justify-center">
        <Story></Story>
      </div>
    ),
  ],
} as Meta;

const Template: Story = (args) => (
  <StatCardRow
    totalBalance={undefined}
    HYSI={undefined}
    ClaimableHYSI={undefined}
    PendingWithdraw={undefined}
    {...args}
  />
);

export const Primary = Template.bind({});

Primary.args = {
  totalBalance: {
    change: '10%',
    changeType: 'increase',
    icon: CashIcon,
    id: 1,
    name: 'Total Balance',
    statCur: 78000,
    statPrev: 35000,
  },
  HYSI: {
    change: '10%',
    changeType: 'increase',
    icon: SparklesIcon,
    id: 2,
    name: 'HYSI',
    statCur: 78000,
    statPrev: 35000,
  },
  ClaimableHYSI: {
    change: '10%',
    changeType: 'increase',
    icon: KeyIcon,
    id: 3,
    name: 'Claimable HYSI',
    statCur: 78000,
    statPrev: 35000,
  },
  PendingWithdraw: {
    change: '10%',
    changeType: 'increase',
    icon: HandIcon,
    id: 4,
    name: 'Pending Withdraw',
    statCur: 78000,
    statPrev: 35000,
  },
};
