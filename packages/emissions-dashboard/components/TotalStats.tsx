import { StatCardData, TransactionGroup } from 'interfaces';
import React from 'react';
import { AreaBarChart } from './AreaBarChart';
import { StatsCards } from './StatsCard';

interface TotalStatsProps {
  statCardData: StatCardData[];
  data: TransactionGroup[];
  startDate: Date;
}

export const TotalStats: React.FC<TotalStatsProps> = ({
  statCardData,
  data,
  startDate,
}): JSX.Element => {
  return (
    <div className="py-10 mx-8">
      <div className="max-w-7xl">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">
          Total Stats
        </h1>
      </div>
      <div className="max-w-7xl mb-5">
        <StatsCards stats={statCardData} />
      </div>
      <div className="max-w-7xl">
        <div className="grid grid-cols-1 gap-4 lg:col-span-2">
          <div className="rounded-lg bg-white overflow-hidden shadow py-6">
            <AreaBarChart data={data} height={224} />
          </div>
        </div>
      </div>
    </div>
  );
};
