import React from 'react';
import { UpdateState } from 'use-local-storage-state/src/useLocalStorageStateBase';
import IpfsUpload from './IpfsUpload';

interface IRProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  impactReports: string[];
  setImpactReports: UpdateState<string[]>;
  setStepLimit: React.Dispatch<React.SetStateAction<number>>;
  visible: boolean;
}

export default function AdditionalImages({
  currentStep,
  setCurrentStep,
  impactReports,
  setImpactReports,
  setStepLimit,
  visible
}: IRProps): JSX.Element {
  if (visible) {
    return (
      <IpfsUpload
        stepName={'8 - Upload Impact Reports'}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        localStorageFile={impactReports}
        setLocalStorage={setImpactReports}
        imageDescription={'Impact Reports'}
        imageInstructions={
          'Impact report uploads are limited to up to a maximum of four PDFs, each with a maximum size of 5mb.'
        }
        fileType={'.pdf'}
        numMaxFiles={4}
        setStepLimit={setStepLimit}
      />
    );
  } else {
    return <></>;
  }
}
