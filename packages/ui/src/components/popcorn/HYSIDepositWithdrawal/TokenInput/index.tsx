import { BigNumber } from '@ethersproject/bignumber';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, SwitchVerticalIcon } from '@heroicons/react/outline';
import { bigNumberToNumber, scaleNumberToBigNumber } from '@popcorn/utils';
import React, { Dispatch, Fragment, useEffect, useState } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
export interface TokenInputProps {
  threeCrvBalance: BigNumber;
  threeCrvPrice: BigNumber;
  hysiBalance: BigNumber;
  hysiPrice: BigNumber;
  withdrawal: Boolean;
  setwithdrawal: (boolean) => void;
  depositAmount: BigNumber;
  setDepositAmount: Dispatch<BigNumber>;
  useUnclaimedDeposits: Boolean;
  setUseUnclaimedDeposits: (boolean) => void;
}

type AvailableCcys = 'USDC' | 'FRAX' | 'UST' | 'USDN';

const TokenInput: React.FC<TokenInputProps> = ({
  threeCrvBalance,
  threeCrvPrice,
  hysiBalance,
  hysiPrice,
  withdrawal,
  setwithdrawal,
  depositAmount,
  setDepositAmount,
  useUnclaimedDeposits,
  setUseUnclaimedDeposits,
}) => {
  const [estimatedAmount, setEstimatedAmount] = useState<number>(0);
  const [validInputAmount, setValidInputAmount] = useState<Boolean>(true);
  const [despositCcy, setDepositCcy] = useState<AvailableCcys>('USDC');

  useEffect(() => {
    if (depositAmount.toString() !== '0') {
      calcOutputAmountsFromInput(depositAmount, withdrawal);
    }
  }, []);

  useEffect(() => {
    setValidInputAmount(
      withdrawal
        ? depositAmount <= hysiBalance
        : depositAmount <= threeCrvBalance,
    );
  }, [depositAmount]);

  function updateWithOuputAmounts(value: number, withdrawal): void {
    setEstimatedAmount(value);
    if (withdrawal) {
      setDepositAmount(
        scaleNumberToBigNumber(value).mul(threeCrvPrice).div(hysiPrice),
      );
    } else {
      setDepositAmount(
        scaleNumberToBigNumber(value).mul(hysiPrice).div(threeCrvPrice),
      );
    }
  }

  function updateWithInputAmounts(value: number, withdrawal: Boolean): void {
    const raisedValue = scaleNumberToBigNumber(value);
    setDepositAmount(raisedValue);
    calcOutputAmountsFromInput(raisedValue, withdrawal);
  }

  function calcOutputAmountsFromInput(
    value: BigNumber,
    withdrawal: Boolean,
  ): void {
    if (withdrawal) {
      setEstimatedAmount(
        bigNumberToNumber(value.mul(hysiPrice).div(threeCrvPrice)),
      );
    } else {
      setEstimatedAmount(
        bigNumberToNumber(value.mul(threeCrvPrice).div(hysiPrice)),
      );
    }
  }

  return (
    <>
      {!withdrawal && (
        <>
          <div className="mt-6">
            <p className="font-semibold text-sm text-gray-900 mb-1">
              Deposit Amount
            </p>
            <div
              className={`rounded-md border  px-2 py-3 ${
                validInputAmount ? 'border-gray-200' : 'border-red-600'
              }`}
            >
              <div className="flex flex-row justify-between items-center">
                <input
                  className="w-96"
                  placeholder="-"
                  value={bigNumberToNumber(depositAmount)}
                  onChange={(e) =>
                    updateWithInputAmounts(Number(e.target.value), withdrawal)
                  }
                />
                <div className="flex flex-row items-center">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="">
                        <span className="sr-only">Open options</span>
                        <div className="flex flex-row">
                          <p className="text-gray-700">{despositCcy}</p>
                          <ChevronDownIcon className="ml-2 mt-1 w-4 h-4" />
                        </div>
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
                                  'block px-4 py-2 text-sm',
                                )}
                                onClick={() => setDepositCcy('USDC')}
                              >
                                USDC
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
                                  'block px-4 py-2 text-sm',
                                )}
                                onClick={() => setDepositCcy('FRAX')}
                              >
                                FRAX
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
                                  'block px-4 py-2 text-sm',
                                )}
                                onClick={() => setDepositCcy('USDN')}
                              >
                                USDN
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
                                  'block px-4 py-2 text-sm',
                                )}
                                onClick={() => setDepositCcy('UST')}
                              >
                                UST
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
            <label className="flex flex-row items-center mt-2">
              <input
                type="checkbox"
                className="mr-2 rounded-sm"
                onChange={(e) => setUseUnclaimedDeposits(!useUnclaimedDeposits)}
              />
              <p>{`Deposit entire ${despositCcy} balance`}</p>
            </label>

            {!validInputAmount && (
              <p className="text-red-600">Insufficient Balance</p>
            )}
          </div>
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center my-8">
              <div className="w-16 bg-white">
                <div
                  className="flex mx-auto w-10 h-10 rounded-full border border-gray-200 items-center cursor-pointer hover:bg-gray-50 hover:border-gray-400"
                  onClick={(e) => setwithdrawal(!withdrawal)}
                >
                  <SwitchVerticalIcon className="h-7 w-7 text-gray-400 align-middle mx-auto" />
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <p className="font-semibold text-sm text-gray-900 mb-1">
              {`Estimated ${withdrawal ? '3CRV' : 'HYSI'} Amount`}
            </p>
            <div className="rounded-md border border-gray-200 px-2 py-4">
              <div className="flex flex-row justify-between">
                <input
                  className="w-96"
                  placeholder="-"
                  value={estimatedAmount}
                  onChange={(e) =>
                    updateWithOuputAmounts(Number(e.target.value), withdrawal)
                  }
                />
                <p className="text-gray-700">{withdrawal ? '3CRV' : 'HYSI'}</p>
              </div>
            </div>
          </div>
        </>
      )}

      {withdrawal && (
        <>
          <div className="mt-6">
            <div className="">
              <p className="font-semibold text-sm text-gray-900 mb-1">
                Withdrawal Amount
              </p>
              <div className="rounded-md border border-gray-200 px-2 py-4">
                <div className="flex flex-row justify-between">
                  <input
                    className="w-96"
                    placeholder="-"
                    value={estimatedAmount}
                    onChange={(e) =>
                      updateWithOuputAmounts(Number(e.target.value), withdrawal)
                    }
                  />
                  <p className="text-gray-700">
                    {withdrawal ? '3CRV' : 'HYSI'}
                  </p>
                </div>
              </div>
            </div>

            <label className="flex flex-row items-center mt-2">
              <input
                type="checkbox"
                className="mr-2 rounded-sm"
                onChange={(e) => setUseUnclaimedDeposits(!useUnclaimedDeposits)}
              />
              <p>{`Withdraw entire USD balance`}</p>
            </label>

            {!validInputAmount && (
              <p className="text-red-600">Insufficient Balance</p>
            )}
          </div>
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center my-8">
              <div className="w-16 bg-white">
                <div
                  className="flex mx-auto w-10 h-10 rounded-full border border-gray-200 items-center cursor-pointer hover:bg-gray-50 hover:border-gray-400"
                  onClick={(e) => setwithdrawal(!withdrawal)}
                >
                  <SwitchVerticalIcon className="h-7 w-7 text-gray-400 align-middle mx-auto" />
                </div>
              </div>
            </div>
          </div>

          <p className="font-semibold text-sm text-gray-900 mb-1">
            Estimated Stablecoin withdrawal
          </p>
          <div
            className={`rounded-md border  px-2 py-3 ${
              validInputAmount ? 'border-gray-200' : 'border-red-600'
            }`}
          >
            <div className="flex flex-row justify-between items-center">
              <input
                className="w-96"
                placeholder="-"
                value={bigNumberToNumber(depositAmount)}
                onChange={(e) =>
                  updateWithInputAmounts(Number(e.target.value), withdrawal)
                }
              />
              <div className="flex flex-row items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="">
                      <span className="sr-only">Open options</span>
                      <div className="flex flex-row">
                        <p className="text-gray-700">{despositCcy}</p>
                        <ChevronDownIcon className="ml-2 mt-1 w-4 h-4" />
                      </div>
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700',
                                'block px-4 py-2 text-sm',
                              )}
                              onClick={() => setDepositCcy('USDC')}
                            >
                              USDC
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700',
                                'block px-4 py-2 text-sm',
                              )}
                              onClick={() => setDepositCcy('FRAX')}
                            >
                              FRAX
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700',
                                'block px-4 py-2 text-sm',
                              )}
                              onClick={() => setDepositCcy('USDN')}
                            >
                              USDN
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700',
                                'block px-4 py-2 text-sm',
                              )}
                              onClick={() => setDepositCcy('UST')}
                            >
                              UST
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default TokenInput;
