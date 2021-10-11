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
      <p className="font-bold ">Previous Period</p>

      <div className="flex flex-row">
        <p className="text-sm font-light text-gray-500 mr-2">Start :</p>
        <p className="text-sm font-light text-gray-500 ">
          {previousPeriodStartDate.toLocaleDateString()}
        </p>
      </div>
      <div className="flex flex-row">
        <p className="text-sm font-light text-gray-500 mr-4">End :</p>
        <p className="text-sm font-light text-gray-500 ">
          {startDate.toLocaleDateString()}
        </p>
      </div>
      <div className="flex flex-row">
        <p className="font-semibold mr-1">Total :</p>
        <p className="font-semibold">
          {item.name === 'Transactions' &&
            item.statPrev.toLocaleString() + ' transactions'}
          {item.name === 'Average Gas Price' && item.statPrev.toLocaleString()}
          {item.name.includes('CO2 Emissions') &&
            item.statPrev.toLocaleString() + ' ' + item.name.split(' ')[2]}
        </p>
      </div>
    </ReactTooltip>
  );
};

export default StatCardTooltip;
