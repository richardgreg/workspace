import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { SuccessBadge } from './index';

export default {
  title: 'App / Batch HYSI / Components / Success Badge',
  component: SuccessBadge,
  decorators: [
    (Story) => (
      <div className="flex flex-row justify-center">
        <Story></Story>
      </div>
    ),
  ],
} as Meta;

const Template: Story = (args) => <SuccessBadge {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
