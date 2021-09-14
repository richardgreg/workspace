import { BigNumber } from '@ethersproject/bignumber';
import { bigNumberToNumber, scaleNumberToBigNumber } from '@popcorn/utils';
import { Dispatch, useEffect, useState } from 'react';

export interface TokenInputProps {
  threeCrvBalance: BigNumber;
  threeCrvPrice: BigNumber;
  hysiBalance: BigNumber;
  hysiPrice: BigNumber;
  withdrawl: Boolean;
  setWithdrawl: Dispatch<Boolean>;
  depositAmount: BigNumber;
  setDepositAmount: Dispatch<BigNumber>;
}

const TokenInput: React.FC<TokenInputProps> = ({
  threeCrvBalance,
  threeCrvPrice,
  hysiBalance,
  hysiPrice,
  withdrawl,
  setWithdrawl,
  depositAmount,
  setDepositAmount,
}) => {
  const [estimatedAmount, setEstimatedAmount] = useState<number>(0);
  const [validInputAmount, setValidInputAmount] = useState<Boolean>(true);

  useEffect(() => {
    if (depositAmount.toString() !== '0') {
      calcOutputAmountsFromInput(depositAmount, withdrawl);
    }
  }, []);

  useEffect(() => {
    setValidInputAmount(
      withdrawl
        ? depositAmount <= hysiBalance
        : depositAmount <= threeCrvBalance,
    );
  }, [depositAmount]);

  function updateWithOuputAmounts(value: number, withdrawl): void {
    setEstimatedAmount(value);
    if (withdrawl) {
      setDepositAmount(
        scaleNumberToBigNumber(value).mul(threeCrvPrice).div(hysiPrice),
      );
    } else {
      setDepositAmount(
        scaleNumberToBigNumber(value).mul(hysiPrice).div(threeCrvPrice),
      );
    }
  }

  function updateWithInputAmounts(value: number, withdrawl: Boolean): void {
    const raisedValue = scaleNumberToBigNumber(value);
    setDepositAmount(raisedValue);
    calcOutputAmountsFromInput(raisedValue, withdrawl);
  }

  function calcOutputAmountsFromInput(
    value: BigNumber,
    withdrawl: Boolean,
  ): void {
    if (withdrawl) {
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
                updateWithInputAmounts(Number(e.target.value), withdrawl)
              }
            />
            <div className="flex flex-row items-center">
              <p
                className="text-gray-400 mr-3 border border-gray-400 p-1 rounded cursor-pointer hover:bg-gray-50 hover:border-gray-500 hover:text-gray-600"
                onClick={(e) =>
                  setDepositAmount(withdrawl ? hysiBalance : threeCrvBalance)
                }
              >
                MAX
              </p>
              <p className="text-gray-700">{withdrawl ? 'HYSI' : '3CRV'}</p>
            </div>
          </div>
        </div>
        {!validInputAmount && (
          <p className="text-red-600">Insufficient Balance</p>
        )}
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center my-8">
          <div className="w-16 bg-white">
            <div
              className="flex mx-auto w-10 h-10 rounded-full border border-gray-200 items-center cursor-pointer hover:bg-gray-50 hover:border-gray-400"
              onClick={(e) => setWithdrawl(!withdrawl)}
            >
              <img
                src="/images/exchangeIcon.svg"
                alt="exchangeIcon"
                className="mx-auto p-3"
              ></img>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <p className="font-semibold text-sm text-gray-900 mb-1">
          {`Estimated ${withdrawl ? '3CRV' : 'HYSI'} Amount`}
        </p>
        <div className="rounded-md border border-gray-200 px-2 py-4">
          <div className="flex flex-row justify-between">
            <input
              className="w-96"
              placeholder="-"
              value={estimatedAmount}
              onChange={(e) =>
                updateWithOuputAmounts(Number(e.target.value), withdrawl)
              }
            />
            <p className="text-gray-700">{withdrawl ? '3CRV' : 'HYSI'}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default TokenInput;
