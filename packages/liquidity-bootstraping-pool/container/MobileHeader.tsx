import Link from 'next/link';
import React from 'react';
import { MobileNavigation } from './MobileNavigation';
import * as Icon from 'react-feather';

export default function Header({ showMenu, setMenu }) {
  return (
    <>
      <MobileNavigation showMenu={showMenu} setMenu={setMenu} />
      <header className="w-full bg-primary">
        <nav className="w-10/12 mx-auto pt-4 pb-4 border-b border-primaryLight flex flex-row items-center justify-between">
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
          <Icon.Menu onClick={() => setMenu(true)} />
        </nav>
      </header>
    </>
  );
}
