import React from 'react';
import ReactTooltip from 'react-tooltip';
import { StatCardData } from '../../../../interfaces/emissions-dashboard';

interface StatCardTooltipProps {
  contractName: string;
  item: StatCardData;
  previousPeriodStartDate: Date;
  startDate: Date;
  endDate: Date;
}

const StatCardTooltip: React.FC<StatCardTooltipProps> = ({
  contractName,
  item,
  previousPeriodStartDate,
  startDate,
  endDate,
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
      <p className="text-sm text-gray-800">
        {previousPeriodStartDate.toLocaleDateString() +
          ' - ' +
          startDate.toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-500">{item.statPrev.toLocaleString()}</p>
    </ReactTooltip>
  );
};

export default StatCardTooltip;
