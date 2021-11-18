import Link from 'next/link';
import React from 'react';

export default function DesktopNavigation({textSize}) {
  textSize = textSize ? textSize : 'xl'
  return (
    <>
      <div>
        <Link href="/" passHref>
          <a>
            <img src="/images/textLogo.png" alt="Logo" className="h-12"></img>
          </a>
        </Link>
      </div>
      <div className="space-x-8  relative z-20">
    <Link href="https://medium.com/popcorndao/preparing-for-popcorns-token-launch-on-copper-a-beginner-s-guide-ed1921760ae2" passHref>
      <a
        className={`font-light text-${textSize} cursor-pointer hover:text-blue-600`}
        target="_window"
      >
        Step-by-Step Guide
      </a>
    </Link>
        <Link href="/faq" passHref>
          <a className={`font-light text-${textSize} cursor-pointer hover:text-blue-600`}>
            Token Launch FAQ
          </a>
        </Link>
        <Link
          href="https://medium.com/popcorndao/pop-token-economics-5a580f0bf712"
          passHref
        >
          <a
            className={`font-light text-${textSize} cursor-pointer hover:text-blue-600`}
            target="_blank"
          >
            Tokenomics
          </a>
        </Link>
      </div>
    </>
  );
}
