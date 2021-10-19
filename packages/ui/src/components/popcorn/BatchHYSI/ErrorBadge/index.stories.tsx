import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { ErrorBadge } from './index';

export default {
  title: 'App / Batch HYSI / Components / Error Badge',
  component: ErrorBadge,
  decorators: [
    (Story) => (
      <div className="flex flex-row justify-center">
        <Story></Story>
      </div>
    ),
  ],
} as Meta;

const Template: Story = (args) => <ErrorBadge {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
