import { CloudIcon } from '@heroicons/react/solid';
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import StatCardTooltip from './index';

export default {
  title: 'Emissions Dashboard / Components / Stat Card Tooltip',
  component: StatCardTooltip,
} as Meta;

const Template: Story = (args) => {
  return (
    <div className="flex justify-center">
      <h1
        className="justify-self-auto"
        data-tip
        data-for={'POP' + 'CO2 Emissions (µg)'}
      >
        Hover here
      </h1>
      <StatCardTooltip {...args} />
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  contractName: 'POP',
  item: {
    id: 1,
    name: 'CO2 Emissions (µg)',
    statCur: 71897,
    statPrev: 71897,
    icon: CloudIcon,
    change: '122',
    changeType: 'increase',
  },
  previousPeriodStartDate: new Date(),
  startDate: new Date(),
  endDate: new Date(),
};
