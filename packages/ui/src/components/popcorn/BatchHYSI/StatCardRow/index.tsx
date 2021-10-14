import { StatCardAndTooltip, StatCardData } from '../StatCardAndTooltip';

interface StatCardRowProps {
  totalBalance: StatCardData;
  HYSI: StatCardData;
  ClaimableHYSI: StatCardData;
  PendingWithdraw: StatCardData;
}

export const StatCardRow: React.FC<StatCardRowProps> = ({
  totalBalance,
  HYSI,
  ClaimableHYSI,
  PendingWithdraw,
}): JSX.Element => {
  return (
    <div className="flex flex-row flex-wrap grid-rows-1">
      <StatCardAndTooltip
        data={totalBalance}
        iconCol={'#4185f2'}
        showChange={false}
        tooltipTitle={'Total Balance'}
        tooltipContent={
          'Total acquisition of deposits, HYSI and pending withdrawls'
        }
      />
      <StatCardAndTooltip
        data={HYSI}
        iconCol={'#646aec'}
        showChange={true}
        tooltipTitle={'HYSI'}
        tooltipContent={'HYSI desc'}
      />
      <StatCardAndTooltip
        data={ClaimableHYSI}
        iconCol={'#f6732b'}
        showChange={false}
        tooltipTitle={'Claimable HYSI'}
        tooltipContent={'Claimable HYSI desc'}
      />
      <StatCardAndTooltip
        data={PendingWithdraw}
        iconCol={'#f39c2b'}
        showChange={false}
        tooltipTitle={'Pending Withdrawls'}
        tooltipContent={'Pending withdrawl desc'}
      />
    </div>
  );
};
