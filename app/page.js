'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAnimation } from '../components/providers/AnimationProvider';

export default function Home() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const { expandingIndex, startNavigation, endNavigation } = useAnimation();
  const router = useRouter();

  useEffect(() => {
    // Animation du loading de 0 à 100
    const duration = 2000;
    const interval = 20;
    const steps = duration / interval;
    const increment = 100 / steps;

    let currentProgress = 0;
    const timer = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= 100) {
        setLoadingProgress(100);
        clearInterval(timer);
        
        // Séquence d'animations
        setTimeout(() => {
          setLoadingComplete(true); // Loading disparaît
          
          setTimeout(() => {
            setShowBackground(true); // Background apparaît
            
            setTimeout(() => {
              setShowTitle(true); // Titre apparaît avec transition noir → blanc
              
              setTimeout(() => {
                setShowContent(true); // Menu et message apparaissent
              }, 800);
            }, 300);
          }, 500);
        }, 300);
      } else {
        setLoadingProgress(currentProgress);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Nettoyer l'animation après navigation
  useEffect(() => {
    if (expandingIndex !== null) {
      const timer = setTimeout(() => {
        endNavigation();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [expandingIndex, endNavigation]);

  const handleMenuClick = (index, path) => {
    startNavigation(index);
    setTimeout(() => {
      if (path) router.push(path);
    }, 900);
  };

  const menuItems = [
    { num: '01', label: 'HOME', path: '/' },
    { num: '02', label: 'LOGIN', path: '/auth' },
    { num: '03', label: 'ANALYZE', path: '/analyse' },
    { num: '04', label: 'CONTACT', path: '/contact' }
  ];

  return (
    <>
      {/* Loading Block */}
      {!loadingComplete && (
        <div className="loading-container">
          <div className="loading-content">
            <h1 className="loading-title">
              <span className="title-hybrid">ZORO</span>
              <span className="title-analyzer">Analyzer</span>
            </h1>
            
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            
            <div className="progress-text">{Math.round(loadingProgress)}%</div>
          </div>
        </div>
      )}

      {/* Background (apparaît après loading) */}
      {showBackground && (
        <div className={`background-container ${showBackground ? 'visible' : ''}`}>
          <div className="background-image" />
          <div className="background-overlay" />
        </div>
      )}

      {/* Titre (apparaît avec transition noir → blanc) */}
      {showTitle && (
        <div className={`main-title ${showTitle ? 'visible' : ''}`}>
          <span className="title-hybrid">ZORO</span>
          <span className="title-analyzer">Analyzer</span>
        </div>
      )}

      {/* Contenu principal (menu + message) */}
      {showContent && (
        <>
          {/* Message d'accueil */}
          <div className="welcome-message">
            <p className="message-text">
              Analyse automatique d&apos;articles
            </p>
            <p className="message-subtitle">
              Résumé • Tonalité • Synthèse • Classification IA
            </p>
          </div>

          {/* Menu Navigation */}
          <nav className="top-menu">
            {menuItems.map((item, index) => (
              <button
                key={item.num}
                className="menu-item"
                onClick={() => handleMenuClick(index, item.path)}
              >
                <span className="menu-num">{item.num}</span>
                <span className="menu-label">{item.label}</span>
                <div className="menu-hover-background" />
              </button>
            ))}
          </nav>

          {/* Expanding Overlay pour transitions */}
          {expandingIndex !== null && (
            <div className="expanding-overlay-container">
              <div className="expanding-overlay" />
            </div>
          )}

          {/* Footer Text */}
          <div className="footer-text">
            Designed by Manal, from Morocco with love
          </div>
        </>
      )}

      <style jsx>{`
        @font-face {
          font-family: 'Moot Jungle';
          src: url('/fonts/Rallomy-Regular.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        /* ============================================
           LOADING CONTAINER
           ============================================ */
        .loading-container {
          position: fixed;
          inset: 0;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          animation: dropFadeOut 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }

        @keyframes dropFadeOut {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }

        .loading-content {
          text-align: center;
        }

        .loading-title {
          margin-bottom: 3rem;
        }

        .loading-title .title-hybrid,
        .loading-title .title-analyzer {
          font-family: 'Moot Jungle', 'EB Garamond', serif;
          font-size: 6rem;
          font-weight: normal;
          line-height: 1.1;
          letter-spacing: -2px;
          color: #1a1a1a;
          display: block;
        }

        .loading-title .title-hybrid {
          font-style: italic;
        }

        .loading-title .title-analyzer {
          margin-top: -0.5rem;
        }

        /* Progress Bar */
        .progress-bar {
          width: 400px;
          height: 2px;
          background: #e5e7eb;
          border-radius: 2px;
          overflow: hidden;
          margin: 0 auto 1rem;
        }

        .progress-fill {
          height: 100%;
          background: #1a1a1a;
          transition: width 0.02s linear;
        }

        .progress-text {
          font-size: 0.875rem;
          color: #6b7280;
          font-weight: 300;
          letter-spacing: 2px;
        }

        /* ============================================
           BACKGROUND
           ============================================ */
        .background-container {
          position: fixed;
          inset: 0;
          z-index: 1;
          opacity: 0;
          transform: scale(1.05);
          filter: blur(10px);
        }

        .background-container.visible {
          animation: fadeInBackground 1.2s ease forwards;
        }

        @keyframes fadeInBackground {
          to {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
          }
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

        /* ============================================
           MAIN TITLE (avec transition noir → blanc)
           ============================================ */
        .main-title {
          position: fixed;
          top: 20%;
          left: 50%;
          transform: translateX(-50%) translateY(-100%);
          z-index: 97;
          text-align: center;
          opacity: 0;
        }

        .main-title.visible {
          animation: slideDownAndFade 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes slideDownAndFade {
          0% {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
          }
          100% {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
        }

        .main-title .title-hybrid,
        .main-title .title-analyzer {
          font-family: 'Moot Jungle', 'EB Garamond', serif;
          font-size: 6rem;
          font-weight: normal;
          line-height: 1.1;
          letter-spacing: -2px;
          color: white;
          display: block;
          animation: colorTransition 0.8s ease forwards;
        }

        @keyframes colorTransition {
          0% {
            color: #1a1a1a;
          }
          100% {
            color: white;
          }
        }

        .main-title .title-hybrid {
          font-style: italic;
        }

        .main-title .title-analyzer {
          margin-top: -0.5rem;
        }

        /* ============================================
           MESSAGE D'ACCUEIL
           ============================================ */
        .welcome-message {
          position: fixed;
          top: 42%;
          left: 50%;
          transform: translateX(-50%);
          z-index: 96;
          text-align: center;
          animation: fadeInMessage 1s ease 0.5s forwards;
          opacity: 0;
        }

        @keyframes fadeInMessage {
          0% {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        .message-text {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.95);
          font-weight: 300;
          letter-spacing: 1px;
          margin-bottom: 0.5rem;
        }

        .message-subtitle {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.75);
          font-weight: 300;
          letter-spacing: 2px;
        }

        /* ============================================
           MENU NAVIGATION
           ============================================ */
        .top-menu {
          position: fixed;
          top: 3rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0;
          z-index: 100;
          animation: fadeInMenu 1s ease 0.8s forwards;
          opacity: 0;
          background: transparent;
          padding: 0;
        }

        @keyframes fadeInMenu {
          to {
            opacity: 1;
          }
        }

        .menu-item {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          cursor: pointer;
          padding: 1rem 2rem;
          background: transparent;
          border: none;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .menu-num {
          font-size: 0.6rem;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 300;
          letter-spacing: 1px;
          position: relative;
          z-index: 2;
          transition: all 0.3s ease;
        }

        .menu-label {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.85);
          font-weight: 400;
          letter-spacing: 2px;
          text-transform: uppercase;
          position: relative;
          z-index: 2;
          transition: all 0.3s ease;
        }

        /* Background blanc au hover - toute la hauteur */
        .menu-hover-background {
          position: absolute;
          inset: 0;
          background: white;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 0;
        }

        .menu-item:hover .menu-hover-background {
          transform: scaleX(1);
        }

        .menu-item:hover .menu-num {
          color: rgba(26, 26, 26, 0.6);
          transform: translateY(-2px);
        }

        .menu-item:hover .menu-label {
          color: #1a1a1a;
          transform: scale(1.05) translateY(-2px);
          font-weight: 500;
        }

        /* ============================================
           EXPANDING OVERLAY (transition pleine page)
           ============================================ */
        .expanding-overlay-container {
          position: fixed;
          inset: 0;
          z-index: 9999;
          pointer-events: none;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 3rem;
        }

        .expanding-overlay {
          background: white;
          animation: expandToFullPage 0.9s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }

        @keyframes expandToFullPage {
          0% {
            width: 120px;
            height: 50px;
            border-radius: 4px;
          }
          25% {
            width: 300px;
            height: 50px;
            border-radius: 4px;
          }
          50% {
            width: 100vw;
            height: 50px;
            border-radius: 0;
          }
          75% {
            width: 100vw;
            height: 60vh;
            border-radius: 0;
          }
          100% {
            width: 100vw;
            height: 100vh;
            border-radius: 0;
          }
        }

        /* ============================================
           CORNER TEXTS
           ============================================ */
        .corner-text {
          position: fixed;
          font-size: 0.65rem;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 300;
          letter-spacing: 1px;
          z-index: 15;
          text-transform: uppercase;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          animation: fadeIn 1s ease 1.2s forwards;
          opacity: 0;
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }

        .top-left {
          top: 2rem;
          left: 2rem;
        }

        .bottom-right {
          bottom: 2rem;
          right: 2rem;
        }

        /* ============================================
           FOOTER TEXT
           ============================================ */
        .footer-text {
          position: fixed;
          bottom: 3rem;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 300;
          letter-spacing: 2px;
          z-index: 50;
          text-transform: uppercase;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          animation: fadeIn 1s ease 1.4s forwards;
          opacity: 0;
        }

        /* ============================================
           RESPONSIVE
           ============================================ */
        @media (max-width: 768px) {
          .loading-title .title-hybrid,
          .loading-title .title-analyzer,
          .main-title .title-hybrid,
          .main-title .title-analyzer {
            font-size: 4rem;
          }

          .progress-bar {
            width: 300px;
          }

          .welcome-message {
            top: 45%;
            padding: 0 2rem;
          }

          .message-text {
            font-size: 0.9rem;
          }

          .message-subtitle {
            font-size: 0.75rem;
          }

          .top-menu {
            gap: 0;
            top: 2rem;
          }

          .menu-item {
            padding: 0.75rem 1rem;
          }

          .menu-label {
            font-size: 0.65rem;
          }

          .corner-text {
            font-size: 0.55rem;
          }

          .footer-text {
            font-size: 0.6rem;
            bottom: 2rem;
          }
        }
      `}</style>
    </>
  );
}