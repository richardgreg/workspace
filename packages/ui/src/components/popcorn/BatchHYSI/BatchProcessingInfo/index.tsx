import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';

interface TimeTillBatchProcessing {
  timeTillProcessing: Date;
  progressPercentage: number;
}

interface BatchProcessingInfoProps {
  timeTillBatchProcessing: TimeTillBatchProcessing[];
}

export const BatchProcessingInfo: React.FC<BatchProcessingInfoProps> = ({
  timeTillBatchProcessing,
}) => {
  return (
    <div className="bg-white rounded-lg shadow px-5 py-6 mt-16 flex flex-row">
      <div className="w-2/3 flex flex-row">
        <div className="w-24 h-24 flex-shrink-0 flex-grow-0 mr-4">
          {timeTillBatchProcessing && (
            <CircularProgressbar
              value={timeTillBatchProcessing[0].progressPercentage}
              styles={{
                // Customize the root svg element
                root: {},
                // Customize the path, i.e. the "completed progress"
                path: {
                  stroke: `rgba(34, 152, 112, 100)`,
                  strokeLinecap: 'butt',
                  // Customize transition animation
                  transition: 'stroke-dashoffset 0.5s ease 0s',
                },
                trail: {
                  stroke: '#a6ebcd',
                },
              }}
            />
          )}
        </div>
        <div>
          {timeTillBatchProcessing && (
            <h2 className="font-semibold text-base text-gray-900 mb-2">
              {`${timeTillBatchProcessing[0].timeTillProcessing.getUTCHours()} Hours
          ${timeTillBatchProcessing[0].timeTillProcessing.getUTCMinutes()} Minutes
          ${timeTillBatchProcessing[0].timeTillProcessing.getUTCSeconds()} Seconds left`}
            </h2>
          )}
          <p className="text-sm font-light text-gray-400">
            We reduce your gas fee/transaction with doing deposit in batch. This
            batch will automatically submitted after reach our schedule. When
            the batch is completed you can claim the HYSI token to be displayed
            on your wallet.
          </p>
        </div>
      </div>
      <div className="w-1/3 flex justify-end">
        <button className="px-3 h-9 rounded-lg font-semibold bg-blue-100 text-blue-600 text-sm hover:bg-blue-200 hover:text-blue-700">
          See Detail Process
        </button>
      </div>
    </div>
  );
};
