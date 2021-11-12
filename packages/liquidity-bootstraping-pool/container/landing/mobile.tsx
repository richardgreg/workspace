import Link from 'next/link';
import * as Icon from 'react-feather';

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
      {showMenu && (
        <div className="fixed bg-primaryLight border-b border-gray-500 z-10 mx-auto w-full flex flex-row justify-between px-8 py-8">
          <div className="flex flex-col space-y-4">
          <Link href="/guide" passHref>
                <a
                  className="font-light text-normal cursor-pointer hover:text-blue-600"
                  target="_window"
                >
                  Step-by-Step Guide
                </a>
              </Link>
              <Link href="/faq" passHref>
                <a
                  className="font-light text-normal cursor-pointer hover:text-blue-600"
                  target="_window"
                >
                 Fair Launch FAQ
                </a>
              </Link>
              <Link
                href="https://medium.com/popcorndao/pop-token-economics-5a580f0bf712"
                passHref
              >
                <a
                  className="font-light text-normal cursor-pointer hover:text-blue-600"
                  target="_window"
                >
                  Tokenomics
                </a>
              </Link>
          </div>
          <Icon.X onClick={() => setMenu(false)} />
        </div>
      )}
      <div className="flex flex-col w-full h-full">
        <header className="w-full bg-primary">
          <nav className="w-10/12 mx-auto pt-4 pb-4 border-b border-primaryLight flex flex-row items-center justify-between">
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
            <Icon.Menu onClick={() => setMenu(true)} />
          </nav>
        </header>

        <section className="-mt-1">
          <div className="w-full h-auto">
            <div className="">
              <div className="relative">
                <div className="absolute inset-0">
                  <img
                    className="w-full h-128 object-cover z-0"
                    src="images/bgLandingPageUpper.svg"
                    alt="Upper background"
                  />
                </div>
                <img
                  className="relative w-full px-2"
                  src="images/rocket.svg"
                  alt="Cat riding a rocket with orange shooting stars"
                />
                <div className="absolute top-56 mx-auto flex flex-col justify-between pb-10 pt-20 items-center">
                  <div>
 
                    <h1 className="text-center font-light text-2xl  leading-snug font-landing">
                      <span translate="no">Popcorn's</span>{" "} Fair Launch Auction
                    </h1>
                    <p className="w-11/12 mx-auto text-center text-sm font-light font-landing mt-4">
                    The <span translate="no">Popcorn</span>{" "} Fair Launch Auction (FLA) will be the first opportunity for the
                    general public to join the PopcornDAO by acquiring the POP
                    token. This is a 2.5 day, multi-chain event for the <span translate="no">Popcorn</span>{" "}
                    community where all proceeds raised will go to the <span translate="no">Popcorn</span>{" "}
                    Treasury, a smart contract entirely controlled by POP token
                    holders. Please refer to this{' '}
                    <Link href="#">
                      <a className="text-blue-600 hover:text-blue-700 underline">
                        Step-by-Step Guide
                      </a>
                    </Link>{' '}
                    on how to safely participate in the FLA and{' '}
                    <Link href="/faq">
                      <a className="text-blue-600 hover:text-blue-700 underline">
                        check out the FAQ
                      </a>
                    </Link>{' '}
                    for more on how the auction works.
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
                        className=" mx-auto shadow-xl bg-white rounded-xl py-2 px-2 w-10/12 mt-12 flex flex-row items-center justify-between"
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
        <section className="mt-80">
          <div className="w-9/12 mt-10 mx-auto flex flex-col lg:flex-row justify-between items-center">
            <div className="">
              <p className="font-bold text-xl mb-1">What is <span translate="no">Popcorn</span>?{" "}</p>
              <p className="text-base font-light mt-4">
              <span translate="no">Popcorn</span>{" "} is aiding a revolutionary shift in global systems
                  through accessible DeFi products that align financial
                  wellbeing with positive global impact.
              </p>
              <p className="text-base font-light mt-4">
              In the next months, the roadmap offers multi-chain curated
                  pools of strategies and DeFi products (on Ethereum, Arbitrum,
                  Polygon, Fantom, Avalanche, Solana). These products generate
                  high yield while also funding community selected social impact
                  and non-profit organizations without any extra costs to the
                  end user.
