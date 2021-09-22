import { CloudIcon } from '@heroicons/react/outline';
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { Globe, Wind } from 'react-feather';
import { EmissionSummaryStats } from '../../../../interfaces/index';
import { StatsCards } from './index';

const dummyItem: EmissionSummaryStats = {
  id: 1,
  name: 'co2Emissions',
  stat: '71kg',
  icon: CloudIcon,
  change: '12.38%',
  changeType: 'increase',
};

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
  stats: [
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
  ],
};
