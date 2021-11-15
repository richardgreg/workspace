import Link from 'next/link';

export default function Tablet(): JSX.Element {
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
    <div className="hidden md:flex lg:hidden xl:hidden 2xl:hidden flex-col w-full h-full font-landing">
      {/* NavBar*/}
      <div className="flex flex-col w-full h-full">
        <header className="absolute w-full bg-primary pt-12">
          <nav className="w-9/12 mx-auto pb-4 flex flex-row items-center justify-between">
            <div>
              <Link href="/" passHref>
                <a>
                  <img
                    src="/images/textLogo.png"
                    alt="Logo"
                    className="h-8"
                  ></img>
                </a>
              </Link>
            </div>
            <div className="space-x-8">
              <Link href="/guide" passHref>
                <a
                  className="font-light text-normal hover:text-blue-600"
                  target="_window"
                >
                  Step-by-Step Guide
                </a>
              </Link>
              <Link href="/faq" passHref>
                <a
                  className="font-medium text-normal cursor-default"
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
              className="w-full object-cover z-0 -mt-10"
              src="images/bgUpperFaq.svg"
              alt="Cats playing with popcorn"
            />
            <div className="absolute z-10 top-32 w-full mx-auto flex flex-col pt-8">
              <h1 className="text-center font-normal text-4xl leading-snug mb-4 font-landing">
                Fair Launch FAQ
              </h1>
              <p className="mx-auto text-center text-normal font-landing mb-8">
                <span translate="no">Popcorn</span> Fair Launch Auction Details:
              </p>

              <p className="mx-auto text-center text-normal font-landing font-semibold">
                <span className="font-bold">POP Tokens Offered</span>: 3,750,000
              </p>
              <p className="mx-auto text-center text-normal font-landing font-semibold">
                <span className="font-bold">Networks</span>: Ethereum, Polygon
                &amp; Arbitrum
              </p>
              <p className="w-2/3 mx-auto text-center text-normal font-landing font-semibold mb-4">
                {startDate} ~{startTime} UTC until {endDate} ~{endTime} UTC
              </p>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="grid grid-cols-4 relative">
            <div className="flex flex-col justify-between">
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
            <div className="col-span-2">
              <div className="w-full mx-auto my-14">
                <p className="w-full mx-auto text-normal font-landing mb-4">
                  The auction will take place on{' '}
                  <Link href="https://copperlaunch.com" passHref>
                    <a className="text-blue-600 hover:text-blue-700 underline">
                      Copperlaunch.com
                    </a>
                  </Link>
                  , a site for Fair Launch Auctions. All proceeds will go to the{' '}
                  <span translate="no">Popcorn</span> Treasury, a smart contract
                  entirely controlled by <span translate="no">Popcorn</span>{' '}
                  token holders.
                </p>

                <p className="w-full mx-auto text-normal font-landing mb-4">
                  The official{' '}
                  <Link href="/faq">
                    <a className="text-blue-600 hover:text-blue-700 underline">
                      <span translate="no">Popcorn</span> Twitter account
                    </a>
                  </Link>{' '}
                  will tweet the contract address. You can track the status of
                  the FLA event on{' '}
                  <Link href="/faq" passHref>
                    <a className="text-blue-600 hover:text-blue-700 underline">
                      launch.popcorn.network
                    </a>
                  </Link>
                  . Everything else should be considered a scam.
                </p>
                <p className="font-bold text-3xl mb-5 mx-auto ">
                  What is the purpose of this event?
                </p>
                <p className="text-md mx-auto ">
                  This is the first opportunity for the general public to buy
                  POP and participate in the governance of the network. The
                  purpose of the fair launch auction is to:
                </p>
                <ul className="list-inside list-disc mt-1">
                  <li className="text-md mx-auto ">
                    Distribute governance power to a broader community outside
                    of the core team, advisors, and investors.
                  </li>
                  <li className="text-md mx-auto ">
                    Inject liquidity into the{' '}
                    <span translate="no">Popcorn</span> ecosystem.
                  </li>
                  <li className="text-md mx-auto ">
                    Allow users to operate keeper nodes in the future when
                    contracts are deployed.
                  </li>
                  <li className="text-md mx-auto ">
                    Initiate price discovery for POP
                  </li>
                </ul>
              </div>

              <div className="w-full mx-auto my-14">
                <p className="font-bold text-3xl mb-5 mx-auto ">
                  What is a Fair Launch Auction (FLA)?
                </p>
                <p className="text-md mx-auto ">
                  Fair Launch Auctions (FLAs) are a specific configuration of
                  Balancer’s{' '}
                  <Link
                    href="https://docs.balancer.fi/products/balancer-pools/liquidity-bootstrapping-pools-lbps"
                    passHref
                  >
                    <a
                      className="text-blue-600 hover:text-blue-700 underline"
                      target="_blank"
                    >
                      Liquidity Bootstrapping Pools (LBPs)
                    </a>
                  </Link>
                  .
                </p>
                <p className="text-md mx-auto mt-3">
                  Their primary use cases are to:
                  <ol className="list-decimal list-inside mt-1">
                    <li>Launch and/or distribute ERC-20 tokens</li>
                    <li>
                      Drop collections of ERC-721 NFTs represented by ERC-20
                      tokens
                    </li>
                  </ol>
                </p>
                <p className="text-md font-bold mx-auto mt-5">Key Features:</p>

                <div>
                  <ul className="list-inside list-disc text-md space-y-2 mt-1">
                    <li>
                      <span className="font-bold">Price discovery</span>. The
                      price of the token starts high and drops based on a
                      pre-configured price decay curve that can be resisted by
                      buying pressure from auction participants. Anyone can buy
                      into or sell out of the auction freely at any time, so
                      price truly regulates itself.
                    </li>
                    <li>
                      <span className="font-bold">
                        Open and permissionless participation
                      </span>
                      . Freely launch tokens and participate in auctions. No
                      whitelists, hard caps, or listing requirements. There is
                      no minimum or maximum allocation. Auction participants
                      choose how much they want to buy.
                    </li>
                    <li>
                      <span className="font-bold">Fair distribution</span>. FLAs
                      flip the first-come-first-serve launch model on its head
                      and change token launches from being a race where the
                      first bot in or the transaction with the highest gas fee
                      wins. Get your token into the hands of as many people as
                      possible in a fair way that disincentivizes front-runners
                      and whales getting better rates than smaller participants.
                    </li>
                    <li>
                      <span className="font-bold">Capital efficiency</span>. The
                      initial price of the token being auctioned can be
                      magnified by up to 99 times relative to the collateral
                      deposited along with it. Additionally, the collateral can
                      be fully retrieved at the end of the auction unless the
                      auctioned tokens already exist outside of the FLA and
                      someone decides to sell into the auction.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="w-full mx-auto my-14">
                <p className="font-bold text-3xl mb-5 mx-auto ">
                  Which networks will be supported?
                </p>
                <p className="text-md mx-auto ">
                  The Fair Launch Auction will be deployed on Ethereum, Arbitrum
                  and Polygon. To participate you will need to acquire the
                  native token of the chain you wish to participate on (ETH,
                  AETH, and MATIC respectively) and USDC to purchase POP.
                </p>
              </div>

              <div className="w-full mx-auto my-14">
                <p className="font-bold text-3xl mb-5 mx-auto ">
                  What is a Liquidity Bootstrapping Pool?
                </p>
                <p className="text-md mx-auto ">
                  A liquidity bootstrapping pool (used by the Fair Launch
                  Auction) allows projects to create meaningful liquidity and
                  distribution at launch, resulting in a fully customizable
                  token distribution mechanic that gives teams and governance
                  token holders control and flexibility for the long term.
                </p>
              </div>

              <div className="w-full mx-auto my-14">
                <p className="font-bold text-3xl mb-5 mx-auto ">
                  What is Balancer and How Does It Work?
                </p>
                <p className="text-md mx-auto ">
                  Balancer is a decentralized exchange platform with deployments
                  on Ethereum, Polygon and Arbitrum. It is designed to provide
                  an open alternative to swap tokens in a permissionless
                  environment.
                </p>
                <p className="text-md mx-auto mt-2">
                  Balancer’s Liquidity Bootstrapping Pool (LBP) is used for
                  launching a token with low capital requirements, where a
                  two-token pool with the project and collateral token are set
                  up with weights that automatically adjust over time. Balancer
                  pools allow projects to release a token and build deep
                  liquidity at the same time. They apply downward price pressure
                  on the token and disincentivize front-running, speculation,
                  and whale buying.
                </p>
                <p className="text-md mx-auto mt-2">
                  During the LBP, the price of POP will start high to
                  disincentivize bots, front-running, and speculation, then
                  automatically decrease over time. You should only participate
                  in the LBP if you are familiar with the risks associated with
                  them.
                </p>
                <p className="text-md mx-auto mt-2">
                  See Balancer’s Liquidity Bootstrapping Pool FAQ for more
                  information.
                </p>
              </div>

              <div className="w-full mx-auto my-14">
                <p className="font-bold text-3xl mb-5 mx-auto ">
                  Why use an LBP?
                </p>
                <p className="text-md mx-auto ">
                  The LBP is advantageous for{' '}
                  <span translate="no">Popcorn</span> because it:
                </p>
                <ul className="list-inside list-disc">
                  <li className="text-md mx-auto ">
                    Distributes governance tokens in a fair launch
                  </li>
                  <li className="text-md mx-auto ">
                    Helps prevent front-running
                  </li>
                  <li className="text-md mx-auto ">Helps prevent whales</li>
                  <li className="text-md mx-auto ">
                    Makes POP open and accessible
                  </li>
                  <li className="text-md mx-auto ">
                    Balancer pools are secure and battle-tested
                  </li>
                </ul>
              </div>

              <div className="w-full mx-auto my-14">
                <p className="font-bold text-3xl mb-5 mx-auto ">
                  Where will the proceeds go?
                </p>
                <p className="text-md mx-auto ">
                  All proceeds will go to the{' '}
                  <span translate="no">Popcorn</span> Treasury, a smart contract
                  entirely controlled by POP token holders. Please read the{' '}
                  <a
                    href="https://popcorn.network/docs/Popcorn_whitepaper_v1.pdf"
                    className="text-blue-600 hover:text-blue-700 underline"
                  >
                    White Paper
                  </a>{' '}
                  on how treasury funds are allocated via governance.
                </p>
              </div>

              <div className="w-full mx-auto my-14">
                <p className="font-bold text-3xl mb-5 mx-auto ">
                  What if you want to be part of the community but do not have
                  the capital or technical expertise to participate in the LBP?
                </p>
                <p className="text-md mx-auto ">
                  There will be other ways to acquire POP tokens in the near
                  future, including POP rewards for network contributions and
                  the ability to purchase POP on exchanges.
                </p>
              </div>

              <div className="w-full mx-auto my-14">
                <p className="font-bold text-3xl mb-5 mx-auto ">
                  If you are going to offer liquidity mining in the future, then
                  why should I buy a token now?
                </p>
                <p className="text-md mx-auto ">
                  Staking rewards (on Ethereum, Polygon &amp; Arbitrum) will
                  immediately follow the end of the Fair Launch Auction in
                  December. The only way to take advantage of the staking
                  rewards and liquidity mining incentives is to have POP tokens.
                  The POP tokenomic model specifies that the greatest amount of
                  staking rewards emitted will be during the first several weeks
                  of the liquidity mining incentives program.
                </p>
                <p className="text-md mx-auto mt-2">
                  Additionally, participating in yield farming requires time,
                  capital, and an APY that economically justifies the amount of
                  gas you will spend in farming and harvesting your POP rewards.
                  The LBP comparatively provides a quick and easy way to acquire
                  POP and immediately become a member of the PopcornDAO.
                </p>
              </div>

              <div className="w-full mx-auto my-14">
                <p className="font-bold text-3xl mb-5 mx-auto ">
                  What is the total supply of POP?
                </p>
                <p className="text-md mx-auto ">
                  There is a fixed total supply of 99,999,700 POP. However,
                  because of the way the smart contracts have been developed,
                  this number is expected to decline over time due to token
                  burning associated with keeper incentives.
                </p>
              </div>

              <div className="w-full mx-auto my-14">
                <p className="font-bold text-3xl mb-5 mx-auto ">
                  How many tokens are in circulation?
                </p>
                <p className="text-md mx-auto ">
                  There are 4,477,900 POP tokens in circulation, including the
                  tokens that will become available through the FLA.
                </p>
              </div>

              <div className="w-full mx-auto my-14">
                <p className="font-bold text-3xl mb-5 mx-auto ">
                  What are the specifications for the LBP?
                </p>
                <ul className="list-inside list-disc">
                  <li className="text-md mx-auto ">
                    Pool tokens: POP and USDC
                  </li>
                  <li className="text-md mx-auto ">POP start balance: 3,750,000</li>
                  <li className="text-md mx-auto ">USDC start balance: 1,125,000</li>
                  <li className="text-md mx-auto ">POP start weight: 99%</li>
                  <li className="text-md mx-auto ">POP end weight: 50%</li>
                  <li className="text-md mx-auto ">USDC start weight: 1%</li>
                  <li className="text-md mx-auto ">USDC end weight: 50%</li>
                  <li className="text-md mx-auto ">Duration: 60 Hours</li>
                </ul>
              </div>

              <div className="w-full mx-auto my-14">
                <p className="font-bold text-3xl mb-5 mx-auto ">
                  What tokens does the pool accept?
                </p>
                <p className="text-md mx-auto ">
                  The pool accepts USDC to purchase POP.
                </p>
              </div>

              <div className="w-full mx-auto my-14">
                <p className="font-bold text-3xl mb-5 mx-auto ">
                  How was the initial price calculated?
                </p>
                <p className="text-md mx-auto ">
                  The price was calculated based on the amounts of tokens in the
                  Balancer pool and their weights: X POP and Y USDC in weights Z : W = (X*Z)/(Y*W) = 29.7 USDC
                  per POP
                </p>
              </div>

              <div className="w-full mx-auto my-14">
                <p className="font-bold text-3xl mb-5 mx-auto ">
                  How is the last price calculated?
                </p>
                <p className="text-md mx-auto ">
                  In the scenario that there is no demand at all the last price
                  given will be:
                </p>
                <p className="text-md mx-auto ">
                  X POP and Y USDC with weights 50 : 50 = (X*50)/(Y*50) = 0.3
                  USDC per POP
                </p>

                <p className="text-md mx-auto mt-2">
                  You can use the simulation we created with token amounts and
                  weights to predict the price as it is difficult to determine
                  the last price precisely. Thank you to the Perpetual Protocol
                  team for putting together this model!
                </p>
              </div>

              <div className="w-full mx-auto my-14">
                <p className="font-bold text-3xl mb-5 mx-auto ">
                  Will the price weights change over time?
                </p>
                <p className="text-md mx-auto ">
                  Yes, they will start with the defined weight specification Z :
                  W and change linearly over time towards a 50%-50% split after
                  48 hours. The graph below visualizes the change:
                </p>
                <img src="images/lbpweights.png" />
              </div>

              <div className="w-full mx-auto my-14">
                <p className="font-bold text-3xl mb-5 mx-auto ">
                  Is there a minimum or maximum to how much I can contribute?
                </p>
                <p className="text-md mx-auto ">
                  There are no restrictions on minimum and maximum contribution
                  amounts, so you can contribute as much or as little as you
                  want.
                </p>
              </div>

              <div className="w-full mx-auto my-14">
                <p className="font-bold text-3xl mb-5 mx-auto ">
                  If there is no maximum, can someone buy all the tokens?
                </p>
                <p className="text-md mx-auto ">
                  Yes, however it is extremely unlikely as that would spike the
                  price due to slippage and the size of the order. You can read
                  more on price impact{' '}
                  <a
                    className="text-md text-indigo-600"
                    href="https://research.paradigm.xyz/amm-price-impact"
                  >
                    here.
                  </a>
                </p>
              </div>

              <div className="w-full mx-auto my-14">
                <p className="font-bold text-3xl mb-5 mx-auto ">
                  Who founded <span translate="no">Popcorn</span>?{' '}
                </p>
                <p className="text-md mx-auto ">
                  <span translate="no">Popcorn</span> was founded by{' '}
                  <Link href="https://linkedin.com/in/admartin" passHref>
                    <a
                      target="_blank"
                      className="text-blue-600 hover:text-blue-700 underline"
                    >
                      Anthony D. Martin
                    </a>
                  </Link>{' '}
                  and{' '}
                  <Link
                    href="https://www.linkedin.com/in/michael-kisselgof-8932a38/"
                    passHref
                  >
                    <a
                      target="_blank"
                      className="text-blue-600 hover:text-blue-700 underline"
                    >
                      Michael Kisselgof
                    </a>
                  </Link>{' '}
                  in early 2021.
                </p>
                <p className="text-md mx-auto mt-2">
                  Anthony Martin is an experienced technology leader and
                  entrepreneur having worked with several venture-backed
                  start-ups and publicly traded companies over the past 12
                  years. He is the author of{' '}
                  <Link href="https://github.com/anthonymartin" passHref>
                    <a
                      target="_blank"
                      className="text-blue-600 hover:text-blue-700 underline"
                    >
                      several open source projects
                    </a>
                  </Link>{' '}
                  and has worked in the blockchain industry since 2017.
                </p>
                <p className="text-md mx-auto mt-2">
                  Michael Kisselgof is a crypto veteran. His previous project
                  tokenized IP on Ethereum to fund biotech R&D with IKU and
                  worked on the first iterations of erc-1155.
                </p>
              </div>

              <div className="w-full mx-auto my-14">
                <p className="font-bold text-3xl mb-5 mx-auto ">
                  Who are the early contributors to{' '}
                  <span translate="no">Popcorn</span>?{' '}
                </p>
                <p className="text-md mx-auto ">
                  New Form Capital, Kenetic Capital, The LAO, Impossible
                  Finance, The Crypto Founders Network, Hestia Holdings and
                  angels from MakerDAO, IBM, NASA, Google and Deloitte to name a
                  few.
                </p>
              </div>

              <div className="w-full mx-auto my-14">
                <p className="font-bold text-3xl mb-5 mx-auto ">
                  How is POP allocated?
                </p>
                <img src="images/popallocation.png" />
              </div>

              <div className="w-full mx-auto my-14">
                <p className="font-bold text-3xl mb-5 mx-auto ">
                  How much did <span translate="no">Popcorn</span> raise in
                  previous rounds?
                </p>
                <p className="text-md mx-auto">
                  To date, <span translate="no">Popcorn</span> has raised
                  $3,056,234.44 to support the development of the project, at an
                  average of $0.223 per POP.
                </p>
              </div>

              <div className="w-full mx-auto my-14">
                <p className="font-bold text-3xl mb-5 mx-auto ">
                  What is the token allocation and release schedule for
                  supporters and team?
                </p>
                <img src="https://miro.medium.com/max/1400/0*-ZshbjUeI9JdOihS" />
                <img src="images/releaseschedule.png" />
              </div>

              <div className="w-full mx-auto my-14">
                <p className="font-bold text-3xl mb-5 mx-auto ">
                  Where can I read more about other Liquidity Bootstrapping
                  pools?
                </p>
                <div className="z-20 relative">
                  <p>
                    <a
                      href="https://lbp.radicle.network"
                      className="text-md text-indigo-600"
                    >
                      Radicle LBP
                    </a>
                  </p>
                  <p>
                    <a
                      href="https://medium.com/perpetual-protocol/why-we-chose-to-distribute-perp-using-a-balancer-liquidity-bootstrapping-pool-aac7f1ab6181"
                      className="text-md text-indigo-600"
                    >
                      Perpetual Protocol - Whey we chose to distribute PERP
                      using an LBP
                    </a>
                  </p>
                  <p>
                    <a
                      href="https://hydradx.substack.com/p/hydradx-faq"
                      className="text-md  text-indigo-600"
                    >
                      Hydradx LBP FAQ
                    </a>
                  </p>
                  <p>
                    <a
                      href="https://medium.com/apyfinance/apy-finances-lbp-step-by-step-guide-8a46d9ade88c"
                      className="text-md  text-indigo-600"
                    >
                      APY Finance LBP step-by-step guide
                    </a>
                  </p>
                  <p>
                    <a
                      href="https://medium.com/apyfinance/apy-finance-tge-on-balancers-lbp-liquidity-bootstrapping-pool-2690dd245a16"
                      className="text-md  text-indigo-600"
                    >
                      APY Finance Token Generating Event on Balancer’s LBP
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between z-10">
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
            <img
              src="/images/Illustration_ Shooting star.svg"
              className="absolute z-0 -bottom-24 transform rotate-12 w-1/2 right-40"
            />
          </div>
        </section>

        <section className="grid">
          <div className="flex flex-row mb-10 justify-self-center">
            <p className="mx-4">
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
