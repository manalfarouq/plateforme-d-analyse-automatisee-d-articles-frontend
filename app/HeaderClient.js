'use client';

import { usePathname } from 'next/navigation';
import Header from '../components/Header';

export default function HeaderClient() {
  const pathname = usePathname();

  const showHeader = pathname !== '/';
  const isFullWidthPage = pathname === '/analyse';

  return (
    <>
      {showHeader && <Header />}

      <style jsx global>{`
        body {
          background: ${isFullWidthPage ? '#fafafa' : 'transparent'};
        }
        main {
          position: relative;
          z-index: ${showHeader ? 10000 : 'auto'};
          min-height: 100vh;
          max-width: ${!isFullWidthPage && showHeader ? '800px' : '100%'};
          margin: ${!isFullWidthPage && showHeader ? '100px auto 0' : '0'};
          padding: ${!isFullWidthPage && showHeader ? '20px' : '0'};
          padding-top: ${showHeader && isFullWidthPage ? '120px' : '0'};
        }
      `}</style>
    </>
  );
}
