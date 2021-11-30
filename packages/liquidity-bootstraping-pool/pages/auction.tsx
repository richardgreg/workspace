import { Web3Provider } from '@ethersproject/providers';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';
import React, { useEffect, useState } from 'react';
import { connectors } from 'context/Web3/connectors';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

enum Step {
  Wallet,
  Terms,
  Network,
  NeedsWallet,
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

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      router.replace(window.location.pathname);
    }
  }, [router.pathname]);

  useEffect(() => {
    if (window && !window.ethereum) {
      setStep(Step.NeedsWallet);
    }
  }, []);

  const getSupabase = () => {
    let supabase;
    try {
      supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_KEY,
      );
    } catch (error) {
      console.log(error);
    }
    return supabase;
  };

  useEffect(() => {
    if (account) {
      setStep(Step.Terms);
    }
  }, [account]);

  async function acceptConditions() {
    const timestamp = Date.now();
    const message = await library.getSigner().signMessage(getTerms(timestamp));
    if (message) {
      setStep(Step.Network);
      try {
        await getSupabase()
          ?.from('signedTerms')
          .insert([
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
      case Step.NeedsWallet:
        return 'Wallet Required!';
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
            {step === Step.NeedsWallet && (
              <div className="flex flex-col items-center">
                <p className="mt-8 md:mx-18 text-center">
                  To view this page, you must have a wallet extension (like
                  Metamask) installed on your browser.
                </p>
              </div>
            )}
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
                  Please sign Terms and Conditions by clicking the button below.{' '}
                  <span className="italic">
                    Signing the message is free, no transaction fee is incurred.
                  </span>
                </p>
                <button
                  className="font-medium text-base bg-blue-600 hover:bg-blue-500 text-white rounded-full px-10 py-2 mt-8 cursor-pointer"
                  onClick={acceptConditions}
                >
                  Show Terms and Conditions
                </button>
              </div>
            )}
            {step === Step.Network && (
              <div className="mt-8 flex flex-row items-center justify-center space-x-8">
                <Link
                  href="https://copperlaunch.com/auctions/0xc79b9b75cd0e9567a000eeb8f6e46b3d074ac38c"
                  passHref
                >
                  <a target="_blank">
                    <div>
                      <div className="flex w-32 h-32 border-2 border-gray-300 rounded-lg items-center justify-center flex-shrink-0 cursor-pointer hover:bg-blue-50 hover:border-blue-500">
                        <img src="/images/ethLogo.svg" className="w-20 h-20" />
                      </div>
                      <p className="text-sm text-gray-500 text-center mt-1">
                        Ethereum
                      </p>
                    </div>
                  </a>
                </Link>
                <Link href="https://polygon.copperlaunch.com/auctions/0x6d68d7b0ca469bd1171f81a895e649d86d523c20">
                  <a target="_blank">
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
                  </a>
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

const getTerms = (timestamp) => {
  return `
  Popcorn Token Launch Auction Terms and Conditions

  By signing this message related to the Popcorn Token Launch Auction ("Popcorn Token Launch Auction"), you represent and warrant to Popcorn Limited ("Popcorn Ltd") that you have read and agreed to the terms and conditions as follows:
  
  1. you are not a citizen or resident of a country the laws of which prohibit or conflict with the holding, sale, or trading of tokens; such countries to include (without limitation) THE UNITED STATES OF AMERICA, ITS TERRITORIES AND POSSESSIONS, ANY STATE OF THE UNITED STATES, AND THE DISTRICT OF COLUMBIA ("U.S."), CANADA, PEOPLE'S REPUBLIC OF CHINA, DEMOCRATIC PEOPLE'S REPUBLIC OF KOREA, CUBA, SYRIA, IRAN, SUDAN, PEOPLE'S REPUBLIC OF CRIMEA;
  2. you agree and acknowledge that nothing in the Popcorn Token Launch Auction constitutes a prospectus or offer document of any sort nor is intended to constitute an offer of securities of any form, units in a business trust, units in a collective investment scheme, or any other form of capital markets product or investment in any jurisdiction, nor a solicitation for any form of investment;
  3. you agree and acknowledge that no regulatory authority has examined or approved the information set out in the Popcorn Token Launch Auction and the publication, distribution, or dissemination of information under the Popcorn Token Launch Auction does not imply to you that the applicable laws, regulatory requirements, or rules have been complied with;
  4. your access to, or use of, the Popcorn Token Launch Auction and the holding of POP tokens by you is not prohibited or restricted by any applicable laws, regulations, or rules in any jurisdiction to which you are subject, and where any restrictions are applicable, you have observed and complied with all such restrictions at your own expense and without liability to Popcorn Ltd;
  5. you agree and acknowledge that Popcorn Ltd shall not be liable for any direct, indirect, special, incidental, consequential, or other losses of any kind (including but not limited to loss of revenue, income or profits, and loss of use or data), in tort (including negligence), contract or otherwise, arising out of or in connection with you accessing or using the Popcorn Token Launch Auction;
  6. you waive the right to participate in a class-action lawsuit or a class-wide arbitration against Popcorn Ltd, any person involved in the Popcorn Token Launch Auction and/or with the creation and distribution of the POP tokens;
  7. you are not a U.S. Person as defined in Regulation S under the Securities Act of 1933, as amended, which means that you are not a natural person resident in the United States of America, its territories and possessions, any State of the United States, and the District Of Columbia ("U.S."), an entity incorporated under the laws of the U.S., an estate/trust where the executor/administrator/trustee is a U.S. Person or a non-discretionary account held for a U.S. Person, an agency or branch of a foreign entity located in the U.S., or an entity incorporated outside the U.S. but formed by a U.S. Person principally for the purposes of investing in unregistered securities under the Securities Act (unless incorporated and owned by accredited investors who are not natural persons, estates or trusts), and you acknowledge, agree and represent as follows:
      - any offer, sale, and trade of the POP tokens is being made in an offshore transaction, which means that the transaction was not effected in the U.S.;
      - no directed selling efforts were made in the United States, which means that no marketing efforts were made to you in the U.S.;
      - you are not acquiring POP tokens for the account or benefit of any U.S. Person; and
      - you agree not to offer or sell the POP tokens (or create or maintain any derivative position equivalent thereto) in the U.S., to or for the account or benefit of a U.S. Person;
  8. you have sufficient funds to fulfill the obligations of Popcorn Ltd within the Popcorn Token Launch Auction and are not bankrupt or insolvent;
  9. you are acquiring POP tokens as principal and for your own benefit and you are not acting on the instructions of, or as nominee or agent for or on behalf of, any other person;
  10. the POP tokens to be delivered to and received by you will not be used for any purpose in connection with money laundering, terrorism financing, or any other acts in breach or contravention of any applicable law, regulation, or rule;
  11. you bear the sole responsibility to determine what tax implications your use of the Popcorn Token Launch Auction may have for you; and
  12. you understand the POP governance token is currently used to create and vote on proposals which affect the parameters of smart contracts on multiple public blockchains. The user interfaces to participate in the governance processes can be found at https://client.aragon.org/#/popcorn and https://snapshot.org/#/popcorn-snapshot.eth. Additionally, more user interfaces and smart contracts which depend on the POP token can be found at https://github.com/popcorndao/workspace along with instructions on how to deploy such user interfaces and application programming interfaces; and
  13. all of the above representations and warranties are and will continue to be, true, complete, accurate, and non-misleading from the time of your acceptance of this attestation and notwithstanding the receipt by you of any POP tokens.
  
  Accepted: ${timestamp}
  `;
};

export default IndexPage;
