import { CloudIcon } from '@heroicons/react/outline';
import { getChartData, percentChange } from '@popcorn/utils';
import React from 'react';
import { Globe } from 'react-feather';
import {
  Contract,
  StatCardData,
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

const getStatCardData = (
  transactionsCurrentPeriod: Transaction[],
  transactionsPreviousPeriod: Transaction[],
): StatCardData[] => {
  const totalEmissionsCurrentPeriod = Math.round(
    transactionsCurrentPeriod.reduce((acc, cu) => acc + cu.emissions, 0),
  );
  const totalEmissionsPreviousPeriod = Math.round(
    transactionsPreviousPeriod.reduce((acc, cu) => acc + cu.emissions, 0),
  );
  const emissionsChangePercentChange = percentChange(
    totalEmissionsPreviousPeriod,
    totalEmissionsCurrentPeriod,
  );

  const totalTransactionVolCurrentPeriod = transactionsCurrentPeriod.length;
  const totalTransactionVolPreviousPeriod = transactionsPreviousPeriod.length;
  const transactionVolPercentChange = percentChange(
    totalTransactionVolPreviousPeriod,
    totalTransactionVolCurrentPeriod,
  );
  return [
    {
      id: 1,
      name: 'CO2 Emissions (µg)',
      stat: totalEmissionsCurrentPeriod,
      icon: CloudIcon,
      change: `${Math.round(emissionsChangePercentChange)}%`,
      changeType: emissionsChangePercentChange > 0 ? 'increase' : 'decrease',
    },
    {
      id: 2,
      name: 'Transactions',
      stat: totalTransactionVolCurrentPeriod,
      icon: Globe,
      change: `${transactionVolPercentChange}%`,
      changeType: transactionVolPercentChange > 0 ? 'increase' : 'decrease',
    },
  ];
};

export const ContractContainer: React.FC<ContractContainerProps> = ({
  transactionsCurrentPeriod,
  transactionsPreviousPeriod,
  startDate,
  endDate,
  contract,
}): JSX.Element => {
  return (
    <div className="mb-5 mt-12 mx-8 self-center">
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
