import {
  CashIcon,
  HandIcon,
  KeyIcon,
  SparklesIcon,
} from '@heroicons/react/outline';
import { ChartContainer } from '../ChartContainer';
import { StatCardRow } from '../StatCardRow';

export const LeftColumn = () => {
  return (
    <div className="pl-12 pr-6 w-2/3 flex flex-col">
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
  );
};
