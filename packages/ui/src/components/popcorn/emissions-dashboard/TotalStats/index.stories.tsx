import {
  CloudIcon,
  CursorClickIcon,
  TrendingUpIcon,
} from '@heroicons/react/outline';
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { EmissionSummaryStats } from '../../../../interfaces/index';
import { getDummyEmissionData } from '../dummyEmissionsData';
import { TotalStats } from './index';
const statCardData: EmissionSummaryStats[] = [
  {
    id: 1,
    name: 'co2Emissions',
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
  {
    id: 3,
    name: 'Average Gas Price',
    stat: '45',
    icon: CursorClickIcon,
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
  statCardData,
  startDate: new Date(),
  data: getDummyEmissionData(),
};
