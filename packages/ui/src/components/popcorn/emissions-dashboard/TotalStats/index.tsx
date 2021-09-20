import { CloudIcon } from '@heroicons/react/outline';
import {
  StatCardData,
  Transaction,
} from '@popcorn/ui/interfaces/emissions-dashboard';
import { getChartData, percentChange } from '@popcorn/utils';
import React from 'react';
import { Globe, Wind } from 'react-feather';
import { BiaxialLineChart } from '../recharts/BiaxialLineChart';
import { StatsCards } from '../StatsCards';

interface TotalStatsProps {
  transactionsCurrentPeriod: Transaction[];
  transactionsPreviousPeriod: Transaction[];
  startDate: Date;
  endDate: Date;
}

const GWEI_TO_ETH = Math.pow(10, 9);

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

  const averageGasPriceCurrentPeriod =
    transactionsCurrentPeriod.length === 0
      ? 0
      : Math.round(
          transactionsPreviousPeriod.reduce(
            (acc, cu) => acc + Number(cu.gasPrice),
            0,
          ) /
            (GWEI_TO_ETH * transactionsCurrentPeriod.length),
        );
  const averageGasPricePreviousPeriod =
    transactionsPreviousPeriod.length === 0
      ? 0
      : Math.round(
          transactionsPreviousPeriod.reduce(
            (acc, cu) => acc + Number(cu.gasPrice),
            0,
          ) /
            (GWEI_TO_ETH * transactionsPreviousPeriod.length),
        );

  const gasPricePercentChange = percentChange(
    averageGasPricePreviousPeriod,
    averageGasPriceCurrentPeriod,
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
    {
      id: 3,
      name: 'Average Gas Price',
      stat: averageGasPriceCurrentPeriod,
      icon: Wind,
      change: `${gasPricePercentChange}%`,
      changeType: gasPricePercentChange > 0 ? 'increase' : 'decrease',
    },
  ];
};

export const TotalStats: React.FC<TotalStatsProps> = ({
  transactionsCurrentPeriod,
  transactionsPreviousPeriod,
  startDate,
  endDate,
}): JSX.Element => {
  return (
    <div className="py-10 mx-8 self-center">
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
          )}
        />
      </div>
      <div className="max-w-7xl">
        <div className="grid grid-cols-1 gap-4 lg:col-span-2">
          <div className="rounded-lg bg-white overflow-hidden shadow py-6">
            <BiaxialLineChart
              data={getChartData(transactionsCurrentPeriod, startDate, endDate)}
              height={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
