// app/layout.js

import Header from '../components/Header';
import './globals.css';

export const metadata = {
  title: 'Plateforme d\'Analyse',
  description: 'Analysez vos textes avec l\'IA',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
          {children}
        </main>
      </body>
    </html>
  );
}