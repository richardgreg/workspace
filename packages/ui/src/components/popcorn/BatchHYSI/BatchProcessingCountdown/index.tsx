import { Interval } from 'luxon';
import React, { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';

interface TimeTillBatchProcessing {
  timeTillProcessing: Date;
  progressPercentage: number;
}

interface BatchProcessingCountdownProps {
  timeTillBatchProcessing: TimeTillBatchProcessing[];
  strokeNormal?: string;
  trailNormal?: string;
  strokeWarning?: string;
  trailWarning?: string;
  warningCutOffHours?: number;
}

export const BatchProcessingCountdown: React.FC<BatchProcessingCountdownProps> = ({
  timeTillBatchProcessing,
  strokeNormal = 'rgba(34, 152, 112, 100)',
  trailNormal = '#a6ebcd',
  strokeWarning = 'rgba(251, 191, 36, 100)',
  trailWarning = 'rgba(254, 243, 199, 100)',
  warningCutOffHours = 12,
}) => {
  const [timeLeft, setTimeLeft] = useState<Interval>();
  const [hours, setHours] = useState<number>();
  const [minutes, setMinutes] = useState<number>();
  const [seconds, setSeconds] = useState<number>();
  useEffect(() => {
    setTimeLeft(
      Interval.fromDateTimes(
        new Date(),
        timeTillBatchProcessing[0].timeTillProcessing,
      ),
    );
    setInterval(() => {
      setTimeLeft(
        Interval.fromDateTimes(
          new Date(),
          timeTillBatchProcessing[0].timeTillProcessing,
        ),
      );
    }, 1000);
  }, []);

  useEffect(() => {
    if (timeLeft) {
      const { hours, minutes, seconds } = timeLeft
        .toDuration(['hours', 'minutes', 'seconds'])
        .toObject();
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    }
  }, [timeLeft]);

  return (
    <div className="bg-white rounded-lg shadow px-5 py-6 mt-6 flex flex-row">
      <div className="w-2/3 flex flex-row">
        <div className="w-24 h-24 flex-shrink-0 flex-grow-0 mr-4">
          {timeTillBatchProcessing && (
            <CircularProgressbar
              value={timeTillBatchProcessing[0].progressPercentage}
              styles={{
                root: {},
                path: {
                  stroke: `${
                    hours < warningCutOffHours ? strokeWarning : strokeNormal
                  }`,
                  strokeLinecap: 'butt',
                  transition: 'stroke-dashoffset 0.5s ease 0s',
                },
                trail: {
                  stroke: `${
                    hours < warningCutOffHours ? trailWarning : trailNormal
                  }`,
                },
              }}
            />
          )}
        </div>
        <div>
          {timeLeft?.isValid && (
            <h2 className="font-semibold text-base text-gray-900 mb-2">
              {`${hours} Hours ${minutes} Minutes ${Math.floor(
                seconds,
              )} Seconds left`}
            </h2>
          )}
          {!timeLeft?.isValid && (
            <h2 className="font-semibold text-base text-gray-900 mb-2">
              {`Time has elapsed`}
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
      <div className="w-1/3 flex justify-end ml-2">
        <button className="px-2 h-9 rounded-lg font-semibold bg-blue-100 text-blue-600 text-sm hover:bg-blue-200 hover:text-blue-700">
          See Detail Process
        </button>
      </div>
    </div>
  );
};
