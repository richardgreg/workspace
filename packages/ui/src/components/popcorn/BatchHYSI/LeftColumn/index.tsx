import {
  CashIcon,
  HandIcon,
  KeyIcon,
  SparklesIcon,
} from '@heroicons/react/outline';
import React from 'react';
import { ChartData } from '../AreaChart';
import { ChartContainer } from '../ChartContainer';
import { StatCardAndTooltip, StatCardData } from '../StatCardAndTooltip';
import { StatCardRow } from '../StatCardRow';

interface StatCardRowProps {
  totalBalance: StatCardData;
  HYSI: StatCardData;
  ClaimableHYSI: StatCardData;
  PendingWithdraw: StatCardData;
  chartData: ChartData[];
}

export const LeftColumn: React.FC<StatCardRowProps> = ({
  totalBalance,
  HYSI,
  ClaimableHYSI,
  PendingWithdraw,
  chartData,
}) => {
  return (
    <div className="px-6 lg:pl-12  w-full col-span-2  flex flex-col">
      <StatCardRow>
        <StatCardAndTooltip
          data={{
            change: '10%',
            changeType: 'increase',
            icon: CashIcon,
            id: 1,
            name: 'Total Balance',
            statCur: 71897,
            statPrev: 35000,
          }}
          iconCol={'#4185f2'}
          showChange={false}
          tooltipTitle={'Total Balance'}
          tooltipContent={
            'Total acquisition of deposits, HYSI and pending withdrawls'
          }
        />
        <StatCardAndTooltip
          data={{
            change: '10%',
            changeType: 'increase',
            icon: SparklesIcon,
            id: 2,
            name: 'HYSI',
            statCur: 1897,
            statPrev: 35000,
          }}
          iconCol={'#646aec'}
          showChange={true}
          tooltipTitle={'HYSI'}
          tooltipContent={'HYSI desc'}
        />
        <StatCardAndTooltip
          data={{
            change: '10%',
            changeType: 'increase',
            icon: KeyIcon,
            id: 3,
            name: 'Claimable HYSI',
            statCur: 58897,
            statPrev: 35000,
          }}
          iconCol={'#f6732b'}
          showChange={false}
          tooltipTitle={'Claimable HYSI'}
          tooltipContent={'Claimable HYSI desc'}
        />
        <StatCardAndTooltip
          data={{
            change: '10%',
            changeType: 'increase',
            icon: HandIcon,
            id: 4,
            name: 'Pending Withdraw',
            statCur: 250,
            statPrev: 35000,
          }}
          iconCol={'#f39c2b'}
          showChange={false}
          tooltipTitle={'Pending Withdrawls'}
          tooltipContent={'Pending withdrawl desc'}
        />
      </StatCardRow>
      <ChartContainer chartData={chartData} />
    </div>
  );
};
