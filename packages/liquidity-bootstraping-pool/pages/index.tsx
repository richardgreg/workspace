import Desktop from 'container/landing/desktop';
import LargeDesktop from 'container/landing/largeDesktop';
import Mobile from 'container/landing/mobile';
import Tablet from 'container/landing/tablet';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const IndexPage = () => {
  const router = useRouter();
  const [showMenu, setMenu] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      router.replace(window.location.pathname);
    }
  }, [router.pathname]);

  return (
    <div>
      {/* Large desktop */}
      <LargeDesktop />
      {/* Desktop */}
      <Desktop />
      {/* TABLET VERSION */}
      <Tablet />
      {/* MOBILE VERSION */}
      <Mobile showMenu={showMenu} setMenu={setMenu} />
    </div>
  );
};

export default IndexPage;
