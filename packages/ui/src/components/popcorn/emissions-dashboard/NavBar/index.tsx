import { PlusIcon, RefreshIcon } from '@heroicons/react/solid';
import React from 'react';
import { NavBarProps } from '../../../../interfaces/index';
import { AddContractModal } from '../AddContractModal';
import { ContractErrorModal } from '../ContractErrorModal';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const NavBar: React.FC<NavBarProps> = ({
  title,
  logo,
  contractProps,
  contractErrorProps,
  refresh,
}) => {
  return (
    <div className="bg-gray-50 ">
      <div className="w-full px-24 bg-white shadow-sm">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="block h-16 w-auto"
                src={logo}
                alt="Popcorn logo"
              />
            </div>
            <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8"></div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button
              type="button"
              onClick={refresh}
              className="mr-3 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <RefreshIcon
                className="-ml-0.5 mr-2 h-4 w-4"
                aria-hidden="true"
              />
              Refresh
            </button>
            <button
              type="button"
              onClick={() => contractProps.setOpen(!contractProps.open)}
              className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white relative right-1 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
              Add Contract
            </button>
          </div>
        </div>
      </div>

      <div className="py-5">
        <header>
          <div className="px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl text-center font-medium leading-tight text-black">
              {title}
            </h1>
          </div>
        </header>
      </div>
      <AddContractModal {...contractProps} />
      <ContractErrorModal {...contractErrorProps} />
    </div>
  );
};
