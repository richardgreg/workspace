import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { TimeRangeButtonGroup } from './index';

export default {
  title: 'App / Batch HYSI / Components / Time Range Button Group',
  component: TimeRangeButtonGroup,
  decorators: [
    (Story) => (
      <div className="flex flex-row justify-center">
        <Story></Story>
      </div>
    ),
  ],
} as Meta;

const Template: Story = (args) => <TimeRangeButtonGroup {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
