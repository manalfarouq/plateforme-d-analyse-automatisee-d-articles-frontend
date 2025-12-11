// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from './services/api';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  const [progress, setProgress] = useState<number>(0);
  const [loadingComplete, setLoadingComplete] = useState<boolean>(false);
  const [showHero, setShowHero] = useState<boolean>(false);
  
  const [isAuth] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return authService.isAuthenticated();
    }
    return false;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoadingComplete(true), 300);
          setTimeout(() => setShowHero(true), 800);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const handleNavigate = (path: string): void => {
    router.push(path);
  };

  return (
    <>
      {/* Loading Screen */}
      <div className={`loading-screen ${loadingComplete ? 'hidden' : ''}`}>
        <div className="loading-content">
          <div className="illustration-wrapper">
            <div className="light-beam"></div>
            <Image 
              src="/im1.png"
              alt="Loading"
              width={350}
              height={320}
              priority
              className="loading-illustration"
            />
          </div>

          <h2 className="loading-title">
            Loading<span className="dots">...</span>
          </h2>

          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <p className="progress-text">{Math.round(progress)}%</p>
        </div>
      </div>

      {/* Main Hero */}
      <div className={`hero-container ${showHero ? 'visible' : ''}`}>
        <div className="hero-background">
          <Image 
            src="/back.jpg" 
            alt="Background"
            fill
            style={{ objectFit: 'cover' }}
            quality={100}
            priority
          />
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content">
          <div className="hero-illustration">
            <div className="spotlight"></div>
            <Image 
              src="/im2.png"
              alt="Hero"
              width={320}
              height={300}
              className="float-illustration"
            />
          </div>

          <h1 className="hero-title">
            <span className="title-hybrid">Hybrid</span>
            <span className="title-analyzer">Analyzer</span>
          </h1>

          <p className="hero-description">
            Analyse avancée de texte par intelligence artificielle
          </p>

          <div className="cta-buttons">
            <button 
              className="btn-primary"
              onClick={() => handleNavigate(isAuth ? '/analyse' : '/auth')}
            >
              {isAuth ? 'Commencer' : 'Se Connecter'}
            </button>
          </div>
        </div>

        <nav className="bottom-nav">
          <a onClick={() => handleNavigate('/')}>
            <span className="nav-num">01</span>
            <span>Home</span>
          </a>
          <a onClick={() => handleNavigate('/auth')}>
            <span className="nav-num">02</span>
            <span>Login</span>
          </a>
          <a onClick={() => handleNavigate(isAuth ? '/analyse' : '/auth')}>
            <span className="nav-num">03</span>
            <span>Analyze</span>
          </a>
          <a onClick={() => alert('Contact à venir')}>
            <span className="nav-num">04</span>
            <span>Contact</span>
          </a>
        </nav>

        <div className="corner-text top-left">Open for collaborations</div>
        <div className="corner-text bottom-right">From Morocco with passion</div>
      </div>

      <style jsx>{`
        .loading-screen {
          position: fixed;
          inset: 0;
          background: #fafafa;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          transition: opacity 0.8s ease, visibility 0.8s ease;
        }

        .loading-screen.hidden {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .loading-content {
          text-align: center;
        }

        .illustration-wrapper {
          position: relative;
          margin-bottom: 3rem;
        }

        .light-beam {
          position: absolute;
          top: -100px;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          height: 180px;
          background: linear-gradient(180deg, transparent, rgba(0,0,0,0.15), transparent);
          animation: lightPulse 3s ease-in-out infinite;
        }

        @keyframes lightPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        .loading-illustration {
          position: relative;
          z-index: 1;
          animation: gentleBounce 3s ease-in-out infinite;
          filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.1));
        }

        @keyframes gentleBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
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

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
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

        .hero-container {
          position: fixed;
          inset: 0;
          opacity: 0;
          transition: opacity 1.2s ease;
          pointer-events: none;
        }

        .hero-container.visible {
          opacity: 1;
          pointer-events: auto;
        }

        .hero-background {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
        }

        .hero-content {
          position: relative;
          z-index: 10;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 2rem;
        }

        .hero-illustration {
          margin-bottom: 3rem;
          position: relative;
        }

        .spotlight {
          position: absolute;
          top: -150px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 200px;
          background: linear-gradient(180deg, transparent, rgba(255,255,255,0.8), transparent);
          animation: spotlightPulse 4s ease-in-out infinite;
          filter: blur(2px);
        }

        @keyframes spotlightPulse {
          0%, 100% { opacity: 0.6; transform: translateX(-50%) scaleY(1); }
          50% { opacity: 1; transform: translateX(-50%) scaleY(1.1); }
        }

        .float-illustration {
          animation: floatGentle 6s ease-in-out infinite;
          filter: drop-shadow(0 30px 60px rgba(0, 0, 0, 0.5));
        }

        @keyframes floatGentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-25px); }
        }

        .hero-title {
          font-family: 'EB Garamond', serif;
          font-size: 7rem;
          font-weight: 300;
          line-height: 1;
          margin-bottom: 1.5rem;
          letter-spacing: -3px;
          animation: fadeInUp 1s ease 0.5s backwards;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .title-hybrid {
          color: white;
          font-style: italic;
          display: block;
        }

        .title-analyzer {
          color: white;
          display: block;
          margin-top: -0.5rem;
        }

        .hero-description {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.9);
          max-width: 500px;
          margin-bottom: 3rem;
          font-weight: 300;
          letter-spacing: 1px;
          animation: fadeInUp 1s ease 0.8s backwards;
        }

        .cta-buttons {
          animation: fadeInUp 1s ease 1.1s backwards;
        }

        .btn-primary {
          padding: 16px 48px;
          border: 1px solid white;
          background: transparent;
          color: white;
          font-size: 0.9rem;
          font-weight: 400;
          letter-spacing: 2px;
          cursor: pointer;
          transition: all 0.4s ease;
          text-transform: uppercase;
        }

        .btn-primary:hover {
          background: white;
          color: #1a1a1a;
          transform: translateY(-2px);
        }

        .bottom-nav {
          position: fixed;
          bottom: 3rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 4rem;
          z-index: 20;
          animation: fadeInUp 1s ease 1.5s backwards;
        }

        .bottom-nav a {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .bottom-nav a:hover {
          color: white;
          transform: translateY(-3px);
        }

        .nav-num {
          font-size: 0.6rem;
          opacity: 0.5;
        }

        .corner-text {
          position: fixed;
          font-size: 0.65rem;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 300;
          letter-spacing: 1px;
          z-index: 15;
          text-transform: uppercase;
        }

        .top-left {
          top: 2rem;
          left: 2rem;
          animation: fadeIn 1s ease 1.8s backwards;
        }

        .bottom-right {
          bottom: 2rem;
          right: 2rem;
          animation: fadeIn 1s ease 2s backwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 4rem;
          }

          .bottom-nav {
            gap: 2rem;
          }

          .corner-text {
            font-size: 0.55rem;
          }
        }
      `}</style>
    </>
  );
}