</p>
<p className="text-base font-light mt-4">
In 2022, the roadmap includes launching DeFi primitives such
                  as a lending protocol that produces a native decentralized
                  stablecoin which has the extraordinary characteristic of
                  creating impact on a community-wide and global level. How?
                  Just holding it supports non-profits and public goods; that’s
                  something that can’t be said of the dollar or any stablecoin
                  in existence.
</p>
<p className="text-base font-light mt-4">
<span translate="no">Popcorn</span>{" "} bakes social and environmental impact into the very foundation of the protocol through its extractive and composable DeFi primitives and products where basis points are used to fund social impact and non-profit organizations.
</p>
<p className="text-base font-light mt-4">
Members of the PopcornDAO, or POP token holders, are stewards of <span translate="no">Popcorn</span>{" "} and share the common long-term goal of fueling the growth of the protocol, decentralizing the organization, and nurturing the mission of driving social impact for the public benefit in perpetuity.
</p>
            </div>
            <div className="mt-8">
              <p className="font-bold text-xl mb-1">The POP Token</p>
              <p className="text-base font-light">
                PopcornDAO is a decentralized autonomous organization of members
                holding the <span translate="no">Popcorn</span>{" "} governance token POP. Token holders are
                able to vote on proposals that influence the parameters of
                Popcorn’s smart contracts. Yield farming and staking incentives
                are also made available to token holders to further increase
                their yield.
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="relative">
            <img
              src="images/catThrowPopcorn.svg"
              className="mx-auto w-10/12 mt-8"
            ></img>
            <div className="mt-8">
              <div className=" mx-auto w-3/4">
                <p className="font-medium text-center text-2xl mb-2">
                  Fair Launch Auction Details
                </p>
                <p className="text-sm  leading-10">
                    <span className="font-bold">POP Tokens Offered</span>{" "}:
                    3,750,000
                  </p>
                  <p className="text-sm leading-10">
                    <span className="font-bold">When?</span>{" "} <br /> {startDate} ~
                    {startTime} UTC until<br /> {endDate} ~{endTime} UTC
                  </p>
                  <p className="text-sm leading-10">
                    <span className="font-bold">Where?</span>{" "} POP/USDC{' '}
                    <Link href="https://docs.alchemist.wtf/copper/fair-launch-auctions/what-is-a-fair-launch-auction" passHref>
                      <a  className="text-blue-600 hover:text-blue-700 underline">Copper Fair Launch Auction Pool</a>
                    </Link>
                  </p>
                  <p className="text-sm leading-10">
                    <span className="font-bold">Networks supported?</span>{" "}{' '}
                    Ethereum, Polygon &amp; Arbitrum
                  </p>
                  <p className="text-sm leading-10">
                    For more information please{' '}
                    <Link href="/faq" passHref>
                      <a className="text-blue-600 hover:text-blue-700 underline">
                        see the FAQ
                      </a>
                    </Link>{' '}
                    and the{' '}
                    <Link href="#" passHref>
                      <a className="text-blue-600 hover:text-blue-700 underline">
                        Step-by-Step Guide
                      </a>
                    </Link>{' '}
                  </p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-2xl flex flex-col w-10/12 mx-auto mt-8 p-8">
              <div className="flex flex-col">
                <img
                  src="/images/quotationMark.png"
                  alt="quote"
                  className="w-8 h-6 mb-2"
                />
                <p className="text-base font-medium">
                A Fair Launch Auction is not like a regular decentralized exchange pool. The
                    price will start high to disincentivize bots, front-running
                    and speculation. Over time, downwards price pressure will be
                    created by the change of relative weights between the two
                    assets. Only participate if you know what you are doing.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="w-10/12 mx-auto mt-8 flex flex-row items-baseline">
            <img src="/images/blueCat.png" alt="blueCat" className="w-1/2" />
            <img
              src="/images/orangeCat.png"
              alt="orangeCat"
              className="w-1/2"
            />
          </div>
        </section>

        <section className="w-10/12 mx-auto pt-4 border-t border-gray-500">
          <div className="flex flex-row">
            <p className="w-1/2 mt-2">
              <a href="https://popcorn.network">popcorn.network</a>
            </p>
            <p className="w-1/2 mt-2">
              <a href="https://forum.popcorn.network/">forum.popcorn.network</a>
            </p>
          </div>
          <div className="flex flex-row mt-2 mb-4">
            <p className="w-1/2">
              <a href="https://discord.gg/w9zeRTSZsq">discord</a>
            </p>
            <p className="w-1/2">
              <a href="https://twitter.com/Popcorn_DAO">@popcorn on twitter</a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
