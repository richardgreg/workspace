import Desktop from 'container/faq/desktop';
import LargeDesktop from 'container/faq/largeDesktop';
import Mobile from 'container/faq/mobile';
import Tablet from 'container/faq/tablet';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const IndexPage = () => {
  const router = useRouter();
  const [showMenu, setMenu] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      router.replace(window.location.pathname);
    }
  }, [router.pathname]);

  return (
    <div className="font-landing">
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
