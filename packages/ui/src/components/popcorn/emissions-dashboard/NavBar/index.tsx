import { PlusIcon, RefreshIcon } from '@heroicons/react/solid';
import React from 'react';
import { NavBarProps } from '../../../../interfaces/index';
import { AddContractModal } from '../AddContractModal';
import { ContractErrorModal } from '../ContractErrorModal';
import { DisabledAddContractModal } from '../DisabledAddContractModal';

export const NavBar: React.FC<NavBarProps> = ({
  logo,
  contractProps,
  contractErrorProps,
  refresh,
}) => {
  return (
    <div className="w-full shadow-sm mx-auto sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex justify-between h-20 ">
        <div className="flex">
          <div className="flex-shrink-0 flex items-center">
            <img className="block h-16 w-auto" src={logo} alt="Popcorn logo" />
          </div>
        </div>
        <div className="hidden sm:flex sm:items-center ">
          <button
            type="button"
            onClick={refresh}
            className="mr-3 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <RefreshIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            Refresh
          </button>
          <button
            type="button"
            onClick={() => contractProps.setOpen(!contractProps.open)}
            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white relative  bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            Add Contract
          </button>
        </div>
      </div>
      {process.env.ENABLE_CONTRACT_ADD === 'true' ? (
        <AddContractModal {...contractProps} />
      ) : (
        <DisabledAddContractModal {...contractProps} />
      )}
      <ContractErrorModal {...contractErrorProps} />
    </div>
  );
};
