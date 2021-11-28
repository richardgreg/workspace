import Desktop from 'container/landing/desktop';
import LargeDesktop from 'container/landing/largeDesktop';
import Mobile from 'container/landing/mobile';
import Tablet from 'container/landing/tablet';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const IndexPage = () => {
  const router = useRouter();
  const [showMenu, setMenu] = useState<boolean>(false);
  const [auctionLive, setAuctionLive] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      router.replace(window.location.pathname);
    }
  }, [router.pathname]);

  const isAuctionLiveYet = () => {
    const now = new Date().getTime();

    const distance = 1638172800000 - now;
    if (distance < 0) {
     setAuctionLive(true);
    }
  }

  useEffect(() => {
    isAuctionLiveYet();
    setInterval(() => {
      isAuctionLiveYet();
    }, 1000)
  }, []);

  return (
    <div>
      {/* Large desktop */}
      <LargeDesktop auctionLive={auctionLive} />
      {/* Desktop */}
      <Desktop auctionLive={auctionLive}  />
      {/* TABLET VERSION */}
      <Tablet auctionLive={auctionLive}  />
      {/* MOBILE VERSION */}
      <Mobile auctionLive={auctionLive}  showMenu={showMenu} setMenu={setMenu} />
    </div>
  );
};

export default IndexPage;
