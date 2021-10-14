import { useState } from 'react';

export const TimeRangeButtonGroup: React.FC = ({}): JSX.Element => {
  const ranges = ['24hr', '7D', '14D', '30D', '180D', '1YR'];
  const [selectedRange, setSelectedRange] = useState<string>('1YR');
  return (
    <div className="flex flex-row mx-auto py-2 my-2 px-2 rounded-full shadow-sm text-white bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 mb-8">
      {ranges.map((range) => {
        return (
          <button
            type="button"
            className={
              range === selectedRange
                ? 'inline-flex items-center mx-1 px-5 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                : 'inline-flex items-center mx-1 px-5 py-2 border border-transparent text-base font-medium rounded-full  text-black bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
            }
            onClick={() => setSelectedRange(range)}
          >
            {range}
          </button>
        );
      })}
    </div>
  );
};
