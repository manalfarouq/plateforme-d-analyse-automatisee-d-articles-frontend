// components/Header.tsx
'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface MenuItem {
  num: string;
  label: string;
  path: string;
}

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [expandingIndex, setExpandingIndex] = useState<number | null>(null);
  const [navigating, setNavigating] = useState(false);

  const handleMenuClick = (index: number, path: string) => {
    if (path === pathname) return;
    
    setExpandingIndex(index);
    
    setTimeout(() => {
      setNavigating(true);
    }, 300);

    setTimeout(() => {
      router.push(path);
      setExpandingIndex(null);
      setNavigating(false);
    }, 1200);
  };

  const menuItems: MenuItem[] = [
    { num: '01', label: 'HOME', path: '/' },
    { num: '02', label: 'LOGIN', path: '/auth' },
    { num: '03', label: 'ANALYZE', path: '/analyse' },
    { num: '04', label: 'CONTACT', path: '/contact' },
  ];

  // Ne pas afficher le background sur la page /analyse
  const showBackground = pathname !== '/analyse';

  return (
    <>
      {/* Background fixe - SEULEMENT sur certaines pages */}
      {showBackground && (
        <div className="header-background">
          <div className="background-image" />
          <div className="background-overlay" />
        </div>
      )}

      {/* Menu navigation */}
      <nav className="header-menu">
        {menuItems.map((item, index) => (
          <button
            key={item.num}
            className={`menu-item ${pathname === item.path ? 'active' : ''}`}
            onClick={() => handleMenuClick(index, item.path)}
            aria-label={item.label}
          >
            <span className="menu-num">{item.num}</span>
            <span className="menu-label">{item.label}</span>
            <div className="menu-underline" />
            {expandingIndex === index && <div className="expanding-overlay" />}
          </button>
        ))}
      </nav>

      {/* Texte footer */}
      <div className="header-footer">
        Designed by Manal, from Morocco with love
      </div>

      {/* Textes dans les coins - uniquement si background visible */}
      {showBackground && (
        <>
          <div className="corner-text top-left">
            Open for collaborations
          </div>
          <div className="corner-text bottom-right">
            From Morocco with passion
          </div>
        </>
      )}

      {/* Navigation loading overlay */}
      {navigating && (
        <div className="navigation-overlay">
          <div className="nav-loader">
            <div className="nav-loader-bar" />
          </div>
        </div>
      )}

      <style jsx>{`
        /* Background */
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

        /* Menu */
        .header-menu {
          position: fixed;
          top: 3rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 3rem;
          z-index: 9998;
          animation: fadeIn 0.6s ease forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .menu-item {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 0.5rem 1rem;
          background: transparent;
          border: none;
          cursor: pointer;
          color: rgba(255, 255, 255, 0.85);
        }

        .menu-item.active .menu-label {
          color: white;
        }

        .menu-item.active .menu-underline {
          transform: translateX(-50%) scaleX(1);
        }

        .menu-num {
          font-size: 0.6rem;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 300;
          letter-spacing: 1px;
        }

        .menu-label {
          font-size: 0.75rem;
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

        /* Footer text */
        .header-footer {
          position: fixed;
          bottom: 3rem;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 300;
          letter-spacing: 2px;
          z-index: 98;
          text-transform: uppercase;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        /* Corner texts */
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

        /* Expanding overlay animation */
        .expanding-overlay {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 1px;
          height: 1px;
          background: white;
          z-index: 9990;
          animation: expand 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes expand {
          0% {
            width: 1px;
            height: 1px;
            border-radius: 50%;
          }
          100% {
            width: 100vw;
            height: 100vh;
            border-radius: 0;
          }
        }

        /* Navigation overlay */
        .navigation-overlay {
          position: fixed;
          inset: 0;
          z-index: 9995;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
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
          animation: loadBar 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes loadBar {
          to { width: 100%; }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .header-menu {
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

          .header-footer {
            font-size: 0.6rem;
            bottom: 2rem;
          }
        }
      `}</style>
    </>
  );
}