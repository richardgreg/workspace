import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { getDummyData } from '../../../../utils/batchHYSI';
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

const Template: Story = (args) => (
  <HYSIAreaChart xAxisDataKey={''} yAxisDataKey={''} data={[]} {...args} />
);

export const Month = Template.bind({});
export const Week = Template.bind({});
export const Fortnight = Template.bind({});
export const Year = Template.bind({});
export const HalfYear = Template.bind({});

Month.args = {
  data: getDummyData('30D'),
  yAxisDataKey: 'yield',
  xAxisDataKey: 'date',
};
Week.args = {
  data: getDummyData('7D'),
  yAxisDataKey: 'yield',
  xAxisDataKey: 'date',
};
Fortnight.args = {
  data: getDummyData('14D'),
  yAxisDataKey: 'yield',
  xAxisDataKey: 'date',
};
Year.args = {
  data: getDummyData('1YR'),
  yAxisDataKey: 'yield',
  xAxisDataKey: 'date',
};
HalfYear.args = {
  data: getDummyData('180D'),
  yAxisDataKey: 'yield',
  xAxisDataKey: 'date',
};
