import Link from 'next/link';

import React from 'react';
import { Facebook, GitHub, Twitter } from 'react-feather';

export const MobileExpandableMenu: React.FC = () => {
  return (
    <div className="fixed h-full overflow-y-scroll z-10 nav-width mobile-menu-bg">
      <div className="relative w-full min-h-screen h-full transition-opacity duration-1000 ease-in-out ">
        <div className="w-screen px-6 mx-auto nav-animation">
          <div className="pt-14 flex flex-col divide-y divide-white divide-opacity-50">
            <Link href="https://launch.popcorn.network/" passHref>
              <a>
                <h1 className="ml-3 text-4xl font-light text-white hover:text-gray-700 font-landing py-5">
                  Token Launch Auction
                </h1>
              </a>
            </Link>
            <Link href="/docs/Popcorn_whitepaper_v1.pdf" passHref>
              <a>
                <h1 className="ml-3 text-4xl font-light text-white hover:text-gray-700 font-landing py-5">
                  Whitepaper
                </h1>
              </a>
            </Link>
            <Link href="/team" passHref>
              <a>
                <h1 className="ml-3 text-4xl font-light text-white hover:text-gray-700 font-landing py-5">
                  Team & Contributors
                </h1>
              </a>
            </Link>
          </div>
          <div className="h-full pt-6 w-full border-t border-white border-opacity-50 flex flex-row items-center justify-center">
            <a
              className="text-base font-medium text-white w-full text-center py-3 rounded-xl bg-blue-600"
              target="_blank"
              href="https://popcorndao.finance/"
            >
              Launch App
            </a>
          </div>
          <div className="grid w-full grid-cols-4 mx-auto py-5 justify-items-center border-t border-b border-white border-opacity-50 mt-6 mb-5">
            <div>
              <Link href="https://github.com/popcorndao" passHref>
                <GitHub
                  className="text-white cursor-pointer"
                  style={{ width: 33, height: 33 }}
                />
              </Link>
            </div>
            <div>
              <Link href="https://www.facebook.com/PopcornDAO" passHref>
                <Facebook
                  className="text-white cursor-pointer"
                  style={{ width: 33, height: 33 }}
                />
              </Link>
            </div>
            <div>
              <Link href="https://twitter.com/Popcorn_DAO" passHref>
                <Twitter
                  className="text-white cursor-pointer"
                  style={{ width: 33, height: 33 }}
                />
              </Link>
            </div>
            <div>
              <Link href="https://discord.gg/w9zeRTSZsq" passHref>
                <img
                  src="/images/discord-white-thick.svg"
                  alt="discord"
                  className="text-white cursor-pointer discord"
                  style={{ width: 33, height: 33 }}
                ></img>
              </Link>
              <Link href="https://reddit.com/popcorndao" passHref>
                <img
                  src="/images/reddit-white.svg"
                  alt="reddit"
                  className="text-white cursor-pointer discord"
                  style={{ width: 33, height: 33 }}
                ></img>
              </Link>
            </div>
          </div>
          <div className="flex flex-row py-6 font-light justify-evenly">
            <div className="flex flex-col w-1/2 space-y-3">
              <p className="text-base text-white uppercase font-landing">
                Site
              </p>
              <Link href="/" passHref>
                <a className="text-xl text-white text-semibold">Home</a>
              </Link>
              <Link href="https://medium.com/popcorndao" passHref>
                <a
                  className="text-xl text-white text-semibold"
                  target="_window"
                >
                  Blog
                </a>
              </Link>
            </div>
            <div className="flex flex-col w-1/2 ml-20 space-y-3">
              <p className="text-base text-white uppercase font-landing">
                Connect
              </p>
              <Link href="https://twitter.com/Popcorn_DAO" passHref>
                <a
                  className="text-xl text-white text-semibold"
                  target="_window"
                >
                  Twitter
                </a>
              </Link>
              <Link href="https://discord.gg/w9zeRTSZsq" passHref>
                <a
                  className="text-xl text-white text-semibold"
                  target="_window"
                >
                  Discord
                </a>
              </Link>
              <Link href="https://github.com/popcorndao" passHref>
                <a
                  className="text-xl text-white text-semibold"
                  target="_window"
                >
                  Github
                </a>
              </Link>
            </div>
          </div>
          {/* <div className="flex flex-col mt-10 space-y-3" style={{paddingBottom: 100}}>
            <p className="text-base font-bold text-white uppercase font-landing">
              Documentation
            </p>
            <Link href="/" passHref>
              <a className="text-xl text-white text-semibold">Gitbook</a>
            </Link> 
          </div> */}
        </div>
      </div>
    </div>
  );
};
