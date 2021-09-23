import { Web3Provider } from '@ethersproject/providers';
// import { ArrowRightIcon } from '@heroicons/react/outline';
// import { formatAndRoundBigNumber } from '@popcorn/utils';
// import { useNotifications, useTransactions } from '@usedapp/core';
import { useWeb3React } from '@web3-react/core';
// import MainActionButton from 'components/MainActionButton';
import Navbar from 'components/NavBar/NavBar';
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
      <div className="bg-gray-900 h-72">
        <div className="pt-12 px-4 sm:px-6 lg:px-8 lg:pt-20">
          <div className="text-center">
            <h2 className="text-lg leading-6 font-semibold text-gray-300 uppercase tracking-wider"></h2>
            <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              Claim Rewards
            </p>
            <p className="mt-3 max-w-4xl mx-auto text-xl text-gray-300 sm:mt-5 sm:text-2xl">
              Claim your rewards from RewardsEscrow, Staking and
              ParticipationRewards.
            </p>
          </div>
        </div>

        <div className="mt-8 pb-12 lg:mt-8 lg:pb-20">
          <div className="w-11/12 mx-auto rounded-lg shadow-xl bg-white">
            <div className="rounded-t-lg pt-12 pb-10 h-96">
              <div className="text-lg text-center text-gray-800 mt-4">
                Claim
              </div>
              <div className="text-lg text-center text-gray-800 mt-4">
                Stake
              </div>
              {/* <h3 className="text-center text-3xl font-semibold text-gray-900 sm:-mx-6">
                Swap Accrued Fees
              </h3>
              <p className="text-lg text-center text-gray-800 mt-4">
                Swap accrued fees to distribute them as rewards across the
                protocol.
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
