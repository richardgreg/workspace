import { BigNumber } from '@ethersproject/bignumber';
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { DepositRequestTable } from '../../components/popcorn/BatchHYSI/DepositRequestTable';
import { Header } from '../../components/popcorn/BatchHYSI/Header';
import { LeftColumn } from '../../components/popcorn/BatchHYSI/LeftColumn';
import { RightColumn } from '../../components/popcorn/BatchHYSI/RightColumn';
import { DepositRequest } from '../../interfaces/popcorn/BatchHYSI';

const getDespositRequests = (numBatches: number): DepositRequest[] => {
  return new Array(numBatches).fill(undefined).map((x, i) => {
    return {
      batchNumber: i + 1,
      batchId: `00${i}`,
      depositAmount: 100,
      despositCurrency: 'USDC',
      HYSITokenToReceive: 100,
      submittedRequestDatetime: new Date(),
      claimable: true,
      amount: Math.pow(10, 18),
      index: i,
    } as DepositRequest;
  });
};

const BatchHYSI = () => {
  return (
    <div className="bg-gray-100">
      <Header title={'Popcorn Yield Optimizer'} />
      <div className="flex flex-row">
        <LeftColumn />
        <RightColumn />
      </div>
      <div className="w-full px-12">
        <DepositRequestTable
          depositRequests={getDespositRequests(10)}
          claim={async (batchId: string) => {}}
          withdraw={async (batchId: string, amount: BigNumber) => {}}
        />
      </div>
    </div>
  );
};

export default {
  title: 'App / Batch HYSI / Page / HYSI Deposit / Withdraw',
  component: BatchHYSI,
  decorators: [
    (Story) => (
      <div>
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story = (args) => <BatchHYSI {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  contractProps: {
    open: false,
    setOpen: () => {},
    addContract: () => {},
  },
  contractErrorProps: {
    errorMessage: 'Fatal error, run your life',
    setErrorMessage: () => {},
    openAddContractModal: () => {},
  },
};
