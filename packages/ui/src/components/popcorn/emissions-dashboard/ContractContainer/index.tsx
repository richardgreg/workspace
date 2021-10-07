import React, { useEffect, useState } from 'react';
import { getChartData } from '../../../../../../emissions-dashboard/utils';
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
  contract?: Contract;
  readyState: ChartReadyState;
  barColor?: string;
  areaColor?: string;
  isTotal?: boolean;
  height?: number;
}

export const ContractContainer: React.FC<ContractContainerProps> = ({
  transactionsCurrentPeriod,
  transactionsPreviousPeriod,
  startDate,
  endDate,
  contract,
  readyState,
  barColor = '#4084f2',
  areaColor = '#dbeafd',
  isTotal = false,
  height = 224,
}): JSX.Element => {
  const [unit, setUnit] = useState<string>('mcg');
  useEffect(() => {
    setUnit(getMassUnitForTxns(transactionsCurrentPeriod));
  }, [transactionsCurrentPeriod, transactionsPreviousPeriod]);
  return (
    <div className="mb-5 mt-12">
      {isTotal && (
        <>
          <dt>
            <h1 className="text-3xl font-medium leading-tight text-gray-900">
              Total Stats
            </h1>
          </dt>
          <dd className=" text-base text-gray-500">
            ({startDate.toUTCString()})
          </dd>
        </>
      )}
      <h1 className="text-3xl font-medium leading-tight text-gray-900">
        {contract?.name}
      </h1>

      <div className="mb-5">
        <StatsCards
          transactionsCurrentPeriod={transactionsCurrentPeriod}
          transactionsPreviousPeriod={transactionsPreviousPeriod}
          isTotal={isTotal}
          unit={unit}
          startDate={startDate}
          endDate={endDate}
          readyState={readyState}
          iconCol={barColor}
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
                height={height}
                barColor={barColor}
                areaColor={areaColor}
              />
            )}
            {readyState === 'error' && <ChartError height={224} />}
          </div>
        </div>
      </div>
    </div>
  );
};
