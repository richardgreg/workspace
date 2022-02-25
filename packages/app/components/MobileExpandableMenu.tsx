import { XIcon } from '@heroicons/react/solid';

import Link from 'next/link';

import React, { useCallback } from 'react';
import { Facebook, GitHub, Twitter } from 'react-feather';

interface MobileExpandableMenuProps {
  toggleMenuVisible: (boolean) => void;
}


export const MobileExpandableMenu: React.FC<MobileExpandableMenuProps> = ({
  toggleMenuVisible,
}) => {

  return (
    <div className="z-10 h-screen nav-width">
      <div className="relative w-full h-full transition-opacity duration-1000 ease-in-out mobile-menu-bg">
        <div className="w-screen px-6 mx-auto nav-animation">
          <div className="grid mb-10 justify-items-stretch">
            <XIcon
              onClick={() => toggleMenuVisible(false)}
              className="mt-8 mb-2 text-white opacity-0 justify-self-end"
              style={{ width: 24, height: 24 }}
            />
          </div>
          <div className="w-full bg-white " style={{ height: 0.32 }}></div>
          <Link href="https://launch.popcorn.network/" passHref>
            <a>
              <h1
                className="ml-3 text-4xl font-light text-white hover:text-gray-700 font-landing"
                style={{ marginTop: 18, marginBottom: 18 }}
              >
                Token Launch Auction
              </h1>
            </a>
          </Link>
          <div
            className="w-full bg-white opacity-50"
            style={{ height: 0.72 }}
          ></div>
          <Link href="/docs/Popcorn_whitepaper_v1.pdf" passHref>
            <a>
              <h1
                className="ml-3 text-4xl font-light text-white hover:text-gray-700 font-landing"
                style={{ marginTop: 18, marginBottom: 18 }}
              >
                Whitepaper
              </h1>
            </a>
          </Link>
          <div
            className="w-full bg-white opacity-50"
            style={{ height: 0.72 }}
          ></div>
          <Link href="/team" passHref>
            <a>
              <h1
                className="ml-3 text-4xl font-light text-white hover:text-gray-700 font-landing"
                style={{ marginTop: 18, marginBottom: 18 }}
              >
                Team & Contributors
              </h1>
            </a>
          </Link>
          {/* <div
            className="w-full bg-white opacity-50"
            style={{ height: 0.72 }}
          ></div> */}
          <div className="w-full mt-16">
            <div
              className=" text-base font-medium text-white bg-blue-600 cursor-pointer hover:bg-blue-500 rounded-xl text-center"
            >
              <a className='p-4 display-inline text-base font-medium text-white bg-blue-600  rounded-xl text-center h-full w-full'
                target='_blank'
                href='https://popcorndao.finance/'
              >
                Launch App
              </a>
            </div>
          </div>

          <div className='w-full m-auto p-0 absolute bottom-0 left-0'>
            <div
              className="grid w-full grid-cols-4 mx-auto my-5 justify-items-center"
              style={{ marginTop: 18, marginBottom: 18 }}
            >
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
              </div>
            </div>
            <div className="w-full bg-white" style={{ height: 0.72 }}></div>
            <div className="flex flex-row py-6 font-light justify-evenly pl-5">
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
    </div>
  );
};
