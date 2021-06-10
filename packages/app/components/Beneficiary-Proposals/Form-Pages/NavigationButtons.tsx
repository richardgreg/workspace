import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import ProgressBar from 'components/ProgressBar';
import { Navigation } from './PropsalForm';

interface NavigationButtonProps {
  navigation: Navigation;
}

export default function NavigationButtons({
  navigation,
}: NavigationButtonProps) {
  const { currentStep, setCurrentStep, stepLimit } = navigation;
  const progressPercentage =
    currentStep === 0 ? 0 : Math.round((100 * currentStep - 1) / 10);
  return (
    <footer className="h-10 mb-4 mr-4">
      <div className="grid justify-items-stretch ...">
        <span className="relative z-0 inline-flex shadow-sm rounded-md justify-self-end">
          <div className="mr-2">
            <p className="text-gray-500 text-sm relative inline-flex items-center ">
              {progressPercentage}% completed
            </p>
            <ProgressBar
              progress={progressPercentage}
              progressColor={'bg-indigo-300'}
            />
          </div>
          <button
            type="button"
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            onClick={() => {
              if (currentStep !== 0) setCurrentStep(currentStep - 1);
            }}
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            onClick={() => {
              if (currentStep !== 10 && currentStep < stepLimit) {
                setCurrentStep(currentStep + 1);
              }
            }}
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </span>
      </div>
    </footer>
  );
}
