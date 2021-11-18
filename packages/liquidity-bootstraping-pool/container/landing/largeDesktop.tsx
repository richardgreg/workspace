import DesktopFooterNavigation from 'container/DesktopFooterNavigation';
import DesktopNavigation from 'container/DesktopNavigation';
import Link from 'next/link';
import React from 'react';

export default function LargeDesktop(): JSX.Element {
  const startDate = new Date(1638172800000).toLocaleDateString(undefined, {
    timeZone: 'UTC',
  });
  const startTime = new Date(1638172800000).toLocaleTimeString(undefined, {
    timeZone: 'UTC',
  });
  const endDate = new Date(1638172800000 + 216000000).toLocaleDateString(
    undefined,
    { timeZone: 'UTC' },
  );
  const endTime = new Date(1638172800000 + 216000000).toLocaleTimeString(
    undefined,
    { timeZone: 'UTC' },
  );
  return (
    <div className="hidden 2xl:flex flex-col w-full h-full font-landing">
      <div className="flex flex-col w-full h-full">
        <header className="absolute w-full bg-primary top-20 z-20">
          <nav className="w-1/2 mx-auto pb-4 flex flex-row items-center justify-between">
          <DesktopNavigation textSize="xl" />

          </nav>
        </header>

        <section className="-mt-1">
          <div className="w-full">
            <div className="relative">
              <img
                className="w-full object-cover z-0"
                src="images/bgLandingPageUpper.svg"
                alt="Upper background"
              />
              <img
                className="absolute -top-0 left-42 w-3/4 z-10"
                src="images/rocket.svg"
                alt="Cat riding a rocket with orange shooting stars"
              />
              <div className="absolute mx-auto flex flex-col justify-between bottom-0 items-center z-20">
                <div>

                  <h1 className="text-center font-bold text-7xl leading-snug mb-2 font-landing"  translate="no">
                    <span translate="no">Popcorn's</span>{" "} Token Launch Auction
                  </h1>
                  <p className="w-4/12 mx-auto text-center text-2xl leading-10 font-landing mt-6">

                  The <span translate="no">Popcorn</span>{" "} Token Launch Auction (TLA) will be the first opportunity for the
                    general public to join the PopcornDAO by acquiring the POP
                    token. This is a 2.5 day, multi-chain event for the Popcorn
                    community where all proceeds raised will go to the Popcorn
                    Treasury, a smart contract entirely controlled by POP token
                    holders.{ " "}
                    <Link href="/faq">
                      <a className="text-blue-600 hover:text-blue-700 underline">
                        Check out the FAQ
                      </a>
                    </Link>{' '}
                    for more on how the auction works.

                    {/*
                    The <span translate="no">Popcorn</span>{" "} Token Launch Auction (TLA) will be the first opportunity for the
                    general public to join the PopcornDAO by acquiring the POP
                    token. This is a 2.5 day, multi-chain event for the Popcorn
                    community where all proceeds raised will go to the Popcorn
                    Treasury, a smart contract entirely controlled by POP token
                    holders. Please refer to this{' '}
                    <Link href="#">
                      <a className="text-blue-600 hover:text-blue-700 underline">
                        Step-by-Step Guide
                      </a>
                    </Link>{' '}
                    on how to safely participate in the TLA and{' '}
                    <Link href="/faq">
                      <a className="text-blue-600 hover:text-blue-700 underline">
                        check out the FAQ
                      </a>
                    </Link>{' '}
                    for more on how the auction works.
                    */}
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
                      className=" mx-auto shadow-xl bg-white rounded-xl py-4 px-4 mt-20 w-3/12 flex flex-row items-center justify-between"
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
        </section>

        <section>
          <div className="w-1/2 mx-auto flex flex-row justify-between items-center mt-24">
            <div className="w-full pt-12 grid grid-cols-2 ">
              <div className="mr-8">
                <p className="font-bold text-4xl mb-6">What is <span translate="no">Popcorn</span>?{" "}</p>
                <p className="text-xl font-light">
                  <span translate="no">Popcorn</span>{" "} is aiding a revolutionary shift in global systems
                  through accessible DeFi products that align financial
                  wellbeing with positive global impact.
                </p>
                <p className="text-xl mt-4 font-light">
                  In the next months, the roadmap offers multi-chain curated
                  pools of strategies and DeFi products (on Ethereum,
                  Polygon, Fantom, Avalanche, Solana). These products generate
                  high yield while also funding community selected social impact
                  and non-profit organizations without any extra costs to the
                  end user.
                </p>
                <p className="text-xl mt-4 font-light">
                  In 2022, the roadmap includes launching DeFi primitives such
                  as a lending protocol that produces a native decentralized
                  stablecoin which has the extraordinary characteristic of
                  creating impact on a community-wide and global level. How?
                  Just holding it supports non-profits and public goods; that’s
                  something that can’t be said of the dollar or any stablecoin
                  in existence.
                </p>
                <p className="text-xl mt-4 font-light">

                <span translate="no">Popcorn</span>{" "} bakes social and environmental impact into the very foundation of the protocol through its extractive and composable DeFi primitives and products where basis points are used to fund social impact and non-profit organizations.
</p>
<p className="text-xl mt-4 font-light">
Members of the PopcornDAO, or POP token holders, are stewards of <span translate="no">Popcorn</span>{" "} and share the common long-term goal of fueling the growth of the protocol, decentralizing the organization, and nurturing the mission of driving social impact for the public benefit in perpetuity.
</p>

              </div>
              <div className="ml-8">
                <p className="font-bold text-4xl mb-6">The POP Token</p>
                <p className="text-xl font-light">
                  PopcornDAO is a decentralized autonomous organization of
                  members holding the <span translate="no">Popcorn</span>{" "} governance token, POP.
                </p>
                <p className="text-xl mt-4 font-light">
                Tokenholders are eligible to participate in the network by
                  running keeper nodes and voting on proposals that influence
                  the parameters of Popcorn’s smart contracts. Tokenholders also have the ability to vote for non-profits to receive a percentage of protocol fees. Additionally, yield farming and
                  staking incentives will also be available for tokenholders.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="relative">
            <img
              src="images/bgLBPIndexLower.svg"
              className="absolute w-full -top-128 pt-12 z-0"
            ></img>
            <div className="absolute w-full" style={{ top: 250 }}>
              <div className="mx-auto w-full">
                <p className="font-bold text-4xl mb-6 text-center ">
                  Token Launch Auction Details
                </p>
                <div className="w-4/12 mx-auto text-center text-3xl leading-10 font-light mt-6">
                  <p className="text-xl  leading-10">
                    <span className="font-bold">POP Tokens Offered</span>{" "}:
                    3,750,000
                  </p>
                  <p className="text-xl leading-10">
                    <span className="font-bold">When?</span>{" "} {startDate} ~
                    {startTime} UTC until {endDate} ~{endTime} UTC
                  </p>
                  <p className="text-xl leading-10">
                    <span className="font-bold">Where?</span>{" "} POP/USDC{' '}
                    <Link href="https://docs.alchemist.wtf/copper/fair-launch-auctions/what-is-a-fair-launch-auction"  passHref>
                      <a  className="text-blue-600 hover:text-blue-700 underline"  target="_blank">Copper Token Launch Auction Pool</a>
                    </Link>
                  </p>
                  <p className="text-xl leading-10">
                    <span className="font-bold">Networks supported?</span>{" "}{' '}
                    Ethereum and Polygon
                  </p>
                  <p className="text-xl leading-10">
                    For more information please{' '}
                    <Link href="/faq" passHref>
                      <a className="text-blue-600 hover:text-blue-700 underline">
                        see the FAQ
                      </a>
                    </Link>{' '}
                    and the{' '}
                    <Link href="https://medium.com/popcorndao/preparing-for-popcorns-token-launch-on-copper-a-beginner-s-guide-ed1921760ae2" passHref>
                      <a className="text-blue-600 hover:text-blue-700 underline" target="_blank">
                        Step-by-Step Guide
                      </a>
                    </Link>{' '}
                  </p>
                </div>
              </div>
              <div className="bg-gray-100 rounded-2xl flex flex-row w-6/12 mx-auto pt-14 mt-24">
                <div className="w-2/12 relative">
                  <img
                    src="/images/blueCat.png"
                    alt="blueCat"
                    className="absolute bottom-0 left-10"
                  />
                </div>
                <div className="flex flex-col w-8/12">
                  <img
                    src="/images/quotationMark.png"
                    alt="quote"
                    className="w-20 h-14 mb-8"
                  />
                  <p className="text-3xl font-medium leading-10 mb-18">
                    A Token Launch Auction is not like a regular decentralized exchange pool. The
                    price will start high to disincentivize bots, front-running
                    and speculation. Over time, downwards price pressure will be
                    created by the change of relative weights between the two
                    assets. Only participate if you know what you are doing.
                  </p>
                </div>
                <div className="w-2/12 relative">
                  <img
                    src="/images/orangeCat.png"
                    alt="orangeCat"
                    className="absolute bottom-0 right-11"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid z-10 mt-128">
          <div className="flex flex-row mb-10 justify-self-center mt-128">
          <DesktopFooterNavigation/>

          </div>
        </section>
      </div>
    </div>
  );
}
