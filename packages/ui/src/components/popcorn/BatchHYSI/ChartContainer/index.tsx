import { useState } from 'react';
import { HYSIAreaChart } from '../AreaChart';
import { TimeRangeButtonGroup } from '../TimeRangeButtonGroup';

export const ChartContainer: React.FC = ({}): JSX.Element => {
  const [range, setRange] = useState<string>('1YR');
  return (
    <div className="justify-items-center bg-white shadow rounded-lg py-4">
      <p className="text-3xl font-bold text-center">Annual Percentage Yield</p>
      <p className="text-md text-gray-600 text-center mb-10">
        Find out what you earn by the time goes
      </p>
      <TimeRangeButtonGroup range={range} setRange={setRange} />
      <HYSIAreaChart range={range} />
    </div>
  );
};
