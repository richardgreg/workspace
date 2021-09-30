import { Transaction } from '@popcorn/ui/interfaces/emissions-dashboard';
import * as convert from 'convert-units';

export const getMassUnitForTxns = (transactions: Transaction[]) => {
  const totalEmissions = transactions.reduce((acc, cur) => {
    return acc + cur.emissions; // what is emssions == 0? this will error
  }, 0);
  const meanEmissions =
    totalEmissions === 0 ? 0 : totalEmissions / transactions.length;
  const emissionsConverted = convert(meanEmissions).from('mcg').toBest();
  return emissionsConverted.unit;
};
