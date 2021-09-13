import { BigNumber } from '@ethersproject/bignumber';
import { parseEther } from '@ethersproject/units';
import {
  formatAndRoundBigNumber,
  scaleNumberToBigNumber,
} from '@popcorn/utils';
import { Dispatch } from 'react';

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
  console.log('TokenInput', depositAmount);

  return (
    <>
      <div className="mt-6">
        <p className="font-semibold text-sm text-gray-900 mb-1">
          Deposit Amount
        </p>
        <div className="rounded-md border border-gray-200 px-2 py-3">
          <div className="flex flex-row justify-between items-center">
            <input
              className="w-96"
              placeholder="-"
              value={formatAndRoundBigNumber(depositAmount)}
              onChange={(e) =>
                setDepositAmount(scaleNumberToBigNumber(Number(e.target.value)))
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
              value={
                depositAmount.toString() === '0'
                  ? 0
                  : withdrawl
                  ? formatAndRoundBigNumber(
                      depositAmount.mul(hysiPrice).div(threeCrvPrice),
                    )
                  : formatAndRoundBigNumber(
                      depositAmount.mul(threeCrvPrice).div(hysiPrice),
                    )
              }
              onChange={(e) =>
                withdrawl
                  ? setDepositAmount(
                      scaleNumberToBigNumber(Number(e.target.value)),
                    )
                  : setDepositAmount(
                      scaleNumberToBigNumber(Number(e.target.value))
                        .mul(hysiPrice)
                        .div(parseEther('1')),
                    )
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
