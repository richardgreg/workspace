import { Batch } from '@popcorn/contracts';
import { BatchType } from '@popcorn/contracts/adapters/HYSIBatchInteraction/HYSIBatchInteractionAdapter';
import { bigNumberToNumber } from '@popcorn/utils';

interface BatchProps {
  batch: Batch;
  index: number;
  claim: (batchId: string) => Promise<void>;
}

const ClaimableBatch: React.FC<BatchProps> = ({ batch, index, claim }) => {
  return (
    <tr
      key={batch.batchId}
      className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {`${bigNumberToNumber(batch.suppliedTokenBalance)} ${
          batch.batchType === BatchType.Mint ? '3CRV' : 'HYSI'
        }`}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {`${bigNumberToNumber(batch.claimableTokenBalance)} ${
          batch.batchType === BatchType.Mint ? 'HYSI' : '3CRV'
        }`}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {batch.claimable ? 'Claimable' : 'Not Claimable'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <a
          href="#"
          className="font-semibold text-indigo-600 hover:text-indigo-900"
          onClick={(e) => claim(batch.batchId)}
        >
          Claim
        </a>
      </td>
    </tr>
  );
};
export default ClaimableBatch;
