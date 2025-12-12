// app/layout.js
'use client';

import { usePathname } from 'next/navigation';
import Header from '../components/Header';
import './globals.css';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  
  // Ne pas afficher le header sur la page d'accueil
  const showHeader = pathname !== '/';
  
  // Pages qui ont besoin d'un style spécial (pleine largeur, pas de padding)
  const isFullWidthPage = pathname === '/analyse';

  return (
    <html lang="fr">
      <body style={{
        background: isFullWidthPage ? '#fafafa' : 'transparent'
      }}>
        {showHeader && <Header />}
        <main style={{ 
          position: 'relative',
          zIndex: showHeader ? 10000 : 'auto',
          minHeight: '100vh',
          maxWidth: !isFullWidthPage && showHeader ? '800px' : '100%', 
          margin: !isFullWidthPage && showHeader ? '100px auto 0' : '0', 
          padding: !isFullWidthPage && showHeader ? '20px' : '0',
          paddingTop: showHeader && isFullWidthPage ? '120px' : undefined
        }}>
          {children}
        </main>
      </body>
    </html>
  );
}