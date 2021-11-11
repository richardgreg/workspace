import Link from 'next/link';
import { useEffect } from 'react';



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
      {/* NavBar*/}
      <div className="flex flex-col w-full h-full">
        <header className="absolute w-full bg-primary top-20 z-10">
          <nav className="w-1/2 mx-auto pb-4 flex flex-row items-center justify-between">
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
                  className="font-light text-xl hover:text-blue-600"
                  target="_window"
                >
                  Step-by-Step Guide
                </a>
              </Link>
              <Link href="/faq" passHref>
                <a
                  className="font-medium text-xl cursor-default"
                  target="_window"
                >
                 Fair Launch FAQ
                </a>
              </Link>
            </div>
          </nav>
        </header>

        {/* Header image and background text */}
        <section className="-mt-1">
          <div className="w-full">
            <img
              className="w-full object-cover z-0 -mt-129"
              src="images/bgUpperFaq.svg"
              alt="Upper background"
            />
            <div className="absolute z-10 top-32 w-full mx-auto flex flex-col pb-20 pt-32">
                <h1 className="text-center font-light text-7xl leading-10 font-landing">
                  Fair Launch FAQ
                </h1>
                <p className="text-center text-3xl font-landing leading-10 font-light mt-14">
                  <span translate="no">Popcorn</span>{" "} Fair Launch Auction Details:
                </p>

                <p className="text-center text-2xl font-landing leading-10  font-medium mt-14">
                  POP Tokens Offered: 3,750,000
                </p>
                <p className="text-center text-2xl leading-10 font-landing">
                  When? {startDate} ~{startTime} UTC until {endDate} ~
                    {endTime} UTC
                </p>
            </div>
          </div>
        </section>

        <section>
          <div className="grid grid-cols-4 relative">
            <div className="flex flex-row justify-start">
              <div className="flex flex-col justify-between w-2/3">
                <img src="images/faqpopcorn.svg" className=""></img>
                <img
                  className=""
                  src="images/Illustration_ Popcorn flying Right.svg"
                ></img>
                <div></div>
                <img
                  className="transform rotate-180"
                  src="images/Illustration_ Popcorn flying Right.svg"
                ></img>
              </div>
            </div>
            <div className="col-span-2">
              <div className="w-full mx-auto my-20">
                <p className="w-full mx-auto text-center text-2xl font-landing leading-10  font-light mt-18">
                The auction will take place on Balancer, a decentralized exchange where the POP token will be offered in a Liquidity Bootstrapping Pool. All proceeds will go to the <span translate="no">Popcorn</span>{" "} Treasury, a smart contract entirely controlled by <span translate="no">Popcorn</span>{" "} token holders. The intention is to bootstrap liquidity on decentralized exchanges through a fair launch mechanism.
                </p>

                <p className="w-full mx-auto text-center text-2xl font-landing leading-10 font-light my-18">
                The official  <Link href="/faq">
                      <a className="text-blue-600 hover:text-blue-700 underline">
                      <span translate="no">Popcorn</span>{" "} Twitter account
                      </a>
                    </Link> will tweet the contract address. You can track the status of the LBP event on <Link href="/faq" passHref>
                      <a className="text-blue-600 hover:text-blue-700 underline">
                        lbp.popcorn.network
                      </a>
                    </Link>. Everything else should be considered a scam. Please make sure the Balancer address is the same as the contract address when proceeding.
                </p>
                <p className="font-medium text-5xl mb-4 mx-auto ">
                  What is the purpose of this event?
                </p>
                <p className="text-2xl mx-auto font-light leading-10 ">
                  This is the first opportunity for the general public to buy
                  $POP and participate in the governance of the network. The
                  purpose of this liquidity bootstrapping pool is to:
                </p>
                <ul className="list-inside list-disc">
                  <li className="text-2xl mx-auto font-light leading-10 ">
                    Distribute governance power to a broader community outside
                    of the core team, advisors, and investors
                  </li>
                  <li className="text-2xl mx-auto font-light leading-10 ">
                    Inject liquidity into the <span translate="no">Popcorn</span>{" "} ecosystem
                  </li>
                  <li className="text-2xl mx-auto font-light leading-10 ">
                    Initiate price discovery for $POP
                  </li>
                </ul>
              </div>

              <div className="w-full mx-auto my-20">
                <p className="font-medium text-5xl mb-4 mx-auto ">
                  What is a Liquidity Bootstrapping Pool?
                </p>
                <p className="text-2xl mx-auto font-light leading-10 ">
                  A liquidity bootstrapping pool allows projects to create
                  meaningful liquidity and distribution at launch, resulting in
                  a fully customizable token distribution mechanic that gives
                  teams and governance token holders control and flexibility for
                  the long term.
                </p>
              </div>

              <div className="w-full mx-auto my-20">
                <p className="font-medium text-5xl mb-4 mx-auto ">
                  What is Balancer and How Does It Work?
                </p>
                <p className="text-2xl mx-auto font-light leading-10 ">
                  Balancer is a decentralized exchange platform built on
                  Ethereum that is designed to provide an open alternative to
                  swap tokens in a permissionless environment. Users can also
                  use Balancer to create liquidity pools that can be used to
                  generate yield on trades.
                </p>
                <p className="text-2xl mx-auto font-light leading-10 ">
                  Balancer’s Liquidity Bootstrapping Pool (LBP) is a method used
                  for launching a token with low capital requirements, where a
                  two-token pool with the project and collateral token are set
                  up with weights that automatically adjust over time. Balancer
                  pools allow projects to release a token and build deep
                  liquidity at the same time. They apply downward price pressure
                  on the token and disincentivize front-running, speculation,
                  and whale buying.
                </p>
                <p className="text-2xl mx-auto font-light leading-10 ">
                  During the LBP, the price of $POP will start high to
                  disincentivize bots, front-running, and speculation, then
                  automatically decrease over time. Early investors and team
                  members that currently hold $POP have their tokens locked up
                  and will not be able to dump them during the event. You’re
                  advised to only participate in the LBP if you are familiar
                  with the risks associated with them.
                </p>
                <p className="text-2xl mx-auto font-light leading-10 ">
                  See Balancer’s Liquidity Bootstrapping Pool FAQ for more
                  information.
                </p>
              </div>

              <div className="w-full mx-auto my-20">
                <p className="font-medium text-5xl mb-4 mx-auto ">
                  Why are we using an LBP?
                </p>
                <p className="text-2xl mx-auto font-light leading-10 ">
                  The LBP is advantageous for <span translate="no">Popcorn</span>{" "} because it:
                </p>
                <ul className="list-inside list-disc">
                  <li className="text-2xl mx-auto font-light leading-10 ">
                    Distributes governance tokens in a fair launch
                  </li>
                  <li className="text-2xl mx-auto font-light leading-10 ">
                    Helps prevent front-running
                  </li>
                  <li className="text-2xl mx-auto font-light leading-10 ">
                    Helps prevent whales
                  </li>
                  <li className="text-2xl mx-auto font-light leading-10 ">
                    Makes $POP open and accessible
                  </li>
                </ul>
              </div>

              <div className="w-full mx-auto my-20">
                <p className="font-medium text-5xl mb-4 mx-auto ">
                  Where will the proceeds go?
                </p>
                <p className="text-2xl mx-auto font-light leading-10 ">
                  All proceeds will go to the <span translate="no">Popcorn</span>{" "} Treasury, a smart contract
                  entirely controlled by $POP token holders. Please read the{' '}
                  <a
                    href="https://popcorn.network/docs/Popcorn_whitepaper_v1.pdf"
                    className="text-xl text-indigo-600"
                  >
                    White Paper
                  </a>{' '}
                  on how treasury funds are allocated via governance.
                </p>
              </div>

              <div className="w-full mx-auto my-20">
                <p className="font-medium text-5xl mb-4 mx-auto ">
                  What if you want to be part of the community but do not have
                  the capital or technical expertise to participate in the LBP?
                </p>
                <p className="text-2xl mx-auto font-light leading-10 ">
                  There will be other ways to acquire $POP tokens in the near
                  future, including $POP rewards for network contributions and
                  the ability to purchase $POP on exchanges.
                </p>
              </div>

              <div className="w-full mx-auto my-20">
                <p className="font-medium text-5xl mb-4 mx-auto ">
                  If you are going to offer liquidity mining in the future, then
                  why should I buy a token now?
                </p>
                <p className="text-2xl mx-auto font-light leading-10 ">
                  Participating in yield farming requires time, capital, and an
                  APY that economically justifies the amount of gas you will
                  spend in farming and harvesting your $POP rewards. The LBP
                  comparatively provides a quick and easy way for you to acquire
                  $POP and immediately become a member of the PopcornDAO.
                </p>
              </div>

              <div className="w-full mx-auto my-20">
                <p className="font-medium text-5xl mb-4 mx-auto ">
                  What is the total supply of $POP?
                </p>
                <p className="text-2xl mx-auto font-light leading-10 ">
                  There is a fixed total supply of 100M $POP.
                </p>
              </div>

              <div className="w-full mx-auto my-20">
                <p className="font-medium text-5xl mb-4 mx-auto ">
                  How many tokens are in circulation?
                </p>
                <p className="text-2xl mx-auto font-light leading-10 ">
                  There are 5,500,000 $POP tokens in circulation, including the
                  tokens made available in the LBP.
                </p>
              </div>

              <div className="w-full mx-auto my-20">
                <p className="font-medium text-5xl mb-4 mx-auto ">
                  What are the specifications for the LBP?
                </p>
                <ul className="list-inside list-disc">
                  <li className="text-2xl mx-auto font-light leading-10 ">
                    Pool tokens: $POP and USDC
                  </li>
                  <li className="text-2xl mx-auto font-light leading-10 ">
                    $POP start balance: ____
                  </li>
                  <li className="text-2xl mx-auto font-light leading-10 ">
                    USDC start balance: ____
                  </li>
                  <li className="text-2xl mx-auto font-light leading-10 ">
                    $POP start weight: _____
                  </li>
                  <li className="text-2xl mx-auto font-light leading-10 ">
                    $POP end weight: _____
                  </li>
                  <li className="text-2xl mx-auto font-light leading-10 ">
                    USDC start weight: ____
                  </li>
                  <li className="text-2xl mx-auto font-light leading-10 ">
                    USDC end weight: ____
                  </li>
                  <li className="text-2xl mx-auto font-light leading-10 ">
                    Swap fee: ______
                  </li>
                  <li className="text-2xl mx-auto font-light leading-10 ">
                    Duration: 2 days
                  </li>
                </ul>
              </div>

              <div className="w-full mx-auto my-20">
                <p className="font-medium text-5xl mb-4 mx-auto ">
                  What tokens does the pool accept?
                </p>
                <p className="text-2xl mx-auto font-light leading-10 ">
                  The pool accepts swapping $POP for any token available on
                  Balancer, however, it will be cheapest to swap $POP for USDC.
                </p>
              </div>

              <div className="w-full mx-auto my-20">
                <p className="font-medium text-5xl mb-4 mx-auto ">
                  How was the initial price calculated?
                </p>
                <p className="text-2xl mx-auto font-light leading-10 ">
                  The price was calculated based on the amounts of tokens in the
                  Balancer pool and their weights:
                </p>
                <p className="text-2xl mx-auto font-light leading-10 ">
                  X $POP and Y USDC in weights Z : W = (X*Z)/(Y*W) = _____ USDC
                  per $POP
                </p>
              </div>

              <div className="w-full mx-auto my-20">
                <p className="font-medium text-5xl mb-4 mx-auto ">
                  How is the last price calculated?
                </p>
                <p className="text-2xl mx-auto font-light leading-10 ">
                  In the scenario that there is no demand at all the last price
                  given will be:
                </p>
                <p className="text-2xl mx-auto font-light leading-10 ">
                  X $POP and Y USDC with weights 50 : 50 = (X*50)/(Y*50) = ____
                  USDC per $POP
                </p>

                <p className="text-2xl mx-auto font-light leading-10 ">
                  You can use the simulation we created with token amounts and
                  weights to predict the price as it is difficult to determine
                  the last price precisely. Thank you to the Perpetual Protocol
                  team for putting together this model!
                </p>
              </div>

              <div className="w-full mx-auto my-20">
                <p className="font-medium text-5xl mb-4 mx-auto ">
                  Will the price weights change over time?
                </p>
                <p className="text-2xl mx-auto font-light leading-10 ">
                  Yes, they will start with the defined weight specification Z :
                  W and change linearly over time towards a 50%-50% split after
                  48 hours. The graph below visualizes the change:
                </p>
                <img src="images/lbpweights.png" />
              </div>

              <div className="w-full mx-auto my-20">
                <p className="font-medium text-5xl mb-4 mx-auto ">
                  Is there a minimum or maximum to how much I can contribute?
                </p>
                <p className="text-2xl mx-auto font-light leading-10 ">
                  LBPs do not have restrictions on minimum and maximum
                  contribution amounts, so you can contribute as much or as
                  little as you want.
                </p>
              </div>

              <div className="w-full mx-auto my-20">
                <p className="font-medium text-5xl mb-4 mx-auto ">
                  If there is no maximum, can someone buy all the tokens?
                </p>
                <p className="text-2xl mx-auto font-light leading-10 ">
                  Yes, however it is extremely unlikely as that would spike the
                  price due to slippage and the size of the order. You can read
                  more on price impact{' '}
                  <a
                    className="text-xl text-indigo-600"
                    href="https://research.paradigm.xyz/amm-price-impact"
                  >
                    here.
                  </a>
                </p>
              </div>

              <div className="w-full mx-auto my-20">
                <p className="font-medium text-5xl mb-4 mx-auto ">
                  Who founded <span translate="no">Popcorn</span>?{" "}
                </p>
                <p className="text-2xl mx-auto font-light leading-10 ">
                  <span translate="no">Popcorn</span>{" "} was founded by Anthony D Martin and Michael Kisselgof
                  in January 2021.
                </p>
                <p className="text-2xl mx-auto font-light leading-10 ">
                  Anthony is an experienced leader in technology companies from
                  seed to public.
                </p>
                <p className="text-2xl mx-auto font-light leading-10 ">
                  Michael is a crypto veteran. His previous project tokenized IP
                  on Ethereum to fund biotech R&D with IKU and worked on the
                  first iterations of erc-1155.
                </p>
              </div>

              <div className="w-full mx-auto my-20">
                <p className="font-medium text-5xl mb-4 mx-auto ">
                  Who are the early contributors to <span translate="no">Popcorn</span>?{" "}
                </p>
                <p className="text-2xl mx-auto font-light leading-10 ">
                  New Form Capital, Kinetic Capital, Sarson Funds, The Crypto
                  Founders Network, Hestia VC…..
                </p>
              </div>

              <div className="w-full mx-auto my-20">
                <p className="font-medium text-5xl mb-4 mx-auto ">
                  How is $POP allocated?
                </p>
                <img src="images/popallocation.png" />
              </div>

              <div className="w-full mx-auto my-20">
                <p className="font-medium text-5xl mb-4 mx-auto ">
                  How much did <span translate="no">Popcorn</span>{" "} raise in previous rounds?
                </p>
                <p className="text-2xl mx-auto font-light leading-10 ">
                  The Private Sale and Presale raised the following:
                </p>
                <ul className="list-inside list-disc">
                  <li className="text-2xl mx-auto font-light leading-10 ">
                    Private Sale: $1,459,675.44
                  </li>
                  <li className="text-2xl mx-auto font-light leading-10 ">
                    Pre-sale: $2,400,000
                  </li>
                </ul>
              </div>

              <div className="w-full mx-auto my-20">
                <p className="font-medium text-5xl mb-4 mx-auto ">
                  What is the token allocation and release schedule for
                  supporters and team?
                </p>
                <p className="text-2xl mx-auto font-light leading-10 ">
                  A fixed supply of 100M $POP tokens have been minted at genesis
                  and will be vested over 5 years.
                </p>
                <ul className="list-inside list-disc z-10">
                  <li className="text-2xl mx-auto font-light leading-10 ">
                    $POP Ecosystem 55.2% - Offered in Liquidity Mining. See
                    Token Economics
                  </li>
                  <li className="text-2xl mx-auto font-light leading-10 ">
                    Early Contributors 18.8% - 1 year lock-up, 3 month vesting
                  </li>
                  <li className="text-2xl mx-auto font-light leading-10 ">
                    Team 12.0% - 1 year lock-up, 1 - 4 year linear vesting
                  </li>
                  <li className="text-2xl mx-auto font-light leading-10 ">
                    Foundation 5.0% - N/A
                  </li>
                  <li className="text-2xl mx-auto font-light leading-10 ">
                    LBP 5.0% - No Vesting
                  </li>
                  <li className="text-2xl mx-auto font-light leading-10 ">
                    Partners/Advisors 2.0% - 6 month lock-up, 10% at cliff, 1
                    year linear vesting
                  </li>
                  <li className="text-2xl mx-auto font-light leading-10 ">
                    Airdrop 2.0% - Variable
                  </li>
                  <img
                    src="images/releaseschedule.png"
                    className="relative z-10"
                  />
                </ul>
              </div>

              <div className="w-full mx-auto my-20 relative">
                <p className="font-medium text-5xl mb-4 mx-auto ">
                  Where can I read more about other Liquidity Bootstrapping
                  pools?
                </p>
                <div className="z-20 relative">
                  <p>
                    <a
                      href="https://medium.com/perpetual-protocol/why-we-chose-to-distribute-perp-using-a-balancer-liquidity-bootstrapping-pool-aac7f1ab6181"
                      className="text-xl text-indigo-600"
                    >
                      Perpetual Protocol - Whey we chose to distribute PERP
                      using an LBP
                    </a>
                  </p>
                  <p>
                    <a
                      href="https://hydradx.substack.com/p/hydradx-faq"
                      className="text-xl  text-indigo-600"
                    >
                      Hydradx LBP FAQ
                    </a>
                  </p>
                  <p>
                    <a
                      href="https://medium.com/apyfinance/apy-finances-lbp-step-by-step-guide-8a46d9ade88c"
                      className="text-xl  text-indigo-600"
                    >
                      APY Finance LBP step-by-step guide
                    </a>
                  </p>
                  <p>
                    <a
                      href="https://medium.com/apyfinance/apy-finance-tge-on-balancers-lbp-liquidity-bootstrapping-pool-2690dd245a16"
                      className="text-xl z-20 text-indigo-600"
                    >
                      APY Finance Token Generating Event on Balancer’s LBP
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-end">
              <div className="flex flex-col justify-between w-2/3">
                <img
                  className=""
                  src="images/Illustration_ Popcorn flying Right.svg"
                ></img>
                <img
                  src="images/faqpopcorn.svg"
                  className=""
                  style={{ transform: 'scale(-1, 1)' }}
                ></img>
                <div></div>
                <img
                  className=""
                  src="images/Illustration_ Popcorn flying Right.svg"
                ></img>
              </div>
            </div>
            <img
              src="/images/Illustration_ Shooting star.svg"
              className="absolute z-0 transform rotate-12 w-5/12 right-84"
            />
          </div>
        </section>

        <section className="grid mx-auto">
          <div className="flex flex-row my-10">
            <p className="">
              <a href="https://popcorn.network">popcorn.network</a>
            </p>
            <p className="mx-4">•</p>
            <p className="mx-4">
              <a href="https://discord.gg/w9zeRTSZsq">discord</a>
            </p>
            <p className="mx-4">•</p>
            <p className="mx-4">
              <a href="https://forum.popcorn.network/">popcorn.community</a>
            </p>
            <p className="mx-4">•</p>
            <p className="mx-4">
              <a href="https://twitter.com/Popcorn_DAO">@popcorn on twitter</a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
