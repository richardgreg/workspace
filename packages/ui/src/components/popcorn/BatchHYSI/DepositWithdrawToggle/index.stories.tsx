import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { DepositWithdrawToggle } from './index';

export default {
  title: 'App / Batch HYSI / Components / Deposit Withdrawl Toggle',
  component: DepositWithdrawToggle,
  decorators: [
    (Story) => (
      <div className="flex flex-row justify-center">
        <Story></Story>
      </div>
    ),
  ],
} as Meta;

const Template: Story = (args) => (
  <DepositWithdrawToggle
    withdrawal={undefined}
    setwithdrawal={function (value: Boolean): void {
      throw new Error('Function not implemented.');
    }}
    {...args}
  />
);

export const Primary = Template.bind({});

Primary.args = {
  withdrawl: false,
  setwithdrawal: function (value: Boolean): void {
    throw new Error('Function not implemented.');
  },
};
