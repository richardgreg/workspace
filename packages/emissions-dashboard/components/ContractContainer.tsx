import { Contract, EmissionStats, StatCardData } from 'interfaces';
import React from 'react';
import { AreaBarChart } from './AreaBarChart';
import { StatsCards } from './StatsCard';

interface ContractContainerProps {
  statCardData: StatCardData[];
  contract: Contract;
  data: EmissionStats[];
  startDate: Date;
}

export const ContractContainer: React.FC<ContractContainerProps> = ({
  statCardData,
  contract,
  data,
  startDate,
}): JSX.Element => {
  return (
    <div className="py-10 mx-8">
      <div className="max-w-7xl">
        <div className="mt-2 mb-8">
          <dt>
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              {contract.name}
            </h1>
          </dt>
          <dd className=" text-base text-gray-500">
            {startDate.toDateString()}
          </dd>
        </div>
      </div>

      <div className="max-w-7xl">
        <div className="grid grid-cols-1 gap-4 lg:col-span-2">
          <div className="rounded-lg bg-white overflow-hidden shadow py-6">
            <AreaBarChart data={data} height={224} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl">
        <StatsCards stats={statCardData} />
      </div>
    </div>
  );
};
