import React from 'react';
import ReactTooltip from 'react-tooltip';
import { StatCardData } from '../../../../interfaces/emissions-dashboard';

interface StatCardTooltipProps {
  contractName: string;
  item: StatCardData;
  previousPeriodStartDate: Date;
  startDate: Date;
}

const StatCardTooltip: React.FC<StatCardTooltipProps> = ({
  contractName,
  item,
  previousPeriodStartDate,
  startDate,
}): JSX.Element => {
  return (
    <ReactTooltip
      id={contractName + item.name}
      place="bottom"
      effect="solid"
      type="light"
      className="shadow-lg border border-gray-50 p-1 w-64"
    >
      <p className="font-bold text-center">Previous Period</p>
      <p className="text-sm text-gray-800 text-center">
        {previousPeriodStartDate.toLocaleDateString() +
          ' - ' +
          startDate.toLocaleDateString()}
      </p>
      {item.name === 'Transactions' && (
        <p className="text-md text-gray-800 text-center">
          {item.statPrev.toLocaleString() + ' transactions'}
        </p>
      )}
      {item.name === 'Average Gas Price' && (
        <p className="text-md text-gray-800 text-center">
          {item.statPrev.toLocaleString()}
        </p>
      )}
      {item.name.includes('CO2 Emissions') && (
        <p className="text-md text-gray-800 text-center">
          {item.statPrev.toLocaleString() + ' ' + item.name.split(' ')[2]}
        </p>
      )}
    </ReactTooltip>
  );
};

export default StatCardTooltip;
