import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { BatchProcessingInfo } from './index';

export default {
  title: 'App / Batch HYSI / Components / Batch Processing Info',
  component: BatchProcessingInfo,
  decorators: [
    (Story) => (
      <div className="flex flex-row justify-center">
        <Story></Story>
      </div>
    ),
  ],
} as Meta;

const Template: Story = (args) => (
  <BatchProcessingInfo timeTillBatchProcessing={[]} {...args} />
);

export const InProgress = Template.bind({});
InProgress.args = {
  timeTillBatchProcessing: [
    {
      timeTillProcessing: new Date(),
      progressPercentage: 38.42,
    },
  ],
};
export const Complete = Template.bind({});
Complete.args = {
  timeTillBatchProcessing: [
    {
      timeTillProcessing: new Date('2021-01-01'),
      progressPercentage: 100,
    },
  ],
};
