import MobileFooter from 'container/MobileFooter';
import MobileHeader from 'container/MobileHeader';
import Link from 'next/link';
import React from 'react';

interface MobileProps {
  showMenu: boolean;
  setMenu: Function;
}

export default function Mobile({
  showMenu,
  setMenu,
}: MobileProps): JSX.Element {
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
    <div className="w-full h-full md:hidden lg:hidden xl:hidden 2xl:hidden">
      <MobileHeader showMenu={showMenu} setMenu={setMenu} />
      <section>
        <div className="relative -mt-1">
          <div className="absolute inset-x-0 bottom-0 h-1/2" />
          <div className="w-full h-auto">
            <div className="bg-primary">
              <div className="flex flex-row">
                <div className="relative w-full mx-auto flex flex-col lg:flex-row justify-between items-center">
                  <h1 className="text-center font-bold text-4xl mb-2 font-landing pt-12 w-10/12">
                    Token Launch FAQ
                  </h1>
                  <div className="w-10/12">
                    <p className="mx-auto text-base text-center font-landing mb-10">
                      <span translate="no">Popcorn</span> Token Launch Auction
                      Details:
                    </p>

                    <p className="mx-auto text-center text-base font-landing">
                      <span className="font-bold">POP Tokens Offered</span>:
                      3,750,000
                    </p>
                    <p className="mx-auto text-center text-base font-landing">
                      <span className="font-bold">Networks</span>: Ethereum,
                      Polygon &amp; Arbitrum
                    </p>
                    <p className="mx-auto text-center text-base font-landing mt-2 mb-10">
                      {startDate} ~{startTime} UTC until {endDate} ~{endTime}{' '}
                      UTC
                    </p>
                    <p className="mx-auto text-base font-landing mb-5">
                      The auction will take place on{' '}
                      <Link href="https://copperlaunch.com" passHref>
                        <a className="text-blue-600 hover:text-blue-700 underline">
                          Copperlaunch.com
                        </a>
                      </Link>
                      , a site for Token Launch Auctions. All proceeds will go to
                      the <span translate="no">Popcorn</span> Treasury, a smart
                      contract entirely controlled by{' '}
                      <span translate="no">Popcorn</span> token holders.
                    </p>

                    <p className="mx-auto text-base font-landing mb-10">
                    The official{' '}
                  <Link href="https://twitter.com/popcorn_dao" passHref>
                    <a className="text-blue-600 hover:text-blue-700 underline" target="_blank">
                      <span translate="no">Popcorn</span> Twitter account
                    </a>
                  </Link>{' '}
                      will tweet the contract address. You can track the status
                      of the TLA event on{' '}
                      <Link href="/faq" passHref>
                        <a className="text-blue-600 hover:text-blue-700 underline">
                          launch.popcorn.network
                        </a>
                      </Link>
                      . Everything else should be considered a scam.
                    </p>
                  </div>
                </div>
              </div>
              <img src="/images/leftcatfaq.svg" className="mx-auto w-1/2" />
            </div>
          </div>
        </div>
      </section>

      <section className="">
        <div className="">
          <div className="">
            <div className="w-10/12 mx-auto my-12">
              <p className="font-bold text-xl mx-auto mb-1">
                What is the purpose of this event?
              </p>
              <p className="text-base mx-auto ">
                This is the first opportunity for the general public to buy POP
                and participate in the governance of the network. The purpose of
                the Token Launch auction is to:
              </p>
              <ul className="list-inside list-disc mt-2 space-y-1">
                <li className="text-base mx-auto ">
                  Distribute governance power to a broader community outside of
                  the core team, advisors, and investors
                </li>
                <li className="text-base mx-auto ">
                  Inject liquidity into the <span translate="no">Popcorn</span>{' '}
                  ecosystem.
                </li>
                <li className="text-base mx-auto ">
                  Allow users to operate keeper nodes in the future when
                  contracts are deployed.
                </li>
                <li className="text-base mx-auto ">
                  Initiate price discovery for POP
                </li>
              </ul>
            </div>

            <div className="w-10/12 mx-auto my-12">
              <p className="font-bold text-xl mx-auto mb-1">
                What is a Token Launch Auction (TLA)?
              </p>
              <p className="text-base mx-auto ">
                Token Launch Auctions (TLAs) are a specific configuration of
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
              <p className="text-base mt-5">
                Their primary use cases are to:
                <ol className="list-decimal list-inside mt-1">
                  <li>Launch and/or distribute ERC-20 tokens</li>
                  <li>
                    Drop collections of ERC-721 NFTs represented by ERC-20
                    tokens
                  </li>
                </ol>
              </p>
              <p className="text-base font-bold mt-5">Key Features:</p>
              <div>
                <ul className="list-inside list-disc text-base mt-1 space-y-2">
                  <li>
                    <span className="font-bold">Price discovery</span>. The
                    price of the token starts high and drops based on a
                    pre-configured price decay curve that can be resisted by
                    buying pressure from auction participants. Anyone can buy
                    into or sell out of the auction freely at any time, so price
                    truly regulates itself.
                  </li>
                  <li>
                    <span className="font-bold">
                      Open and permissionless participation
                    </span>
                    . Freely launch tokens and participate in auctions. No
                    whitelists, hard caps, or listing requirements. There is no
                    minimum or maximum allocation. Auction participants choose
                    how much they want to buy.
                  </li>
                  <li>
                    <span className="font-bold">Fair distribution</span>. TLAs
                    flip the first-come-first-serve launch model on its head and
                    change token launches from being a race where the first bot
                    in or the transaction with the highest gas fee wins. Get
                    your token into the hands of as many people as possible in a
                    fair way that disincentivizes front-runners and whales
                    getting better rates than smaller participants.
                  </li>
                  <li>
                    <span className="font-bold">Capital efficiency</span>. The
                    initial price of the token being auctioned can be magnified
                    by up to 99 times relative to the collateral deposited along
                    with it. Additionally, the collateral can be fully retrieved
                    at the end of the auction unless the auctioned tokens
                    already exist outside of the TLA and someone decides to sell
                    into the auction.
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-10/12 mx-auto my-12">
              <p className="font-bold text-xl mx-auto mb-1">
                Which networks will be supported?
              </p>
              <p className="text-base mx-auto ">
                The Token Launch Auction will be deployed on Ethereum, Arbitrum
                and Polygon. To participate you will need to acquire the native
                token of the chain you wish to participate on (ETH, AETH, and
                MATIC respectively) and USDC to purchase POP.
              </p>
            </div>

            <div className="w-10/12 mx-auto my-12">
              <p className="font-bold text-xl mx-auto mb-1">
                What is a Liquidity Bootstrapping Pool?
              </p>
              <p className="text-base mx-auto ">
                A liquidity bootstrapping pool (used by the Token Launch Auction)
                allows projects to create meaningful liquidity and distribution
                at launch, resulting in a fully customizable token distribution
                mechanic that gives teams and governance token holders control
                and flexibility for the long term.
              </p>
            </div>

            <div className="w-10/12 mx-auto my-12">
              <p className="font-bold text-xl mx-auto mb-1">
                What is Balancer and How Does It Work?
              </p>
              <p className="text-base mx-auto ">
                Balancer is a decentralized exchange platform with deployments
                on Ethereum, Polygon and Arbitrum. It is designed to provide an
                open alternative to swap tokens in a permissionless environment.
              </p>
              <p className="text-base mx-auto mt-4">
                Balancer’s Liquidity Bootstrapping Pool (LBP) is used for
                launching a token with low capital requirements, where a
                two-token pool with the project and collateral token are set up
                with weights that automatically adjust over time. Balancer pools
                allow projects to release a token and build deep liquidity at
                the same time. They apply downward price pressure on the token
                and disincentivize front-running, speculation, and whale buying.
              </p>
              <p className="text-base mx-auto mt-4">
                During the LBP, the price of POP will start high to
                disincentivize bots, front-running, and speculation, then
                automatically decrease over time. You should only participate in
                the LBP if you are familiar with the risks associated with them.
              </p>
              <p className="text-base mx-auto mt-4">
                See Balancer’s Liquidity Bootstrapping Pool FAQ for more
                information.
              </p>
            </div>

            <div className="w-10/12 mx-auto my-12">
              <p className="font-bold text-xl mx-auto mb-1">Why use an LBP?</p>
              <p className="text-base mx-auto ">
                The LBP is advantageous for <span translate="no">Popcorn</span>{' '}
                because it:
              </p>
              <ul className="list-inside list-disc mt-1 space-y-1">
                <li className="text-base mx-auto ">
                  Distributes governance tokens in a fair manner
                </li>
                <li className="text-base mx-auto ">
                  Helps prevent front-running
                </li>
                <li className="text-base mx-auto ">Helps prevent whales</li>
                <li className="text-base mx-auto ">
                  Makes POP open and accessible
                </li>
                <li className="text-base mx-auto ">
                  Balancer pools are secure and battle-tested
                </li>
              </ul>
            </div>

            <div className="w-10/12 mx-auto my-12">
              <p className="font-bold text-xl mx-auto mb-1">
                Where will the proceeds go?
              </p>
              <p className="text-base mx-auto ">
                All proceeds will go to the <span translate="no">Popcorn</span>{' '}
                Treasury, a smart contract entirely controlled by POP token
                holders. Please read the{' '}
                <a
                  href="https://popcorn.network/docs/Popcorn_whitepaper_v1.pdf"
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  White Paper
                </a>{' '}
                on how treasury funds are allocated via governance.
              </p>
            </div>

            <div className="w-10/12 mx-auto my-12">
              <p className="font-bold text-xl mx-auto mb-1">
                What if you want to be part of the community but do not have the
                capital or technical expertise to participate in the LBP?
              </p>
              <p className="text-base mx-auto ">
                There will be other ways to acquire POP tokens in the near
                future, including POP rewards for network contributions and the
                ability to purchase POP on exchanges.
              </p>
            </div>

            <div className="w-10/12 mx-auto my-12">
              <p className="font-bold text-xl mx-auto mb-1">
                If you are going to offer liquidity mining in the future, then
                why should I buy a token now?
              </p>
              <p className="text-base mx-auto ">
              Staking rewards (on Ethereum, Polygon &amp; Arbitrum) will
                  immediately follow the end of the Token Launch Auction in
                  December. The only way to take advantage of the staking
                  rewards and liquidity mining incentives is to have POP tokens.
                  The POP tokenomic model specifies that the greatest amount of
                  staking rewards emitted will be during the first several weeks
                  of the liquidity mining incentives program, therefore the earliest users will have the greatest possible opportunity to earn more POP tokens.
              </p>
       
            </div>

            <div className="w-10/12 mx-auto my-12">
              <p className="font-bold text-xl mx-auto mb-1">
                What is the total supply of POP?
              </p>
              <p className="text-base mx-auto ">
                There is a fixed total supply of 99,999,700 POP. However,
                because of the way the smart contracts have been developed, this
                number is expected to decline over time due to token burning
                associated with keeper incentives.
              </p>
            </div>

            <div className="w-10/12 mx-auto my-12">
              <p className="font-bold text-xl mx-auto mb-1">
                How many tokens are in circulation?
              </p>
              <p className="text-base mx-auto ">
                There are 4,477,900 POP tokens in circulation, including the
                tokens that will become available through the TLA.
              </p>
            </div>

            <div className="w-10/12 mx-auto my-12">
              <p className="font-bold text-xl mx-auto mb-1">
                What are the specifications for the LBP?
              </p>
              <ul className="list-inside list-disc">
                <li className="text-base mx-auto ">
                  Pool tokens: POP and USDC
                </li>
                <li className="text-base mx-auto ">
                  POP start balance: 3,750,000
                </li>
                <li className="text-base mx-auto ">
                  USDC start balance: 1,125,000
                </li>
                <li className="text-base mx-auto ">POP start weight: 99%</li>
                <li className="text-base mx-auto ">POP end weight: 50%</li>
                <li className="text-base mx-auto ">USDC start weight: 1%</li>
                <li className="text-base mx-auto ">USDC end weight: 50%</li>
                <li className="text-base mx-auto ">Duration: 60 hours</li>
              </ul>
            </div>

            <div className="w-10/12 mx-auto my-12">
              <p className="font-bold text-xl mx-auto mb-1">
                What tokens does the pool accept?
              </p>
              <p className="text-base mx-auto ">
                The pool accepts USDC to purchase POP.
              </p>
            </div>

            <div className="w-10/12 mx-auto my-12">
              <p className="font-bold text-xl mx-auto mb-1">
                How is the initial price calculated?
              </p>
              <p className="text-base mx-auto ">
                The price was calculated based on the amounts of tokens in the
                Balancer pool and their weights:
              </p>
              <p className="text-base mx-auto ">
                X POP and Y USDC in weights Z : W = (X*Z)/(Y*W) = 29.7 USDC per
                POP
              </p>
            </div>

            <div className="w-10/12 mx-auto my-12">
              <p className="font-bold text-xl mx-auto mb-1">
                How is the last price calculated?
              </p>
              <p className="text-base mx-auto ">
                In the scenario that there is no demand at all the last price
                given will be:
              </p>
              <p className="text-base mx-auto ">
                X POP and Y USDC with weights 50 : 50 = (X*50)/(Y*50) = 0.3 USDC
                per POP
              </p>

              <p className="text-base mx-auto ">
                You can use the simulation we created with token amounts and
                weights to predict the price as it is difficult to determine the
                last price precisely. Thank you to the Perpetual Protocol team
                for putting together this model!
              </p>
            </div>

            <div className="w-10/12 mx-auto my-12">
              <p className="font-bold text-xl mx-auto mb-1">
                Will the price weights change over time?
              </p>
              <p className="text-base mx-auto ">
                Yes, they will start with the defined weight specification Z : W
                and change linearly over time towards a 50%-50% split after 60
                hours. The graph below visualizes the change:
              </p>
              <img src="images/lbp_weights.png" />
            </div>

            <div className="w-10/12 mx-auto my-12">
              <p className="font-bold text-xl mx-auto mb-1">
                Is there a minimum or maximum to how much I can contribute?
              </p>
              <p className="text-base mx-auto ">
                There are no restrictions on minimum and maximum contribution
                amounts, so you can contribute as much or as little as you want.
              </p>
            </div>

            <div className="w-10/12 mx-auto my-12">
              <p className="font-bold text-xl mx-auto mb-1">
                If there is no maximum, can someone buy all the tokens?
              </p>
              <p className="text-base mx-auto ">
                Yes, however it is extremely unlikely as that would spike the
                price due to slippage and the size of the order. You can read
                more on price impact{' '}
                <a
                  className="text-base text-indigo-600"
                  href="https://research.paradigm.xyz/amm-price-impact"
                >
                  here.
                </a>
              </p>
            </div>

            <div className="w-10/12 mx-auto my-12">
              <p className="font-bold text-xl mx-auto mb-1">
                Who founded <span translate="no">Popcorn</span>?{' '}
              </p>
              <p className="text-base mx-auto ">
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
              <p className="text-base mx-auto mt-2">
                Anthony Martin is an experienced technology leader and
                entrepreneur having worked with several venture-backed start-ups
                and publicly traded companies over the past 12 years. He is the
                author of{' '}
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
              <p className="text-base mx-auto mt-2">
                Michael Kisselgof is a crypto veteran. His previous project
                tokenized IP on Ethereum to fund biotech R&D with IKU and worked
                on the first iterations of erc-1155.
              </p>
            </div>

            <div className="w-10/12 mx-auto my-12">
              <p className="font-bold text-xl mx-auto mb-1">
                Who are the early contributors to{' '}
                <span translate="no">Popcorn</span>?{' '}
              </p>
              <p className="text-base mx-auto ">
                New Form Capital, Kenetic Capital, The LAO, Impossible Finance,
                The Crypto Founders Network, Big Brain Holdings, Hestia Holdings and angels from
                MakerDAO, IBM, NASA, Google and Deloitte to name a few.
              </p>
            </div>

            <div className="w-10/12 mx-auto my-12">
              <p className="font-bold text-xl mx-auto mb-1">How is POP allocated?</p>
              <img src="images/popallocation.png" />
            </div>

            <div className="w-10/12 mx-auto my-12">
              <p className="font-bold text-xl mx-auto mb-1">
                How much did <span translate="no">Popcorn</span> raise in
                previous rounds?
              </p>
              <p className="text-base mx-auto ">
              To date, <span translate="no">Popcorn</span> has raised
                  $3,556,234.44 to support the development of the project, at an
                  average of $0.27 per POP.
              </p>
            </div>

            <div className="w-10/12 mx-auto my-12">
              <p className="font-bold text-xl mx-auto mb-1">
                What is the token allocation and release schedule for supporters
                and team?
              </p>
              <p className="text-base mx-auto ">
                A fixed supply of 100M POP tokens have been minted at genesis
                and will be vested over 5 years.
              </p>
              <img src="https://miro.medium.com/max/4800/1*BVV33YEx7R6M-1K38FvgGw.png" className="mt-2"/>
              <img src="images/releaseschedule.png" />
            </div>

            <div className="w-10/12 mx-auto mt-14">
              <p className="font-bold text-xl mx-auto mb-1">
                Where can I read more about other Liquidity Bootstrapping pools?
              </p>
              <p>
                <a
                  href="https://lbp.radicle.network"
                  className="text-base text-indigo-600"
                >
                  Radicle LBP
                </a>
              </p>
              <p>
                <a
                  href="https://medium.com/perpetual-protocol/why-we-chose-to-distribute-perp-using-a-balancer-liquidity-bootstrapping-pool-aac7f1ab6181"
                  className="text-base text-indigo-600"
                >
                  Perpetual Protocol - Whey we chose to distribute PERP using an
                  LBP
                </a>
              </p>
              <p>
                <a
                  href="https://hydradx.substack.com/p/hydradx-faq"
                  className="text-base  text-indigo-600"
                >
                  Hydradx LBP FAQ
                </a>
              </p>
              <p>
                <a
                  href="https://medium.com/apyfinance/apy-finances-lbp-step-by-step-guide-8a46d9ade88c"
                  className="text-base  text-indigo-600"
                >
                  APY Finance LBP step-by-step guide
                </a>
              </p>
              <p>
                <a
                  href="https://medium.com/apyfinance/apy-finance-tge-on-balancers-lbp-liquidity-bootstrapping-pool-2690dd245a16"
                  className="text-base  text-indigo-600"
                >
                  APY Finance Token Generating Event on Balancer’s LBP
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <MobileFooter />
    </div>
  );
}
