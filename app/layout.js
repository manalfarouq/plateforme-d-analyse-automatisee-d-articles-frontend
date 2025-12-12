import './globals.css';
import HeaderClient from './HeaderClient';

export const metadata = {
  title: "ZORO Analyzer",
  description: "Analyse automatique d'articles avec Hugging Face & Gemini.",
  icons: {
    icon: "/zoro.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <HeaderClient />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
