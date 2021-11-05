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
    <div>
      {/* Desktop */}
      <div className="hidden lg:flex flex-col w-full h-full font-landing">
        <div className="flex flex-col w-full h-full">
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

          <section>
            <div className="w-full h-auto">
              <div className="">
                <div className="relative">
                  <img
                    className="h-full w-full object-cover z-0"
                    src="images/bgLbpIndexUpper.svg"
                    alt="Upper background"
                  />
                  <img
                    className="absolute -top-24 -left-12 w-3/4 z-40"
                    src="images/rocket.svg"
                    alt="Cat riding a rocket with orange shooting stars"
                  />
                  <div
                    style={{ top: 300 }}
                    className="absolute   mx-auto flex flex-col justify-between pb-10 items-center"
                  >
                    <div>
                      <h1 className="text-center font-normal text-6xl leading-snug mb-2 font-landing">
                        POPCORN
                      </h1>
                      <h1 className="text-center font-normal text-6xl leading-snug mb-2 font-landing">
                        Liquidity Bootstrapping Event
                      </h1>
                      <p className="w-3/5 mx-auto text-center text-lg font-landing mt-6">
                        You ready to POP? The Popcorn LBP will be the first
                        opportunity for the general public to join the
                        PopcornDAO by acquiring the $POP token. This is a
                        two-day event for the Popcorn community where all
                        proceeds raised will go to the Popcorn Treasury, a smart
                        contract entirely controlled by $POP token holders.
                      </p>
                      <form
                        action="https://network.us1.list-manage.com/subscribe/post?u=5ce5e82d673fd2cfaf12849a5&amp;id=e85a091ed3"
                        method="post"
                        id="mc-embedded-subscribe-form"
                        name="mc-embedded-subscribe-form"
                        className="validate "
                        target="_blank"
                        noValidate
                      >
                        <div
                          id="mc_embed_signup_scroll"
                          className=" mx-auto shadow-xl bg-white rounded-xl py-2 px-2 mt-20 w-1/2 flex flex-row items-center justify-between"
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
                  <img
                    className="absolute -bottom-10 right-0 w-3/12 z-50"
                    src="images/jumpingCat.svg"
                    alt="Jumping Cat"
                  />
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="w-9/12 mx-auto flex flex-col lg:flex-row justify-between  items-center">
              <div className="w-full pt-12 grid grid-cols-2 ">
                <div className="mr-8">
                  <p className="font-bold text-4xl mb-3">What is Popcorn?</p>
                  <p className="text-md">
                    Popcorn bakes social good into the very foundation of the
                    protocol by creating novel, yield-generating DeFi products,
                    where a small fee is charged which is later allocated to
                    non-profits. Members of the PopcornDAO, or $POP token
                    holders, are stewards of Popcorn and share the common goal
                    of fueling the growth of the protocol, decentralizing the
                    organization, and nurturing the mission of driving social
                    impact for the public benefit in perpetuity.
                  </p>
                </div>
                <div className="ml-8">
                  <p className="font-bold text-4xl mb-3">The POP Token</p>
                  <p className="text-md">
                    PopcornDAO is a decentralized autonomous organization of
                    members holding the Popcorn governance token $POP. Token
                    holders are able to vote on proposals that influence the
                    parameters of Popcorn’s smart contracts. Yield farming and
                    staking incentives are also made available to token holders
                    to further increase their yield.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="pb-20 relative">
              <img
                src="images/bgLbpIndexlower.svg"
                className="absolute w-full"
                style={{ top: -260 }}
              ></img>
              <div className="absolute" style={{ top: 160 }}>
                <div className=" mx-auto w-1/2">
                  <p className="font-bold text-4xl mb-3 text-center">
                    LBP Details
                  </p>
                  <ul className="list-inside list-disc">
                  <li className="text-md mx-auto ">
                  $POP Tokens Offered: 5,000,000
                  </li>
                  <li className="text-md mx-auto ">
                  When? November 26, 2021 16:30 UTC till November 28, 2021 ~16:30pm UTC
                  </li>
                  <li className="text-md mx-auto ">
                  Where? POP/USDC Balancer Liquidity Bootstrapping Pool
                  </li>
                </ul>
                  <p>All proceeds will go to the Popcorn Treasury, a smart contract entirely controlled by $POP token holders.</p>
                  <p>For more information please see the FAQ</p>
                </div>
                

                <div
                  className=" w-8/12 mx-auto mt-12 bg-gray-200 grid grid-cols-5 z-10"
                  style={{ height: 280, top: 300, borderRadius: 40 }}
                >
                  <div className="col-span-1 flex items-stretch">
                    <img
                      className="self-end px-8"
                      src="images/blueCat.png"
                    ></img>
                  </div>
                  <div className="col-span-3  my-auto">
                    <img
                      src="/images/quotationMark.png"
                      className="mb-4"
                      style={{ width: '71.85', height: '48' }}
                    ></img>
                    <p className="text-md mx-auto font-bold">
                      The Balancer LBP is not like a regular Balancer pool. The
                      price will start high to disincentivize bots,
                      front-running and speculation. Over time, downwards price
                      pressure will be created by the change of relative weights
                      between the two assets. Only participate if you know what
                      you are doing.
                    </p>
                  </div>

                  <div className="col-span-1 flex items-stretch">
                    <img
                      className="self-end px-8 "
                      src="images/orangeCat.png"
                    ></img>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="grid" style={{ marginTop: 600 }}>
            <div className="flex flex-row mb-10 justify-self-center">
              <p className="mx-4">
                <a href="https://popcorn.network">popcorn.network</a>
              </p>
              <p className="mx-4">•</p>
              <p className="mx-4">
                <a href="https://discord.gg/w9zeRTSZsq">popcorn.discord</a>
              </p>
              <p className="mx-4">•</p>
              <p className="mx-4">popcorn.community</p>
              <p className="mx-4">•</p>
              <p className="mx-4">
                <a href="https://twitter.com/Popcorn_DAO">
                  @popcorn on twitter
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
      {/* MOBILE VERSION */}
      <div className="w-full h-full lg:hidden">
        <div className="flex flex-col w-full h-full">
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

          <section>
            <div className="w-full h-auto">
              <div className="">
                <div className="relative">
                  <div className="absolute inset-0">
                    <img
                      className="w-full h-auto object-cover z-0"
                      src="images/bgLbpIndexUpper.svg"
                      alt="Upper background"
                    />
                  </div>
                  <img
                    className="relative w-3/4 "
                    src="images/rocket.svg"
                    alt="Cat riding a rocket with orange shooting stars"
                  />
                  <div className="absolute -bottom-24 mx-auto flex flex-col justify-between pb-10 items-center">
                    <div>
                      <h1 className="text-center font-bold text-xl leading-snug mb-2 font-landing">
                        POPCORN
                      </h1>
                      <h1 className="text-center font-bold text-xl leading-snug mb-2 font-landing">
                        Liquidity Bootstrapping Event
                      </h1>
                      <p className="w-3/5 mx-auto text-center text-md font-landing mt-6">
                        The Popcorn LBP Event is a two-day liquidity
                        bootstrapping event for the Popcorn community. This is
                        the first opportunity for the general public to buy POP
                        to participate in the governance of the network. All
                        proceeds will go to the Popcorn Treasury, a smart
                        contract entirely controlled by Popcorn token holders.
                        Please refer to this Step-by-Step Guide on how to safely
                        participate in the LBP and check out the FAQ for more on
                        how LBPs work.
                      </p>
                      <form
                        action="https://network.us1.list-manage.com/subscribe/post?u=5ce5e82d673fd2cfaf12849a5&amp;id=e85a091ed3"
                        method="post"
                        id="mc-embedded-subscribe-form"
                        name="mc-embedded-subscribe-form"
                        className="validate "
                        target="_blank"
                        noValidate
                      >
                        <div
                          id="mc_embed_signup_scroll"
                          className=" mx-auto shadow-xl bg-white rounded-xl py-2 px-2 w-1/2 flex flex-row items-center justify-between"
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
            </div>
          </section>
          <section>
            <img
              className="w-3/12 z-50 mx-auto mt-12"
              src="images/jumpingCat.svg"
              alt="Jumping Cat"
            />
          </section>
          <section>
            <div className="w-9/12 mx-auto flex flex-col lg:flex-row justify-between  items-center">
              <div className="mx-8 mb-4">
                <p className="font-bold text-xl mb-3">About Popcorn</p>
                <p className="text-md">
                  Radicle is the first open-source, community-led, and
                  self-sustaining network for software collaboration. With
                  Ethereum, Radicle is harnessing the power of Ethereum and DeFi
                  in order to enable developers to truly own their collaboration
                  infrastructure. The network’s code and treasury of assets are
                  publicly managed fully in the open allowing any developer to
                  contribute and influence the direction of the project.
                </p>
              </div>
              <div className="mx-8">
                <p className="font-bold text-xl mb-3">The POP Token</p>
                <p className="text-md">
                  The POP token (POP) is designed as a governance token that
                  enables a number of Ethereum-based features as well as the
                  communal ownership, collective governance, and long-term
                  sustainability of the Popcorn network. Its holders govern
                  Popcorn’s Ethereum integration, a smart contract system that
                  enables unique global names, decentralized organizations, and
                  experiences that help maintainers sustain their open-source
                  work. Read more about the POP token and Ethereum integration.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="pb-20 relative pb-20">
              <img
                src="images/bgLbpIndexlower.svg"
                className="absolute w-full"
                style={{ top: -138 }}
              ></img>
              <div className="absolute top-10">
                <div className=" mx-auto w-1/2">
                  <p className="font-bold text-xl mb-3 text-center">
                    How to participate?
                  </p>
                  <p className="text-md text-center">
                    The Radicle network will offer 3.75m Radicle tokens over 48
                    hours, from 25.2.2021 ~16:30 UTC till 27.2.2021 ~16:30pm
                    UTC. This supply will be available on a RAD/USDC Balancer
                    Liquidity Bootstrapping Pool. All proceeds will go to the
                    Radicle Treasury, a smart contract entirely controlled by
                    Radicle token holders
                  </p>
                  <div
                    className="w-8/12 mx-auto mt-12 bg-gray-200 grid grid-cols-4"
                    style={{ height: 280, top: 300, borderRadius: 40 }}
                  >
                    <div className="col-span-1 flex items-stretch">
                      <img
                        className="self-end px-8"
                        src="images/blueCat.png"
                      ></img>
                    </div>
                    <div className="col-span-2 my-auto">
                      <img
                        src="/images/quotationMark.png"
                        className="mb-4 h-8 w-12"
                      ></img>
                      <p className="text-md mx-auto font-bold">
                        The Balancer LBP is not like a regular Balancer pool.
                        The price will start high to disincentivize bots,
                        front-running and speculation. Over time, downwards
                        price pressure will be created by the change of relative
                        weights between the two assets. Only participate if you
                        know what you are doing.
                      </p>
                    </div>

                    <div className="col-span-1 flex items-stretch">
                      <img
                        className="self-end px-8 "
                        src="images/orangeCat.png"
                      ></img>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="grid">
            <div className="flex flex-row mb-10 justify-self-center">
              <p className="mx-4">
                <a href="https://popcorn.network">popcorn.network</a>
              </p>
              <p className="mx-4">•</p>
              <p className="mx-4">
                <a href="https://discord.gg/w9zeRTSZsq">popcorn.discord</a>
              </p>
              <p className="mx-4">•</p>
              <p className="mx-4">popcorn.community</p>
              <p className="mx-4">•</p>
              <p className="mx-4">
                <a href="https://twitter.com/Popcorn_DAO">
                  @popcorn on twitter
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
