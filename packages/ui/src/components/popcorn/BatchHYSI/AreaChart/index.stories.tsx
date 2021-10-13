import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { HYSIAreaChart } from './index';

export default {
  title: 'App / Batch HYSI / Components / HYSI Area Chart',
  component: HYSIAreaChart,
  decorators: [
    (Story) => (
      <div className="flex flex-row justify-center">
        <Story></Story>
      </div>
    ),
  ],
} as Meta;

const Template: Story = (args) => <HYSIAreaChart {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
