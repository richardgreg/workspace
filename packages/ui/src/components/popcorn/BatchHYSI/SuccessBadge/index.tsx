import { InformationCircleIcon } from '@heroicons/react/solid';

export const SuccessBadge: React.FC = (): JSX.Element => {
  return (
    <div className="w-full flex-col items-center px-2.5 py-4 rounded-md  bg-green-100 text-green-800 grid justify-items-start">
      <div className="inline-flex pl-6">
        <InformationCircleIcon className="bg-green-100 text-green-500 w-5 h-5 mr-5" />
        <p className="text-m font-medium">
          Your desposit successfully submitted to this batch. Please wait until
          this batch is completed to claim your HYSI
        </p>
      </div>
    </div>
  );
};
