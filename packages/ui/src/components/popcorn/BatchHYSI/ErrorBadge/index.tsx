import { XCircleIcon } from '@heroicons/react/solid';

export const ErrorBadge: React.FC = (): JSX.Element => {
  return (
    <div className=" w-full flex-col items-center px-2.5 py-4 rounded-md  bg-red-100 text-red-800 grid justify-items-start">
      <div className="inline-flex pl-6">
        <XCircleIcon className="bg-red-100 text-red-500 w-5 h-5 mr-5" />
        <p className="text-m font-medium">
          You haven't connected your Metamask wallet
        </p>
      </div>
      <p className="text-sm font-light my-2 pl-16">
        Please connect your Metamask wallet to continue this transaction
      </p>
      <p className="text-m font-medium pl-16">Connect</p>
    </div>
  );
};
