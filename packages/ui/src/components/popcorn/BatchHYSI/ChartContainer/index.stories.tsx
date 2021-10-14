import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { ChartContainer } from './index';

export default {
  title: 'App / Batch HYSI / Components / Chart Container',
  component: ChartContainer,
  decorators: [
    (Story) => (
      <div className="flex flex-row justify-center">
        <Story></Story>
      </div>
    ),
  ],
} as Meta;

const Template: Story = (args) => <ChartContainer {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
