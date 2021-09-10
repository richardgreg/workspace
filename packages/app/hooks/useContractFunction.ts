import {
  TransactionStatus,
  useContractFunction as DappsUseContractFunction,
} from '@usedapp/core';
import { Contract } from 'ethers';

interface UseContractFunctionReturnType<
  ContractType extends Contract,
  Key extends keyof ContractType['functions'],
  Args extends Parameters<ContractType['functions'][Key]>,
> {
  send: (...args: Args) => Promise<void>;
  state: TransactionStatus;
}

function useContractFunction<
  ContractType extends Contract,
  Key extends keyof ContractType['functions'],
  Args extends Parameters<ContractType['functions'][Key]>,
>(
  contract: ContractType,
  functionName: Key,
): UseContractFunctionReturnType<ContractType, Key, Args> {
  const { send, state } = DappsUseContractFunction(
    contract,
    functionName as string,
  );
  const useSend = (...args: Args) => {
    return send(...args);
  };
  return { send: useSend, state } as UseContractFunctionReturnType<
    ContractType,
    Key,
    Args
  >;
}

export { useContractFunction };
