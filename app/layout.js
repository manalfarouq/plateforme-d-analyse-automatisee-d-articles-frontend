import './globals.css';
import Header from '../components/Header';
import { AnimationProvider } from '../components/providers/AnimationProvider';

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
        <AnimationProvider>
          <Header />
          <main>{children}</main>
        </AnimationProvider>
      </body>
    </html>
  );
}
