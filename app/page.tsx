'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [expandingIndex, setExpandingIndex] = useState<number | null>(null);
  const [navigating, setNavigating] = useState(false);
  const [isAuth] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Séquence d'animations
          setTimeout(() => setLoadingComplete(true), 300);
          setTimeout(() => setShowBackground(true), 1800);
          setTimeout(() => setShowMenu(true), 2500);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const handleMenuClick = (index: number, path?: string) => {
    setExpandingIndex(index);
    setTimeout(() => setNavigating(true), 800);

    // Navigation après l'animation complète
    setTimeout(() => {
    if (path) {
      router.push(path); // navigue vers /auth ou autre
    }
  }, 1200); // délai correspondant à ton animation
};

  const menuItems = [
    { num: '01', label: 'HOME', path: '/' },
    { num: '02', label: 'LOGIN', path: '/auth' },
    { num: '03', label: 'ANALYZE', path: isAuth ? '/analyse' : '/auth' },
    { num: '04', label: 'CONTACT', path: '/contact' }
  ];

  return (
    <>
      {/* Loading Screen */}
      {/* <div className={`loading-screen ${loadingComplete ? 'falling' : ''}`}>
        <div className="loading-content">
          <h2 className="loading-title">
            Loading<span className="dots">...</span>
          </h2>

          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <p className="progress-text">{Math.round(progress)}%</p>
        </div>
      </div> */}

      {/* Textes latéraux pendant le loading */}
      <div className={`side-text left-text ${loadingComplete ? 'falling' : ''}`}>
        Designed by M A N A L
      </div>
      <div className={`side-text right-text ${loadingComplete ? 'falling' : ''}`}>
        From Morocco with Love
      </div>

      {/* Texte fusionné au centre */}
      <div className={`merged-text ${loadingComplete ? 'visible' : ''}`}>
        Designed by Manal, from Morocco with love
      </div>

      {/* Titre descendant avec la nouvelle police */}
      <div className={`falling-title ${loadingComplete ? 'visible' : ''}`}>
        <span className="title-hybrid">ZORO</span>
        <span className="title-analyzer">Analyzer</span>
      </div>

      {/* Background Image */}
      <div className={`background-container ${showBackground ? 'visible' : ''}`}>
        <div className="background-image" />
        <div className="background-overlay" />
      </div>

      {/* Menu Navigation */}
      <nav className={`top-menu ${showMenu ? 'visible' : ''}`}>
        {menuItems.map((item, index) => (
          <div 
            key={item.num}
            className="menu-item"
            onClick={() => handleMenuClick(index, item.path)}
          >
            <span className="menu-num">{item.num}</span>
            <span className="menu-label">{item.label}</span>
            <div className="menu-underline" />
            {expandingIndex === index && (
              <div className="expanding-overlay" />
            )}
          </div>
        ))}
      </nav>

      {/* Navigation Loading */}
      {navigating && (
        <div className="navigation-loading">
          <div className="nav-loader">
            <div className="nav-loader-bar" />
          </div>
        </div>
      )}

      {/* Corner Texts */}
      <div className={`corner-text top-left ${showBackground ? 'visible' : ''}`}>
        Open for collaborations
      </div>
      <div className={`corner-text bottom-right ${showBackground ? 'visible' : ''}`}>
        From Morocco with passion
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        /* Import de la police personnalisée */
        @font-face {
          font-family: 'Moot Jungle';
          src: url('/fonts/Rallomy-Regular.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        /* Loading Screen */
        .loading-screen {
          position: fixed;
          inset: 0;
          background: #fafafa;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          transition: transform 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .loading-screen.falling {
          transform: translateY(100vh);
        }

        .loading-content {
          text-align: center;
        }

        .loading-title {
          font-family: 'EB Garamond', serif;
          font-size: 3rem;
          font-weight: 400;
          color: #1a1a1a;
          margin-bottom: 1rem;
          letter-spacing: 2px;
        }

        .dots {
          animation: blink 1.5s infinite;
        }

        .progress-bar {
          width: 300px;
          height: 1px;
          background: #e0e0e0;
          margin: 0 auto 0.5rem;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: #1a1a1a;
          transition: width 0.3s ease;
        }

        .progress-text {
          font-size: 0.75rem;
          color: #999;
          font-family: monospace;
          letter-spacing: 1px;
        }

        /* Textes latéraux */
        .side-text {
          position: fixed;
          font-size: 0.75rem;
          color: #1a1a1a;
          font-weight: 300;
          letter-spacing: 2px;
          z-index: 99;
          text-transform: uppercase;
          top: 50%;
          transform: translateY(-50%);
          opacity: 1;
          transition: all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .left-text {
          left: 2rem;
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }

        .right-text {
          right: 2rem;
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }

        .side-text.falling {
          opacity: 0;
          transform: translateY(100vh);
        }

        /* Texte fusionné */
        .merged-text {
          position: fixed;
          bottom: 3rem;
          left: 50%;
          transform: translateX(-50%) translateY(100vh);
          font-size: 0.7rem;
          color: #1a1a1a;
          font-weight: 300;
          letter-spacing: 2px;
          z-index: 98;
          text-transform: uppercase;
          white-space: nowrap;
          opacity: 0;
          transition: all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s;
        }

        .merged-text.visible {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
        }

        /* Titre descendant avec la police Moot Jungle */
        .falling-title {
          position: fixed;
          top: 20%;
          left: 50%;
          transform: translateX(-50%) translateY(-150%);
          z-index: 97;
          text-align: center;
          opacity: 0;
          transition: all 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s;
        }

        .falling-title.visible {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
        }

        .falling-title .title-hybrid,
        .falling-title .title-analyzer {
          font-family: 'Moot Jungle', 'EB Garamond', serif;
          font-size: 6rem;
          font-weight: normal;
          line-height: 1.1;
          letter-spacing: -2px;
          color: #1a1a1a;
          display: block;
        }

        .falling-title .title-hybrid {
          font-style: italic;
        }

        .falling-title .title-analyzer {
          margin-top: -0.5rem;
        }

        /* Background Container */
        .background-container {
          position: fixed;
          inset: 0;
          z-index: 1;
          opacity: 0;
          transform: scale(1.05);
          filter: blur(10px);
          transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .background-container.visible {
          opacity: 1;
          transform: scale(1);
          filter: blur(0);
        }

        .background-image {
          position: absolute;
          inset: 0;
          background-image: url('/back.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .background-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.3);
        }

        /* Top Menu */
        .top-menu {
          position: fixed;
          top: 3rem;
          left: 50%;
          transform: translateX(-50%) translateY(-50px);
          display: flex;
          gap: 4rem;
          z-index: 50;
          opacity: 0;
          transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .top-menu.visible {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        .menu-item {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          padding: 0.5rem 1rem;
        }

        .menu-num {
          font-size: 0.6rem;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 300;
          letter-spacing: 1px;
        }

        .menu-label {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.85);
          font-weight: 400;
          letter-spacing: 2px;
          text-transform: uppercase;
          transition: color 0.3s ease;
        }

        .menu-item:hover .menu-label {
          color: white;
        }

        .menu-underline {
          position: absolute;
          bottom: -4px;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 80%;
          height: 1px;
          background: white;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .menu-item:hover .menu-underline {
          transform: translateX(-50%) scaleX(1);
        }

        /* Expanding Overlay */
        .expanding-overlay {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 1px;
          height: 1px;
          background: white;
          z-index: 90;
          animation: expandOverlay 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes expandOverlay {
          0% {
            width: 1px;
            height: 1px;
            border-radius: 50%;
          }
          50% {
            width: 100vw;
            height: 2px;
            border-radius: 0;
          }
          100% {
            width: 100vw;
            height: 100vh;
            border-radius: 0;
          }
        }

        /* Navigation Loading */
        .navigation-loading {
          position: fixed;
          inset: 0;
          z-index: 95;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          animation: fadeIn 0.3s ease;
        }

        .nav-loader {
          width: 300px;
          height: 2px;
          background: #f0f0f0;
          overflow: hidden;
          border-radius: 2px;
        }

        .nav-loader-bar {
          width: 0;
          height: 100%;
          background: #1a1a1a;
          animation: loadBar 1.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes loadBar {
          0% { width: 0; }
          100% { width: 100%; }
        }

        /* Corner Texts */
        .corner-text {
          position: fixed;
          font-size: 0.65rem;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 300;
          letter-spacing: 1px;
          z-index: 15;
          text-transform: uppercase;
          opacity: 0;
          transition: opacity 1s ease 0.5s;
        }

        .corner-text.visible {
          opacity: 1;
        }

        .top-left {
          top: 2rem;
          left: 2rem;
        }

        .bottom-right {
          bottom: 2rem;
          right: 2rem;
        }

        /* Animations */
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .falling-title .title-hybrid,
          .falling-title .title-analyzer {
            font-size: 4rem;
          }

          .top-menu {
            gap: 2rem;
            top: 2rem;
          }

          .menu-item {
            padding: 0.5rem 0.5rem;
          }

          .menu-label {
            font-size: 0.65rem;
          }

          .corner-text {
            font-size: 0.55rem;
          }

          .side-text {
            font-size: 0.65rem;
          }

          .merged-text {
            font-size: 0.6rem;
          }

          .left-text {
            left: 1rem;
          }

          .right-text {
            right: 1rem;
          }
        }
      `}</style>
    </>
  );
}