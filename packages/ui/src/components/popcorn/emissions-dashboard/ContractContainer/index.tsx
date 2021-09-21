import { getChartData, getStatCardData } from '@popcorn/utils';
import React from 'react';
import {
  Contract,
  Transaction,
} from '../../../../interfaces/emissions-dashboard';
import { BiaxialLineChart } from '../recharts/BiaxialLineChart';
import { StatsCards } from '../StatsCards';

interface ContractContainerProps {
  transactionsCurrentPeriod: Transaction[];
  transactionsPreviousPeriod: Transaction[];
  startDate: Date;
  endDate: Date;
  contract: Contract;
}

export const ContractContainer: React.FC<ContractContainerProps> = ({
  transactionsCurrentPeriod,
  transactionsPreviousPeriod,
  startDate,
  endDate,
  contract,
}): JSX.Element => {
  return (
    <div className="mb-5 mt-12 self-center">
      <div className="max-w-7xl">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">
          {contract.name}
        </h1>
      </div>
      <div className="max-w-7xl mb-5">
        <StatsCards
          stats={getStatCardData(
            transactionsCurrentPeriod,
            transactionsPreviousPeriod,
            false,
          )}
        />
      </div>
      <div className="max-w-7xl">
        <div className="grid grid-cols-1 gap-4 lg:col-span-2">
          <div className="rounded-lg bg-white overflow-hidden shadow py-6">
            <BiaxialLineChart
              data={getChartData(transactionsCurrentPeriod, startDate, endDate)}
              height={224}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
