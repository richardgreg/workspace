import { useContext, useEffect, useState } from 'react';
import { ContractsContext } from '../../context/Web3/contracts';

import BeneficiaryGrid from 'components/BeneficiaryGrid';
import { BeneficiaryCardProps } from 'interfaces/beneficiaries';

export default function BeneficiaryPageWrapper(): JSX.Element {
  const { contracts } = useContext(ContractsContext);
  const [benefeciaries, setBeneficiaries] = useState<BeneficiaryCardProps[]>([])

  async function getBeneficiaries() {
    const beneficiaryList = await contracts.beneficiary.getBeneficiaryList();
    console.log(beneficiaryList)
    const beneficiaries = await Promise.all(
      beneficiaryList.map(async (address) => {
        return contracts.beneficiary.getBeneficiary(address);
      }),
    );
    const beneficiaryData = await (
      await Promise.all(
        beneficiaries.map(async (ipfsHash) => {
          const url = 'https://gateway.pinata.cloud/ipfs/' + ipfsHash;
          return fetch(url, { method: 'GET' }).then((response) =>
            response.json(),
          );
        }),
      )
    ).map((beneficiaryJson) => {
      const benefificaryCardData: BeneficiaryCardProps = { ...beneficiaryJson };
      return benefificaryCardData;
    });
    setBeneficiaries(beneficiaryData)
  }

  useEffect(() => {
    getBeneficiaries();
  }, [contracts]);

  return <BeneficiaryGrid isProposal={false} />;
}
