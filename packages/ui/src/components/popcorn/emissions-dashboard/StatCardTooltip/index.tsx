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
      className="rounded-lg shadow-lg border border-gray-50 p-1 w-84 "
    >
      <p className="font-medium ">Previous Period</p>
      <p className="text-sm font-light text-gray-500 ">
        {'Start: ' + previousPeriodStartDate.toLocaleDateString()}
      </p>
      <p className="text-sm font-light text-gray-500 ">
        {'End: ' + startDate.toLocaleDateString()}
      </p>

      <p className="font-medium">
        {item.name === 'Transactions' &&
          item.statPrev.toLocaleString() + ' transactions'}
        {item.name === 'Average Gas Price' && item.statPrev.toLocaleString()}
        {item.name.includes('CO2 Emissions') &&
          item.statPrev.toLocaleString() + ' ' + item.name.split(' ')[2]}
      </p>
    </ReactTooltip>
  );
};

export default StatCardTooltip;
