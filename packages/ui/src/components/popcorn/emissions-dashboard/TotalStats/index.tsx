import { useEffect, useState } from 'react';
import {
  getChartData,
  getStatCardData,
} from '../../../../../../emissions-dashboard/utils';
import { getMassUnitForTxns } from '../../../../../../emissions-dashboard/utils/getMassUnitForTxns';
import {
  ChartReadyState,
  Transaction,
} from '../../../../interfaces/emissions-dashboard';
import {
  BiaxialLineChart,
  ChartError,
  ChartLoading,
} from '../recharts/BiaxialLineChart';
import { StatsCards } from '../StatsCards';

interface TotalStatsProps {
  transactionsCurrentPeriod: Transaction[];
  transactionsPreviousPeriod: Transaction[];
  startDate: Date;
  endDate: Date;
  readyState: ChartReadyState;
}

export const TotalStats: React.FC<TotalStatsProps> = ({
  transactionsCurrentPeriod,
  transactionsPreviousPeriod,
  startDate,
  endDate,
  readyState,
}): JSX.Element => {
  const [unit, setUnit] = useState<string>('mcg');
  useEffect(() => {
    setUnit(getMassUnitForTxns(transactionsCurrentPeriod));
  }, [transactionsCurrentPeriod, transactionsPreviousPeriod]);
  return (
    <div>
      <div className="mt-2 mb-5">
        <dt>
          <h1 className="text-3xl font-medium leading-tight text-gray-900">
            Total Stats
          </h1>
        </dt>
        <dd className=" text-base text-gray-500">
          ({startDate.toUTCString()})
        </dd>
      </div>
      <div className="mb-5">
        <StatsCards
          stats={getStatCardData(
            transactionsCurrentPeriod,
            transactionsPreviousPeriod,
            true,
            unit,
          )}
          readyState={readyState}
        />
      </div>

      <div className="rounded-lg bg-white overflow-hidden shadow py-6">
        {readyState === 'loading' && <ChartLoading height={300} />}
        {readyState === 'done' && (
          <BiaxialLineChart
            data={getChartData(
              transactionsCurrentPeriod,
              startDate,
              endDate,
              unit,
            )}
            height={300}
          />
        )}
        {readyState === 'error' && <ChartError height={300} />}
      </div>
    </div>
  );
};
