import { BigNumber } from '@ethersproject/bignumber';
import { BatchType } from '@popcorn/contracts/adapters/BatchHysi/BatchHysiAdapter';
import AccountValue from './AccountValue';
import DepositWithdrawToggle from './DepositWithdrawToggle';
import TokenInput, { TokenInputProps } from './TokenInput';

interface MintRedeemInterfaceProps extends TokenInputProps {
  deposit: (depositAmount: BigNumber, batchType: BatchType) => Promise<void>;
  depositDisabled: boolean;
}

const MintRedeemInterface: React.FC<MintRedeemInterfaceProps> = ({
  threeCrvBalance,
  threeCrvPrice,
  hysiBalance,
  hysiPrice,
  withdrawl,
  setWithdrawl,
  depositAmount,
  setDepositAmount,
  deposit,
  depositDisabled,
}) => {
  console.log('MintRedeemInterface', depositAmount);

  return (
    <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
      <div className="flex flex-row">
        <AccountValue hysiBalance={hysiBalance} hysiPrice={hysiPrice} />
        <div className="w-1/2 px-6 py-6">
          <DepositWithdrawToggle
            withdrawl={withdrawl}
            setWithdrawl={setWithdrawl}
          />
          <TokenInput
            threeCrvBalance={threeCrvBalance}
            threeCrvPrice={threeCrvPrice}
            hysiBalance={hysiBalance}
            hysiPrice={hysiPrice}
            withdrawl={withdrawl}
            setWithdrawl={setWithdrawl}
            depositAmount={depositAmount}
            setDepositAmount={setDepositAmount}
          />
          <div className="w-full text-center mt-10">
            <button
              className="bg-blue-600 px-12 py-3 text-white rounded-xl hover:bg-blue-700"
              onClick={(e) =>
                deposit(
                  depositAmount,
                  withdrawl ? BatchType.Redeem : BatchType.Mint,
                )
              }
              disabled={depositDisabled}
            >
              Deposit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MintRedeemInterface;
