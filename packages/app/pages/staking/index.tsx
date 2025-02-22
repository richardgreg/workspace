import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import DropdownSelect from 'components/DropdownSelect';
import MainActionButton from 'components/MainActionButton';
import { utils } from 'ethers';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useContext, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import NavBar from '../../components/NavBar/NavBar';
import { connectors } from '../../context/Web3/connectors';
import { ContractsContext } from '../../context/Web3/contracts';

const ONE_WEEK = 604800;
const lockPeriods = [
  { label: '1 week', value: ONE_WEEK },
  { label: '1 month', value: ONE_WEEK * 4 },
  { label: '3 months', value: ONE_WEEK * 4 * 3 },
  { label: '6 months', value: ONE_WEEK * 4 * 6 },
  { label: '1 year', value: ONE_WEEK * 52 },
  { label: '4 years', value: ONE_WEEK * 52 * 4 },
];

export default function LockPop() {
  const context = useWeb3React<Web3Provider>();
  const { contracts } = useContext(ContractsContext);
  const { library, account, activate, active } = context;
  const [popToLock, setPopToLock] = useState<number>(0);
  const [lockDuration, setLockDuration] = useState<number>(ONE_WEEK);
  const [popBalance, setPopBalance] = useState(0);
  const [lockedPop, setLockedPop] = useState(0);
  const [voiceCredits, setVoiceCredits] = useState<number>(0);
  const [approved, setApproval] = useState<number>(0);
  const [expired, setExpired] = useState<boolean>(false);
  const [wait, setWait] = useState<boolean>(false);

  useEffect(() => {
    setVoiceCredits(popToLock * (lockDuration / (ONE_WEEK * 52 * 4)));
  }, [lockDuration, popToLock]);

  useEffect(() => {
    if (!account) {
      return;
    }
    contracts.pop
      .balanceOf(account)
      .then((res) => setPopBalance(Number(utils.formatEther(res))));
    contracts.pop
      .allowance(account, process.env.ADDR_STAKING)
      .then((res) => setApproval(Number(utils.formatEther(res))));
  }, [account]);

  const getLockedPop = async () => {
    const lockedBalance = await contracts.staking.lockedBalances(account);
    const currentTime = parseInt(`${new Date().getTime() / 1000}`);
    setExpired(lockedBalance.end.lt(currentTime));
    setLockedPop(
      Number(utils.formatEther(await contracts.staking.balanceOf(account))),
    );
  };

  useEffect(() => {
    if (contracts?.staking && account) {
      getLockedPop();
    }
  }, [contracts]);

  async function lockPop(): Promise<void> {
    setWait(true);
    toast.loading('Staking POP...');
    const lockedPopInEth = utils.parseEther(popToLock.toString());
    const signer = library.getSigner();
    const connectedStaking = await contracts.staking.connect(signer);
    await connectedStaking
      .stake(lockedPopInEth, lockDuration)
      .then((res) => {
        toast.success('POP staked!');
      })
      .catch((err) => {
        toast.error(err.data.message.split("'")[1]);
      });
    setWait(false);
  }

  async function approve(): Promise<void> {
    setWait(true);
    toast.loading('Approving POP for staking...');

    // Ensure that popToLock is in the format 10000000... instead of 10e+5
    // because parseEther breaks with exponential String
    const formattedPop = popToLock.toLocaleString().replace(/,/gi, '');
    const lockedPopInEth = utils.parseEther(formattedPop);
    const connected = await contracts.pop.connect(library.getSigner());
    await connected
      .approve(process.env.ADDR_STAKING, lockedPopInEth)
      .then((res) => toast.success('POP approved!'))
      .catch((err) => toast.error(err.data.message.split("'")[1]));
    setWait(false);
  }

  async function increaseStake(): Promise<void> {
    setWait(true);
    // Ensure that popToLock is in the format 10000000... instead of 10e+5
    // because parseEther breaks with exponential String
    const formattedPop = popToLock.toLocaleString().replace(/,/gi, '');
    const lockedPopInEth = utils.parseEther(formattedPop);
    const connected = await contracts.staking.connect(library.getSigner());
    toast.promise(connected.increaseStake(lockedPopInEth), {
      loading: 'Increasing POP for staking...',
      success: 'POP Increased!',
      error: 'Error occurred while increasing POP',
    });
    setWait(false);
  }

  async function increaseLock(): Promise<void> {
    setWait(true);
    const connected = await contracts.staking.connect(library.getSigner());
    toast.promise(connected.increaseStake(lockDuration), {
      loading: 'Increasing POP Lock Period',
      success: 'POP Lock Period Increased!',
      error: 'Error occurred while increasing POP Lock Period',
    });
    setWait(false);
  }

  return (
    <div className="w-full bg-gray-900 h-screen">
      <NavBar />
      <Toaster position="top-right" />
      <div className="bg-gray-900">
        <div className="pt-12 px-4 sm:px-6 lg:px-8 lg:pt-20">
          <div className="text-center">
            <h2 className="text-lg leading-6 font-semibold text-gray-300 uppercase tracking-wider"></h2>
            <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              POP Staking
            </p>
            <p className="mt-3 max-w-4xl mx-auto text-xl text-gray-300 sm:mt-5 sm:text-2xl">
              In order to participate in the selection of beneficiaries and
              awarding grants to beneficiaries, you need voice credits. Stake
              your POP to gain voice credits.
            </p>
          </div>
        </div>

        {lockedPop && (
          <div className="mt-2 pb-0 lg:mt-4 lg:pb-0">
            <div className="relative z-0">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative lg:grid lg:grid-cols-7">
                  <div className="max-w-lg mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-start-3 lg:col-end-6 lg:row-start-1 lg:row-end-4">
                    <div className="relative z-10 rounded-lg shadow-xl">
                      <div className="border-t-2 rounded-t-lg border-gray-100 rounded-b-lg  bg-gray-100  sm:px-10 sm:py-1">
                        <span className="flex flex-row items-center justify-between">
                          <h3
                            className="text-center text-xl font-extralight text-gray-900 sm:-mx-6"
                            id="tier-growth"
                          >
                            Your Locked POP
                          </h3>
                          <p className="px-3 text-center my-4 text-3xl font-black tracking-tight text-gray-900 sm:text-3xl">
                            {lockedPop.toFixed(2)}
                          </p>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 pb-12 lg:mt-8 lg:pb-20">
          <div className="relative z-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative lg:grid lg:grid-cols-7">
                <div className="mt-10 max-w-lg mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-start-3 lg:col-end-6 lg:row-start-1 lg:row-end-4">
                  <div className="relative z-10 rounded-lg shadow-xl">
                    <div className="bg-white rounded-t-lg px-6 pt-12 pb-10">
                      <div className="flex flex-col">
                        <h3
                          className="text-center text-3xl font-semibold text-gray-900 sm:-mx-6"
                          id="tier-growth"
                        >
                          Voice Credits
                        </h3>
                        <p className="px-3 text-center my-4 text-6xl font-black tracking-tight text-gray-900 sm:text-6xl">
                          {voiceCredits.toFixed(2)}
                        </p>
                        <div className="w-10/12 mx-auto">
                          <div className="w-full">
                            <span className="flex flex-row justify-between">
                              <p className="text-gray-600">Locked Pop</p>
                              <span className="text-gray-600 flex flex-row">
                                <p className="">
                                  {popToLock}/{popBalance}
                                </p>
                              </span>
                            </span>
                            <Slider
                              className="mt-2 w-10/12"
                              value={popToLock}
                              onChange={(val) => setPopToLock(Number(val))}
                              min={0}
                              max={popBalance}
                              step={1}
                              disabled={
                                account && approved >= popToLock && expired
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-t-2 border-gray-100 rounded-b-lg pt-10 pb-8 px-6 bg-gray-50 space-y-4 sm:px-10 sm:py-10">
                      <span className="flex flex-row items-center justify-between">
                        <p className="">
                          For how long do you want to lock your POP?
                        </p>
                        <DropdownSelect
                          label={'Time Period'}
                          selectedValue={
                            lockPeriods.find(
                              (period) =>
                                Number(period.value) === Number(lockDuration),
                            ).label
                          }
                          disabled={
                            account &&
                            approved >= popToLock &&
                            lockedPop > 0 &&
                            !expired
                          }
                          selectOptions={lockPeriods}
                          selectOption={setLockDuration}
                        />
                      </span>
                      <p className="text-sm text-gray-500">
                        Locking tokens for a longer period of time will give you
                        more voting power. (POP * duration / max duration)
                      </p>
                      <div className="rounded-lg shadow-md">
                        {!account && (
                          <MainActionButton
                            label={'Connect Wallet'}
                            handleClick={() => activate(connectors.Injected)}
                          />
                        )}
                        {account && approved >= popToLock && !lockedPop && (
                          <MainActionButton
                            label={'Stake POP'}
                            handleClick={lockPop}
                            disabled={wait || popToLock === 0}
                          />
                        )}
                        {account &&
                          approved >= popToLock &&
                          lockedPop > 0 &&
                          !expired && (
                            <MainActionButton
                              label={'Increase Stake POP'}
                              handleClick={increaseStake}
                              disabled={wait || popToLock === 0}
                            />
                          )}
                        {account && approved >= popToLock && expired && (
                          <MainActionButton
                            label={'Increase POP Lock Period'}
                            handleClick={increaseLock}
                            disabled={wait}
                          />
                        )}
                        {account && approved < popToLock && (
                          <MainActionButton
                            label={'Approve'}
                            handleClick={approve}
                            disabled={wait || popToLock === 0}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
