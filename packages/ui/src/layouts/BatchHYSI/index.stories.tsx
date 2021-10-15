import { BigNumber } from '@ethersproject/bignumber';
import {
  CashIcon,
  HandIcon,
  KeyIcon,
  SparklesIcon,
} from '@heroicons/react/outline';
import { numberToBigNumber } from '@popcorn/utils/src';
import { Meta, Story } from '@storybook/react/types-6-0';
import { DateTime } from 'luxon';
import React from 'react';
import { BatchProcessingInfo } from '../../components/popcorn/BatchHYSI/BatchProcessingInfo/index';
import { ChartContainer } from '../../components/popcorn/BatchHYSI/ChartContainer';
import { DepositRequestTable } from '../../components/popcorn/BatchHYSI/DepositRequestTable';
import { MintRedeemInterface } from '../../components/popcorn/BatchHYSI/MintRedeemInterface';
import { StatCardRow } from '../../components/popcorn/BatchHYSI/StatCardRow';
import { BatchType, DepositRequest } from '../../interfaces/popcorn/BatchHYSI';
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
      <div className="bg-gray-900">
        <div className="pt-12 pb-32 px-4 sm:px-6 lg:px-8 lg:pt-20">
          <div className="text-center">
            <p className="mt-2 text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
              Popcorn Yield Optimiser
            </p>
          </div>
        </div>
      </div>
      <div className="px-12 flex flex-col">
        <div className="w-2/3">
          <StatCardRow
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
          />
          <ChartContainer />
        </div>
        <div className="w-1/3">
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
            withdrawal={false}
            setwithdrawal={function (value: Boolean): void {
              throw new Error('Function not implemented.');
            }}
            depositAmount={numberToBigNumber(Math.pow(10, 18))}
            setDepositAmount={function (value: BigNumber): void {
              throw new Error('Function not implemented.');
            }}
            useUnclaimedDeposits={false}
            setUseUnclaimedDeposits={function (value: Boolean): void {
              throw new Error('Function not implemented.');
            }}
          />
          <BatchProcessingInfo
            timeTillBatchProcessing={[
              {
                timeTillProcessing: DateTime.now()
                  .plus({ hours: 12 })
                  .toJSDate(),
                progressPercentage: 38.42,
              },
            ]}
          />
        </div>
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
