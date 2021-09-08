import React from 'react';
import { Contract, StatCardData, TransactionGroup } from '../interfaces';
import { BiaxialLineChart } from '../recharts/BiaxialLineChart';
import { StatsCards } from '../StatsCards';

interface ContractContainerProps {
  statCardData: StatCardData[];
  contract: Contract;
  data: TransactionGroup[];
}

export const ContractContainer: React.FC<ContractContainerProps> = ({
  statCardData,
  contract,
  data,
}): JSX.Element => {
  return (
    <div className="mb-5 mt-12 mx-8 self-center">
      <div className="max-w-7xl">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">
          {contract.name}
        </h1>
      </div>
      <div className="max-w-7xl mb-5">
        <StatsCards stats={statCardData} />
      </div>
      <div className="max-w-7xl">
        <div className="grid grid-cols-1 gap-4 lg:col-span-2">
          <div className="rounded-lg bg-white overflow-hidden shadow py-6">
            <BiaxialLineChart data={data} height={224} />
          </div>
        </div>
      </div>
    </div>
  );
};
