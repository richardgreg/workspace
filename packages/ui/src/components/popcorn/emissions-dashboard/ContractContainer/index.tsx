import React, { useEffect, useState } from 'react';
import {
  getChartData,
  getStatCardData,
} from '../../../../../../emissions-dashboard/utils';
import { getMassUnitForTxns } from '../../../../../../emissions-dashboard/utils/getMassUnitForTxns';
import {
  ChartReadyState,
  Contract,
  Transaction,
} from '../../../../interfaces/emissions-dashboard';
import {
  ChartError,
  ChartLoading,
  ComposedBarChart,
} from '../recharts/ComposedAreaBarChart';
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
  const [unit, setUnit] = useState<string>('mcg');
  useEffect(() => {
    setUnit(getMassUnitForTxns(transactionsCurrentPeriod));
  }, [transactionsCurrentPeriod, transactionsPreviousPeriod]);
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
            unit,
          )}
          readyState={readyState}
        />
      </div>
      <div className="max-w-7xl">
        <div className="grid grid-cols-1 gap-4 lg:col-span-2">
          <div className="rounded-lg bg-white overflow-hidden shadow py-6">
            {readyState === 'loading' && <ChartLoading height={224} />}
            {readyState === 'done' && (
              <ComposedBarChart
                data={getChartData(
                  transactionsCurrentPeriod,
                  startDate,
                  endDate,
                  unit,
                )}
                height={224}
              />
            )}
            {readyState === 'error' && <ChartError height={224} />}
          </div>
        </div>
      </div>
    </div>
  );
};
