'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useAnimation } from './providers/AnimationProvider';
import { useEffect } from 'react';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { expandingIndex, startNavigation, endNavigation } = useAnimation();

  // Nettoyer l'animation après la navigation
  useEffect(() => {
    if (expandingIndex !== null) {
      const timer = setTimeout(() => {
        endNavigation();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [expandingIndex, endNavigation]);

  // Ne pas afficher sur la homepage
  if (pathname === '/') return null;

  const handleMenuClick = (index, path) => {
    if (path === pathname) return;
    startNavigation(index);
    setTimeout(() => router.push(path), 800);
  };

  const menuItems = [
    { num: '01', label: 'HOME', path: '/' },
    { num: '02', label: 'LOGIN', path: '/auth' },
    { num: '03', label: 'ANALYZE', path: '/analyse' },
    { num: '04', label: 'CONTACT', path: '/contact' },
  ];

  const showBackground = pathname !== '/analyse';

  return (
    <>
      {/* Background */}
      {showBackground && (
        <div className="header-background">
          <div className="background-image" />
          <div className="background-overlay" />
        </div>
      )}

      {/* Menu Navigation */}
      <nav className="header-menu">
        {menuItems.map((item, index) => (
          <button
            key={item.num}
            className={`menu-item ${pathname === item.path ? 'active' : ''}`}
            onClick={() => handleMenuClick(index, item.path)}
            disabled={pathname === item.path}
          >
            <span className="menu-num">{item.num}</span>
            <span className="menu-label">{item.label}</span>
            <div className="menu-background" />
          </button>
        ))}
      </nav>

      {/* Expanding Overlay (en dehors du menu) */}
      {expandingIndex !== null && (
        <div className="expanding-overlay-container">
          <div className="expanding-overlay" />
        </div>
      )}

      <style jsx>{`
        /* ============================================
           BACKGROUND
           ============================================ */
        .header-background {
          position: fixed;
          inset: 0;
          z-index: 1;
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
           MENU NAVIGATION
           ============================================ */
        .header-menu {
          position: fixed;
          top: 3rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 3rem;
          z-index: 100;
          animation: fadeIn 0.6s ease forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .menu-item {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 0.75rem 1.25rem;
          background: transparent;
          border: none;
          cursor: pointer;
          z-index: 1;
        }

        .menu-item:disabled {
          cursor: default;
        }

        .menu-num {
          font-size: 0.6rem;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 300;
          letter-spacing: 1px;
          position: relative;
          z-index: 2;
          transition: color 0.3s ease;
        }

        .menu-label {
          font-size: 0.75rem;
          font-weight: 400;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.85);
          position: relative;
          z-index: 2;
          transition: color 0.3s ease;
        }

        /* Background blanc au hover */
        .menu-background {
          position: absolute;
          inset: 0;
          background: white;
          border-radius: 4px;
          transform: scale(0);
          opacity: 0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 0;
        }

        .menu-item:hover:not(:disabled) .menu-background {
          transform: scale(1);
          opacity: 1;
        }

        .menu-item:hover:not(:disabled) .menu-num,
        .menu-item:hover:not(:disabled) .menu-label {
          color: #1a1a1a;
        }

        /* État actif */
        .menu-item.active .menu-background {
          transform: scale(1);
          opacity: 0.2;
        }

        .menu-item.active .menu-label {
          color: white;
        }

        /* ============================================
           EXPANDING OVERLAY (séparé du menu)
           ============================================ */
        .expanding-overlay-container {
          position: fixed;
          inset: 0;
          z-index: 9998;
          pointer-events: none;
        }

        .expanding-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 10px;
          height: 10px;
          background: white;
          border-radius: 50%;
          animation: expandFull 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes expandFull {
          0% {
            width: 10px;
            height: 10px;
            border-radius: 50%;
          }
          50% {
            width: 100vw;
            height: 10px;
            border-radius: 0;
          }
          100% {
            width: 100vw;
            height: 100vh;
            border-radius: 0;
          }
        }

        /* ============================================
           FOOTER TEXT
           ============================================ */
        .header-footer {
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
           RESPONSIVE
           ============================================ */
        @media (max-width: 768px) {
          .header-menu {
            gap: 2rem;
            top: 2rem;
          }

          .menu-item {
            padding: 0.5rem 0.75rem;
          }

          .menu-label {
            font-size: 0.65rem;
          }

          .corner-text {
            font-size: 0.55rem;
          }

          .header-footer {
            font-size: 0.6rem;
            bottom: 2rem;
          }
        }
      `}</style>
    </>
  );
}