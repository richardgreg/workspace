import { Web3Provider } from '@ethersproject/providers';
// import { ArrowRightIcon } from '@heroicons/react/outline';
// import { formatAndRoundBigNumber } from '@popcorn/utils';
// import { useNotifications, useTransactions } from '@usedapp/core';
import { useWeb3React } from '@web3-react/core';
// import MainActionButton from 'components/MainActionButton';
import Navbar from 'components/NavBar/NavBar';
import { ClaimPopItem } from 'components/RewardsManager/ClaimPopItem';
// import { connectors } from 'context/Web3/connectors';
import { ContractsContext } from 'context/Web3/contracts';
// import { BigNumber } from 'ethers';
// import { parseEther } from 'ethers/lib/utils';
import { useContext, useState } from 'react';
import { Toaster } from 'react-hot-toast';
// import RewardDestination from '../../components/RewardsManager/RewardDestination';
// import { useContractFunction } from '../../hooks/useContractFunction';

export default function Register(): JSX.Element {
  const context = useWeb3React<Web3Provider>();
  const { library, account, activate } = context;
  const { contracts } = useContext(ContractsContext);
  const [wait, setWait] = useState<boolean>(false);

  // const { transactions } = useTransactions();
  // const { notifications } = useNotifications();

  return (
    <div className="w-full bg-gray-900 h-full">
      <Navbar />
      <Toaster position="top-right" />
      <div className="bg-gray-900 h-full">
        <div className="pt-12 px-4 sm:px-6 lg:px-8 lg:pt-20">
          <div className="text-center">
            <h2 className="text-lg leading-6 font-semibold text-gray-300 uppercase tracking-wider"></h2>
            <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              Claim POP
            </p>
            <p className="mt-3 max-w-4xl mx-auto text-xl text-gray-300 sm:mt-5 sm:text-2xl">
              Claim your POP from RewardsEscrow, Staking and
              ParticipationRewards.
            </p>
          </div>
        </div>

        <div className="mt-8 pb-12 lg:mt-8 lg:pb-20">
          <div className="w-11/12 mx-auto rounded-lg shadow-xl bg-gray-100">
            <div className="rounded-t-lg pt-10 pb-10">
              <div>
                <dl className="px-20 grid grid-cols-1 gap-40 sm:grid-cols-2">
                  <div
                    key={'claimable'}
                    className="px-4 px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6 text-center bg-gray-800"
                  >
                    <dt className="text-sm font-medium text-gray-100 truncate">
                      Total Claimable
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold text-white">
                      {340}
                    </dd>
                  </div>
                  <div
                    key={'deposit'}
                    className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6 text-center bg-gray-800"
                  >
                    <dt className="text-sm font-medium text-gray-100 truncate">
                      Total Deposits
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold text-white">
                      100
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 bg-gray-100">
                <p className="mx-2 max-w-4xl text-x text-black sm:mt-5 sm:text-2xl">
                  Claim rewards by contract
                </p>
                <div className="overflow-hidden">
                  <ul className="space-y-3">
                    <ClaimPopItem
                      contractName={'Beneficiary Governance'}
                      rewardAmount={43}
                      claimRewards={() => {}}
                    />
                    <ClaimPopItem
                      contractName={'Escrow'}
                      rewardAmount={403}
                      claimRewards={() => {}}
                    />
                    <ClaimPopItem
                      contractName={'Grant Elections'}
                      rewardAmount={342}
                      claimRewards={() => {}}
                    />
                    <ClaimPopItem
                      contractName={'Staking'}
                      rewardAmount={0}
                      claimRewards={() => {}}
                    />
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
