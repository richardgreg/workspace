import React from 'react';
import { getStatCardData } from '../../../../../../emissions-dashboard/utils';
import {
  ChartReadyState,
  StatCardData,
  Transaction,
} from '../../../../interfaces/emissions-dashboard';
import Spinner from '../Spinner';
import { StatCard } from '../StatCard';
import StatCardTooltip from '../StatCardTooltip';

interface StatsCardProps {
  iconCol?: string;
  readyState: ChartReadyState;
  transactionsCurrentPeriod: Transaction[];
  transactionsPreviousPeriod: Transaction[];
  isTotal: boolean;
  unit: string;
  previousPeriodStartDate: Date;
  startDate: Date;
  endDate: Date;
  contractName: string;
}

const loadingCard = (item: StatCardData) => {
  return (
    <div
      key={item.name}
      className="relative h-24 w-64 bg-white px-4 sm:py-7 sm:px-6 shadow rounded-lg overflow-hidden"
    >
      <Spinner />
    </div>
  );
};

const errorCard = () => {
  return (
    <div className="relative h-24 w-64 flex items-stretch justify-center bg-white px-4  shadow rounded-lg overflow-hidden">
      <p className="text-sm self-center text-gray-500 ">
        Error loading transactions
      </p>
    </div>
  );
};

export const StatsCards: React.FC<StatsCardProps> = ({
  iconCol,
  readyState,
  transactionsCurrentPeriod,
  transactionsPreviousPeriod,
  isTotal,
  unit,
  previousPeriodStartDate,
  startDate,
  endDate,
  contractName,
}): JSX.Element => {
  const stats = getStatCardData(
    transactionsCurrentPeriod,
    transactionsPreviousPeriod,
    isTotal,
    unit,
    startDate,
    endDate,
  );
  return (
    <div className="grid justify-items-stretch">
      <dl className="justify-self-start mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {readyState === 'loading' && stats.map((item) => loadingCard(item))}
        {readyState === 'done' &&
          stats.map((item, index) => (
            <div>
              <div
                data-tip
                data-for={contractName + item.name}
                key={item.name}
                className="relative h-24 w-84 bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
              >
                <StatCard iconCol={iconCol} data={item} />
              </div>
              <StatCardTooltip
                contractName={contractName}
                item={item}
                previousPeriodStartDate={previousPeriodStartDate}
                startDate={startDate}
              />
            </div>
          ))}
        {readyState === 'error' && errorCard()}
      </dl>
    </div>
  );
};
