import { ChartData } from '../AreaChart';
import { ChartContainer } from '../ChartContainer';
import { StatCardData } from '../StatCardAndTooltip';
import { StatCardRow } from '../StatCardRow';

interface StatCardRowProps {
  totalBalance: StatCardData;
  HYSI: StatCardData;
  ClaimableHYSI: StatCardData;
  PendingWithdraw: StatCardData;
  chartData: ChartData[];
}

export const LeftColumn: React.FC<StatCardRowProps> = ({
  totalBalance,
  HYSI,
  ClaimableHYSI,
  PendingWithdraw,
  chartData,
}) => {
  return (
    <div className="px-6 lg:pl-12  w-full col-span-2  flex flex-col">
      <StatCardRow
        totalBalance={totalBalance}
        HYSI={HYSI}
        ClaimableHYSI={ClaimableHYSI}
        PendingWithdraw={PendingWithdraw}
      />
      <ChartContainer chartData={chartData} />
    </div>
  );
};
