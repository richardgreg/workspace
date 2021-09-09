import { SVGProps } from 'react';

export interface Contract {
  address: string;
  name: string;
}

export interface ContractEmissions {
  contractAddress: string;
  transactionGroups: TransactionGroup[];
}

export interface EmissionEstimate {
  emissionsKGpEth: number;
  date: Date;
  timestamp: number;
}

export interface StatCardData {
  change: string;
  changeType: 'increase' | 'decrease';
  icon: (
    props: React.ComponentProps<'svg'>,
  ) => JSX.Element | SVGProps<SVGSVGElement>;
  id: number;
  name: string;
  stat: number;
}

export interface Transaction {
  blockHash: string;
  blockNumber: string;
  confirmations: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  from: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  hash: string;
  input: string;
  isError: string;
  nonce: string;
  to: string;
  transactionIndex: string;
  txreceipt_status: string;
  timeStamp: string;
  value: string;
  emissions?: number;
}
export interface TransactionGroup {
  averageGasPrice: number;
  blockStartDate: string;
  co2Emissions: number;
  endBlock: number;
  gasUsed: number;
  numTransactions: number;
  startBlock: number;
}

export interface DateTimePickerProps {
  updateDates: (startDate: Date, endDate: Date) => void;
  endDate: Date;
  startDate: Date;
}

export interface CalendarInputProps {
  label: string;
  defaultDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  isStartInput?: Boolean;
  onChange?: (selectedDate: Date) => void;
}
