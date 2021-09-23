import {
  getChartData,
  getStatCardData,
} from '../../../../../../emissions-dashboard/utils';
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
  return (
    <div className="py-10 self-center">
      <div className="max-w-7xl">
        <div className="mt-2 mb-5">
          <dt>
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              Total Stats
            </h1>
          </dt>
          <dd className=" text-base text-gray-500">
            ({startDate.toUTCString()})
          </dd>
        </div>
      </div>
      <div className="max-w-7xl mb-5">
        <StatsCards
          stats={getStatCardData(
            transactionsCurrentPeriod,
            transactionsPreviousPeriod,
            true,
          )}
        />
      </div>
      <div className="max-w-7xl">
        <div className="grid grid-cols-1 gap-4 lg:col-span-2">
          <div className="rounded-lg bg-white overflow-hidden shadow py-6">
            {readyState === 'loading' && <ChartLoading height={300} />}
            {readyState === 'done' && (
              <BiaxialLineChart
                data={getChartData(
                  transactionsCurrentPeriod,
                  startDate,
                  endDate,
                )}
                height={300}
              />
            )}
            {readyState === 'error' && <ChartError height={300} />}
          </div>
        </div>
      </div>
    </div>
  );
};
