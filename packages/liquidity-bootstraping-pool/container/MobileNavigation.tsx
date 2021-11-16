import Link from "next/link";
import React from "react";
import * as Icon from 'react-feather';

export function MobileNavigation({showMenu, setMenu}) {
  return showMenu && (
    <div className="fixed bg-primaryLight border-b border-gray-500 z-10 mx-auto w-full flex flex-row justify-between px-8 py-8">
      <div className="flex flex-col space-y-4">
        {/*
      <Link href="/guide" passHref>
            <a
              className="font-light text-normal cursor-pointer hover:text-blue-600"
              target="_window"
            >
              Step-by-Step Guide
            </a>
          </Link>
        */}
        <Link href="/#" passHref>
            <a
              className="font-light text-normal cursor-pointer hover:text-blue-600"
              onClick={() => setMenu(false)}
            >
             About Token Launch
            </a>
          </Link>
          <Link href="/faq" passHref>
            <a
              className="font-light text-normal cursor-pointer hover:text-blue-600"
              onClick={() => setMenu(false)}
            >
             Token Launch FAQ
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
  )
}