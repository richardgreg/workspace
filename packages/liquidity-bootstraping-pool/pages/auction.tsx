import { Web3Provider } from '@ethersproject/providers';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';
import React, { useEffect, useState } from 'react';
import { connectors } from 'context/Web3/connectors';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { ethers } from 'ethers';

enum Step {
  Wallet,
  Terms,
  Network,
}

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
  const [step, setStep] = useState<Step>(Step.Wallet);
  let supabase;

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      router.replace(window.location.pathname);
    }
    try {
      supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_KEY,
      );
    } catch (error) {
      console.log(error);
    }
  }, [router.pathname]);

  useEffect(() => {
    if (account) {
      setStep(Step.Terms);
    }
  }, [account]);

  async function acceptConditions() {
    const timestamp = Date.now();
    const message = await library
      .getSigner()
      .signMessage(
        `By signing this message, I agree to the conditions. Time: ${timestamp}`,
      );
    if (message) {
      setStep(Step.Network);
      try {
        await supabase.from('signedTerms').insert([
          {
            address: account,
            signature: message,
            timestamp: timestamp,
          },
        ]);
        return true;
      } catch (error) {
        console.log('error', error);
        return false;
      }
    }
  }

  const titleText = () => {
    switch (step) {
      case Step.Wallet:
        return 'Step 1: Connect your Wallet';
      case Step.Terms:
        return 'Step 2: Accept Terms and Conditions';
      case Step.Network:
        return 'Step 3: Choose a Network for the Token Launch Auction';
    }
  };

  return (
    <div className="font-landing bg-primaryLight w-screen h-screen">
      <div className="pt-12">
        <img src="/images/textLogo.png" className="h-12 mx-auto" />
      </div>
      <div className="w-11/12 md:max-w-xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl px-12 mx-auto mt-24 md:mt-48 h-88">
          <div className="py-14">
            <h2 className="text-2xl font-medium text-center mx-auto">
              {titleText()}
            </h2>
            {step === Step.Wallet && (
              <div className="flex flex-col items-center">
                <p className="mt-8 md:mx-18 text-center">
                  Connect your Wallet to continue.
                </p>
                <button
                  className="font-medium text-base bg-blue-600 hover:bg-blue-500 text-white rounded-full px-10 py-2 mt-8 cursor-pointer"
                  onClick={() => activate(connectors.Injected)}
                >
                  Connect
                </button>
              </div>
            )}
            {step === Step.Terms && (
              <div className="flex flex-col items-center">
                <p className="mt-8 md:mx-18 text-center">
                  First, accept Terms and conditions Privacy Policy through
                  Metamask by clicking the approve button below.
                </p>
                <button
                  className="font-medium text-base bg-blue-600 hover:bg-blue-500 text-white rounded-full px-10 py-2 mt-8 cursor-pointer"
                  onClick={acceptConditions}
                >
                  Accept
                </button>
              </div>
            )}
            {step === Step.Network && (
              <div className="mt-8 flex flex-row items-center justify-center space-x-8">
                <Link href="https://copperlaunch.com/auctions/0xc79b9b75cd0e9567a000eeb8f6e46b3d074ac38c">
                  <div>
                    <div className="flex w-32 h-32 border-2 border-gray-300 rounded-lg items-center justify-center flex-shrink-0 cursor-pointer hover:bg-blue-50 hover:border-blue-500">
                      <img src="/images/ethLogo.svg" className="w-20 h-20" />
                    </div>
                    <p className="text-sm text-gray-500 text-center mt-1">
                      Ethereum
                    </p>
                  </div>
                </Link>
                <Link href="https://polygon.copperlaunch.com/auctions/0x6d68d7b0ca469bd1171f81a895e649d86d523c20">
                  <div>
                    <div className="flex w-32 h-32 border-2 border-gray-300 rounded-lg items-center justify-center flex-shrink-0 cursor-pointer hover:bg-blue-50 hover:border-blue-500">
                      <img
                        src="/images/polygonLogo.svg"
                        className="w-20 h-20"
                      />
                    </div>
                    <p className="text-sm text-gray-500 text-center mt-1">
                      Polygon
                    </p>
                  </div>
                </Link>
              </div>
            )}
            <Link href="https://launch.popcorn.network/" passHref>
              <a target="_blank">
                <p className="text-sm font-medium text-blue-700 pt-10 text-center cursor-pointer">
                  Learn about our Token Launch Auction
                </p>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
