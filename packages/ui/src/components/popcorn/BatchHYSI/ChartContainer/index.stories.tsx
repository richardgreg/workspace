import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { getDummyData } from '../../../../utils/batchHYSI';
import { ChartContainer } from './index';

export default {
  title: 'App / Batch HYSI / Components / Chart Container',
  component: ChartContainer,
  decorators: [
    (Story) => (
      <div>
        <Story></Story>
      </div>
    ),
  ],
} as Meta;

const Template: Story = (args) => <ChartContainer chartData={[]} {...args} />;

export const Primary = Template.bind({});

Primary.args = { chartData: getDummyData('30D') };
