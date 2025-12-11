// app/layout.js
'use client';

import { usePathname } from 'next/navigation';
import Header from '../components/Header';
import './globals.css';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  
  // Ne pas afficher le header sur la page d'accueil (loading page)
  const showHeader = pathname !== '/';

  return (
    <html lang="fr">
      <body>
        {showHeader && <Header />}
        <main style={{ 
          maxWidth: showHeader ? '800px' : '100%', 
          margin: showHeader ? '0 auto' : '0', 
          padding: showHeader ? '20px' : '0' 
        }}>
          {children}
        </main>
      </body>
    </html>
  );
}