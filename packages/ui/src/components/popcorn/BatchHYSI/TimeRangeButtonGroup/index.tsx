interface TimeRangeButtonGroupProps {
  range: string;
  setRange: (string) => void;
}

export const TimeRangeButtonGroup: React.FC<TimeRangeButtonGroupProps> = ({
  range,
  setRange,
}): JSX.Element => {
  const rangeOptions = ['7D', '30D', '180D', '1YR'];
  return (
    <div
      className="flex flex-row w-full sm:w-2/3 mx-auto justify-center py-2 my-2 px-2 rounded-full shadow-sm text-white bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 mb-8"
      style={{ width: 330 }}
    >
      {rangeOptions.map((option) => {
        return (
          <button
            type="button"
            className={
              range === option
                ? 'inline-flex items-center mx-1 px-5 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                : 'inline-flex items-center mx-1 px-5 py-2 border border-transparent text-base font-medium rounded-full  text-black bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
            }
            onClick={() => setRange(option)}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};
