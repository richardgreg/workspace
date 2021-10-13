import { BigNumber } from '@ethersproject/bignumber';
import { BatchType } from '@popcorn/ui/src/interfaces/popcorn/BatchHYSI';
import { numberToBigNumber } from '@popcorn/utils/dist/formatBigNumber';
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { MintRedeemInterface } from './index';

export default {
  title: 'App / Batch HYSI / Components / Mint Redeem Interface',
  component: MintRedeemInterface,
  decorators: [
    (Story) => (
      <div className="flex flex-row justify-center">
        <Story></Story>
      </div>
    ),
  ],
} as Meta;

const Template: Story = (args) => (
  <MintRedeemInterface
    deposit={function (
      depositAmount: BigNumber,
      batchType: BatchType,
    ): Promise<void> {
      throw new Error('Function not implemented.');
    }}
    depositDisabled={false}
    threeCrvBalance={numberToBigNumber(Math.pow(10, 18))}
    threeCrvPrice={numberToBigNumber(Math.pow(10, 18))}
    hysiBalance={numberToBigNumber(Math.pow(10, 18))}
    hysiPrice={numberToBigNumber(Math.pow(10, 18))}
    withdrawal={undefined}
    setwithdrawal={function (value: Boolean): void {
      throw new Error('Function not implemented.');
    }}
    depositAmount={numberToBigNumber(Math.pow(10, 18))}
    setDepositAmount={function (value: BigNumber): void {
      throw new Error('Function not implemented.');
    }}
    useUnclaimedDeposits={undefined}
    setUseUnclaimedDeposits={function (value: Boolean): void {
      throw new Error('Function not implemented.');
    }}
    {...args}
  />
);

export const Primary = Template.bind({});

Primary.args = {
  deposit: function (
    depositAmount: BigNumber,
    batchType: BatchType,
  ): Promise<void> {
    throw new Error('Function not implemented.');
  },
  depositDisabled: false,
  threeCrvBalance: numberToBigNumber(Math.pow(10, 18)),
  threeCrvPrice: numberToBigNumber(Math.pow(10, 18)),
  hysiBalance: numberToBigNumber(Math.pow(10, 18)),
  hysiPrice: numberToBigNumber(Math.pow(10, 18)),
  withdrawal: false,
  setwithdrawal: function (value: Boolean): void {
    throw new Error('Function not implemented.');
  },
  depositAmount: numberToBigNumber(Math.pow(10, 18)),
  setDepositAmount: function (value: BigNumber): void {
    throw new Error('Function not implemented.');
  },
  useUnclaimedDeposits: false,
  setUseUnclaimedDeposits: function (value: Boolean): void {
    throw new Error('Function not implemented.');
  },
};
