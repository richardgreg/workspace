import { StatCard, StatCardData } from '../StatCard';

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
      <StatCard data={totalBalance} iconCol={'#4185f2'} showChange={false} />
      <StatCard data={HYSI} iconCol={'#646aec'} showChange={true} />
      <StatCard data={ClaimableHYSI} iconCol={'#f6732b'} showChange={false} />
      <StatCard data={PendingWithdraw} iconCol={'#f39c2b'} showChange={false} />
    </div>
  );
};
