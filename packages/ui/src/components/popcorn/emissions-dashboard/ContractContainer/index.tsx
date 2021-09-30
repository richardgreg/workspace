import React from 'react';
import {
  getChartData,
  getStatCardData,
} from '../../../../../../emissions-dashboard/utils';
import {
  ChartReadyState,
  Contract,
  Transaction,
} from '../../../../interfaces/emissions-dashboard';
import {
  BiaxialLineChart,
  ChartError,
  ChartLoading,
} from '../recharts/BiaxialLineChart';
import { StatsCards } from '../StatsCards';

interface ContractContainerProps {
  transactionsCurrentPeriod: Transaction[];
  transactionsPreviousPeriod: Transaction[];
  startDate: Date;
  endDate: Date;
  contract: Contract;
  readyState: ChartReadyState;
}

export const ContractContainer: React.FC<ContractContainerProps> = ({
  transactionsCurrentPeriod,
  transactionsPreviousPeriod,
  startDate,
  endDate,
  contract,
  readyState,
}): JSX.Element => {
  return (
    <div className="mb-5 mt-12">
      <h1 className="text-3xl font-medium leading-tight text-gray-900">
        {contract.name}
      </h1>

      <div className="mb-5">
        <StatsCards
          stats={getStatCardData(
            transactionsCurrentPeriod,
            transactionsPreviousPeriod,
            false,
          )}
        />
      </div>

      <div className="rounded-lg bg-white overflow-hidden shadow py-6">
        {readyState === 'loading' && <ChartLoading height={300} />}
        {readyState === 'done' && (
          <BiaxialLineChart
            data={getChartData(transactionsCurrentPeriod, startDate, endDate)}
            height={224}
          />
        )}
        {readyState === 'error' && <ChartError height={300} />}
      </div>
    </div>
  );
};
