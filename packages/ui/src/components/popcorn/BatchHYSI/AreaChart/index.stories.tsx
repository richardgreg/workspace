import { Meta, Story } from '@storybook/react/types-6-0';
import { DateTime } from 'luxon';
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

const Template: Story = (args) => (
  <HYSIAreaChart xAxisDataKey={''} yAxisDataKey={''} data={[]} {...args} />
);

const getDateXAxisValues = (range: string): string[] => {
  const now = DateTime.now();
  switch (range) {
    case '1YR':
      return new Array(13).fill(undefined).map((x, i) => {
        const date = now.plus({ months: i });
        return date.monthShort + ' ' + (date.year % 100);
      });
    case '180D':
      return new Array(7).fill(undefined).map((x, i) => {
        const date = now.plus({ months: i });
        return date.day + ' ' + date.monthShort;
      });
    case '30D':
      return new Array(11).fill(undefined).map((x, i) => {
        const date = now.plus({ days: i * 3 });
        return date.day + ' ' + date.monthShort;
      });
    case '14D':
      return new Array(8).fill(undefined).map((x, i) => {
        const date = now.plus({ days: (i * 14) / 8 });
        return date.day + ' ' + date.monthShort;
      });
    case '7D':
      return new Array(7).fill(undefined).map((x, i) => {
        const date = now.plus({ days: i * 7 });
        return date.day + ' ' + date.monthShort;
      });
    case '24hr':
      return new Array(9).fill(undefined).map((x, i) => {
        const date = now.plus({ hours: i * 3 });
        return date.hour + ':00 ' + date.day + ' ' + date.monthShort;
      });
    default:
      break;
  }
};

const getDummyData = (range: string) => {
  const xAxis = getDateXAxisValues(range);
  return xAxis.map((date, i) => {
    return {
      date: date,
      yield: i * 200 + Math.random() * 200,
    };
  });
};

export const Month = Template.bind({});
export const Week = Template.bind({});
export const Fortnight = Template.bind({});
export const Year = Template.bind({});
export const HalfYear = Template.bind({});
export const Day = Template.bind({});

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
Day.args = {
  data: getDummyData('24hr'),
  yAxisDataKey: 'yield',
  xAxisDataKey: 'date',
};
