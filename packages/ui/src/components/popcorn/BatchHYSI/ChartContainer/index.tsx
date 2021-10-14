import { HYSIAreaChart } from '../AreaChart';
import { TimeRangeButtonGroup } from '../TimeRangeButtonGroup';

export const ChartContainer: React.FC = ({}): JSX.Element => {
  return (
    <div className="justify-items-center">
      <p className="text-3xl font-bold text-center">Annual Percentage Yield</p>
      <p className="text-md text-gray-600 text-center mb-10">
        Find out what you earn by the time goes
      </p>
      <TimeRangeButtonGroup />
      <HYSIAreaChart />
    </div>
  );
};
