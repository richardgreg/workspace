import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const IndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      router.replace(window.location.pathname);
    }
  }, [router.pathname]);

  return (
    <div className="font-landing">
      <div className="hidden lg:flex flex-col w-full h-full">
        <header className="w-full bg-primary">
          <nav className="w-10/12 mx-auto pt-12 pb-4 border-b border-primaryLight flex flex-row items-center justify-between">
            <div>
              <Link href="/" passHref>
                <a>
                  <img
                    src="/images/textLogo.png"
                    alt="Logo"
                    className="h-12"
                  ></img>
                </a>
              </Link>
            </div>
            <div className="space-x-8">
              <Link href="/guide" passHref>
                <a
                  className="font-light text-base hover:text-blue-600"
                  target="_window"
                >
                  Step-by-Step Guide
                </a>
              </Link>
              <Link href="/faq" passHref>
                <a
                  className="font-light text-base hover:text-blue-600"
                  target="_window"
                >
                  Liquidity Bootstrapping FAQ
                </a>
              </Link>
            </div>
          </nav>
        </header>
        <section className="">
          <div
            className="bg-upper-pattern flex-shrink-1 flex-grow-1 w-screen h-auto"
            style={{
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="w-10/12 mx-auto flex flex-col lg:flex-row justify-between pb-10 items-center">
              <div className="w-full pt-100">
                <div>
                  <h1 className="text-center font-normal text-6xl leading-snug mb-2 font-landing -mx-8">
                    POPCORN
                  </h1>
                  <h1 className="text-center font-normal text-6xl leading-snug mb-2 font-landing">
                    Liquidity Bootstrapping Event
                  </h1>
                  <p className="w-3/5 mx-auto text-center text-lg font-landing">
                    The Popcorn LBP Event is a two-day liquidity bootstrapping
                    event for the Popcorn community. This is the first
                    opportunity for the general public to buy POP to participate
                    in the governance of the network. All proceeds will go to
                    the Popcorn Treasury, a smart contract entirely controlled
                    by Popcorn token holders. Please refer to this Step-by-Step
                    Guide on how to safely participate in the LBP and check out
                    the FAQ for more on how LBPs work.
                  </p>
                  <form
                    action="https://network.us1.list-manage.com/subscribe/post?u=5ce5e82d673fd2cfaf12849a5&amp;id=e85a091ed3"
                    method="post"
                    id="mc-embedded-subscribe-form"
                    name="mc-embedded-subscribe-form"
                    className="validate"
                    target="_blank"
                    noValidate
                  >
                    <div
                      id="mc_embed_signup_scroll"
                      className="mx-auto shadow-xl bg-white rounded-xl py-2 px-2 mt-8 w-1/2 flex flex-row items-center justify-between"
                    >
                      <input
                        type="email"
                        name="EMAIL"
                        className="w-10/12 p-2 text-base mx-4 text-gray-900"
                        id="mce-EMAIL"
                        placeholder="Email Address"
                        required
                      />
                      <div
                        style={{ position: 'absolute', left: '-5000px' }}
                        aria-hidden="true"
                      >
                        <input
                          type="text"
                          name="b_5ce5e82d673fd2cfaf12849a5_e85a091ed3"
                          tabIndex={-1}
                        />
                      </div>
                      <div className="clear">
                        <input
                          type="submit"
                          value="Early Access"
                          name="subscribe"
                          id="mc-embedded-subscribe"
                          className="font-medium text-base bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-4 py-2 cursor-pointer"
                          readOnly
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div
            className="bg-lower-pattern flex-shrink-0 flex-grow-0 w-full h-full"
            style={{
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="w-9/12 mx-auto flex flex-col lg:flex-row justify-between  items-center">
              <div className="w-full pt-12 grid grid-cols-2 ">
                <div className="mr-8">
                  <p className="font-bold text-4xl mb-3">About Popcorn</p>
                  <p className="text-md">
                    Radicle is the first open-source, community-led, and
                    self-sustaining network for software collaboration. With
                    Ethereum, Radicle is harnessing the power of Ethereum and
                    DeFi in order to enable developers to truly own their
                    collaboration infrastructure. The network’s code and
                    treasury of assets are publicly managed fully in the open
                    allowing any developer to contribute and influence the
                    direction of the project.
                  </p>
                </div>
                <div className="ml-8">
                  <p className="font-bold text-4xl mb-3">The POP Token</p>
                  <p className="text-md">
                    The POP token (POP) is designed as a governance token that
                    enables a number of Ethereum-based features as well as the
                    communal ownership, collective governance, and long-term
                    sustainability of the Popcorn network. Its holders govern
                    Popcorn’s Ethereum integration, a smart contract system that
                    enables unique global names, decentralized organizations,
                    and experiences that help maintainers sustain their
                    open-source work. Read more about the POP token and Ethereum
                    integration.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-6/12 mx-auto mt-24">
              <p className="font-bold text-4xl mb-3 mx-auto text-center">
                How to participate?
              </p>
              <p className="text-md mx-auto text-center">
                The Radicle network will offer 3.75m Radicle tokens over 48
                hours, from 25.2.2021 ~16:30 UTC till 27.2.2021 ~16:30pm UTC.
                This supply will be available on a RAD/USDC Balancer Liquidity
                Bootstrapping Pool. All proceeds will go to the Radicle
                Treasury, a smart contract entirely controlled by Radicle token
                holders
              </p>
            </div>

            <div
              className="w-8/12 mx-auto mt-12 bg-gray-200 grid grid-cols-5 rounded-2xl"
              style={{ height: 280 }}
            >
              <div className="col-span-1 flex items-stretch">
                <img className="self-end px-8" src="images/blueCat.png"></img>
              </div>
              <div className="col-span-3  my-auto">
                <img
                  src="/images/quotationMark.png"
                  className="mb-4"
                  style={{ width: '71.85', height: '48' }}
                ></img>
                <p className="text-md mx-auto font-bold">
                  The Balancer LBP is not like a regular Balancer pool. The
                  price will start high to disincentivize bots, front-running
                  and speculation. Over time, downwards price pressure will be
                  created by the change of relative weights between the two
                  assets. Only participate if you know what you are doing.
                </p>
              </div>

              <div className="col-span-1 flex items-stretch">
                <img className="self-end px-8" src="images/orangeCat.png"></img>
              </div>
            </div>
          </div>
        </section>
        <section className="grid">
          <div className="flex flex-row mb-10 justify-self-center">
            <p className="mx-4">
              <a href="popcorn.network">popcorn.network</a>
            </p>
            <p className="mx-4">•</p>
            <p className="mx-4">
              <a href="https://discord.gg/w9zeRTSZsq">popcorn.discord</a>
            </p>
            <p className="mx-4">•</p>
            <p className="mx-4">popcorn.community</p>
            <p className="mx-4">•</p>
            <p className="mx-4">
              <a href="https://twitter.com/Popcorn_DAO">@popcorn on twitter</a>
            </p>
          </div>
        </section>
      </div>
      {/* MOBILE VERSION */}
    </div>
  );
};

export default IndexPage;
