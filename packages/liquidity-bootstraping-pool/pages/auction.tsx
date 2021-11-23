import { Web3Provider } from '@ethersproject/providers';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';
import React, { useEffect, useState } from 'react';
import { connectors } from 'context/Web3/connectors';
import Link from 'next/link';

const IndexPage = () => {
  const router = useRouter();
  const context = useWeb3React<Web3Provider>();
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = context;
  const [accepted, accept] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      router.replace(window.location.pathname);
    }
  }, [router.pathname]);

  async function acceptConditions() {
    const message = await library
      .getSigner()
      .signMessage('By signing this message, I agree to the conditions');
    if (message) {
      accept(true);
    }
  }

  return (
    <div className="font-landing bg-primaryLight w-screen h-screen">
      <div className="pt-12">
        <img src="/images/textLogo.png" className="h-12 mx-auto" />
      </div>
      <div className="w-11/12 md:max-w-xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl px-12 mx-auto mt-24 md:mt-48 h-80">
          <div className="py-14">
            <h2 className="text-2xl font-medium text-center mx-auto">
              Choose a Network for the Token Sale
            </h2>
            {accepted ? (
              <div className="mt-8 flex flex-row items-center justify-center space-x-8">
                <Link href="#">
                  <div className="flex w-32 h-32 border-2 border-gray-300 rounded-lg items-center justify-center flex-shrink-0 cursor-pointer hover:bg-blue-50 hover:border-blue-500">
                    <img src="/images/ethLogo.svg" className="w-20 h-20" />
                  </div>
                </Link>
                <Link href="#">
                  <div className="flex w-32 h-32 border-2 border-gray-300 rounded-lg items-center justify-center flex-shrink-0 cursor-pointer hover:bg-blue-50 hover:border-blue-500">
                    <img src="/images/polygonLogo.svg" className="w-20 h-20" />
                  </div>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <p className="mt-8 md:mx-18 text-center">
                  First, accept Terms and conditions Privacy Policy through
                  Metamask by clicking the approve button below.
                </p>
                {account ? (
                  <button
                    className="font-medium text-base bg-blue-600 hover:bg-blue-500 text-white rounded-full px-10 py-2 mt-8 cursor-pointer"
                    onClick={acceptConditions}
                  >
                    Accept
                  </button>
                ) : (
                  <button
                    className="font-medium text-base bg-blue-600 hover:bg-blue-500 text-white rounded-full px-10 py-2 mt-8 cursor-pointer"
                    onClick={() => activate(connectors.Injected)}
                  >
                    Connect
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
