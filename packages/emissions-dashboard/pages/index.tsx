import { InfuraProvider } from '@ethersproject/providers';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const IndexPage = () => {
  const router = useRouter();
  const [provider, setProvider] = useState<InfuraProvider>();
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      router.replace(window.location.pathname);
    }
  }, [router.pathname]);

  const initializeProvider = async () => {
    console.log('Setting up Infura provider...');
    const provider = new InfuraProvider('homestead', {
      projectId: process.env.INFURA_PROJECT_ID,
      projectSecret: process.env.INFURA_PROJECT_SECRET,
    });
    setProvider(provider);
  };

  useEffect(() => {
    initializeProvider();
  }, []);

  return (
    <div
      className="w-full h-screen flex flex-col justify-center font-landing"
      style={{ backgroundColor: '#F8F8FB' }}
    >
      <div className="flex-row w-full h-5/6">
        <div className="w-1/2 h-full">
          <div className="flex flex-col justify-between ml-24 md:w-8/12 2xl:mx-auto xl:w-1/2 h-full">
            Smart Contract Carbon Emissions Dashboard
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
