import { Dispatch } from 'react';

interface DepositWithdrawToggleProps {
  withdrawl: Boolean;
  setWithdrawl: Dispatch<Boolean>;
}

const DepositWithdrawToggle: React.FC<DepositWithdrawToggleProps> = ({
  withdrawl,
  setWithdrawl,
}) => {
  return (
    <div className="flex flex-row">
      <div
        className={`w-1/2 ${
          withdrawl
            ? 'border-b border-gray-400 cursor-pointer group hover:border-gray-600'
            : 'border-b-2 border-gray-900'
        }`}
        onClick={(e) => setWithdrawl(false)}
      >
        <p
          className={`text-center text-base mb-4 ${
            withdrawl
              ? 'text-gray-400 group-hover:text-gray-600'
              : 'text-gray-900 font-semibold'
          }`}
        >
          Deposit
        </p>
      </div>
      <div
        className={`w-1/2 ${
          withdrawl
            ? 'border-b-2 border-gray-900'
            : 'border-b border-gray-400 cursor-pointer group hover:border-gray-600'
        }`}
        onClick={(e) => setWithdrawl(true)}
      >
        <p
          className={`text-center text-base mb-4 ${
            withdrawl
              ? 'text-gray-900 font-semibold'
              : 'text-gray-400 group-hover:text-gray-600'
          }`}
        >
          Withdraw
        </p>
      </div>
    </div>
  );
};
export default DepositWithdrawToggle;
