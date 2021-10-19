import { BigNumber } from '@ethersproject/bignumber';
import {
  CashIcon,
  HandIcon,
  KeyIcon,
  SparklesIcon,
} from '@heroicons/react/outline';
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { getDummyData } from '../../components/popcorn/HYSIDepositWithdrawal/AreaChart/index.stories';
import { DepositRequestTable } from '../../components/popcorn/HYSIDepositWithdrawal/DepositRequestTable';
import { Header } from '../../components/popcorn/HYSIDepositWithdrawal/Header';
import { LeftColumn } from '../../components/popcorn/HYSIDepositWithdrawal/LeftColumn';
import { RightColumn } from '../../components/popcorn/HYSIDepositWithdrawal/RightColumn';
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

const HYSIDepositWithdrawal = () => {
  return (
    <div className="bg-gray-100">
      <Header title={'Popcorn Yield Optimizer'} />
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <LeftColumn
          totalBalance={{
            change: '10%',
            changeType: 'increase',
            icon: CashIcon,
            id: 1,
            name: 'Total Balance',
            statCur: 71897,
            statPrev: 35000,
          }}
          HYSI={{
            change: '10%',
            changeType: 'increase',
            icon: SparklesIcon,
            id: 2,
            name: 'HYSI',
            statCur: 1897,
            statPrev: 35000,
          }}
          ClaimableHYSI={{
            change: '10%',
            changeType: 'increase',
            icon: KeyIcon,
            id: 3,
            name: 'Claimable HYSI',
            statCur: 58897,
            statPrev: 35000,
          }}
          PendingWithdraw={{
            change: '10%',
            changeType: 'increase',
            icon: HandIcon,
            id: 4,
            name: 'Pending Withdraw',
            statCur: 250,
            statPrev: 35000,
          }}
          chartData={getDummyData('30D')}
        />
        <RightColumn />
      </div>

      <DepositRequestTable
        depositRequests={getDespositRequests(10)}
        claim={async (batchId: string) => {}}
        withdraw={async (batchId: string, amount: BigNumber) => {}}
      />
    </div>
  );
};

export default {
  title: 'App / Batch HYSI / Page / HYSI Deposit Withdraw',
  component: HYSIDepositWithdrawal,
  decorators: [
    (Story) => (
      <div>
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story = (args) => <HYSIDepositWithdrawal {...args} />;

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
