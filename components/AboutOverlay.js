'use client';

import { useState, useEffect, useRef } from 'react';
import { X, ExternalLink, ChevronDown } from 'lucide-react';

export default function AboutOverlay({ isOpen, onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [typingText, setTypingText] = useState('');
  const [typingDesc, setTypingDesc] = useState('');
  const isScrollingRef = useRef(false);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const visibilityTimer = setTimeout(() => setIsVisible(true), 0);
      const animationTimer = setTimeout(() => setIsAnimating(true), 50);
      return () => {
        clearTimeout(visibilityTimer);
        clearTimeout(animationTimer);
      };
    } else {
      const animationTimer = setTimeout(() => setIsAnimating(false), 0);
      const hideTimer = setTimeout(() => setIsVisible(false), 500);
      return () => {
        clearTimeout(animationTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [isOpen]);

  const projects = [
    {
      id: 0,
      name: 'Plateforme d\'Analyse d\'Articles',
      description: 'plateforme permettant d\'analyser automatiquement des articles via deux services d\'IA Hugging Face Google Gemini  Résumé  Tonalité  Synthèse contextuelle',
      tech: 'React, Next.js, FastAPI, PostgreSQL, Hugging Face API,Python, JWT Auth, Docker',
      link: '#',
      theme: {
        name: 'modern',
        image: '/zoro.png',
        textColor: '#1a1a1a',
        accentColor: '#a78bfa',
        titleFont: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        bodyFont: "'Inter', sans-serif",
        effectClass: 'effect-modern'
      }
    },
    {
      id: 1,
      name: 'Plateforme de Traduction Sécurisée',
      description: 'Plateforme de traduction sécurisée permet la traduction bidirectionnelle français-anglais',
      tech: 'API Hugging Face, Traduction IA, FastAPI, OpenCV, Authentification JWT, React, Next.js, Docker, PostgreSQL',
      link: 'https://zorohack.vercel.app/',
      theme: {
        name: 'cyber',
        image: '/zoro1.png',
        textColor: '#00ff88',
        accentColor: '#00ff88',
        titleFont: "'Space Grotesk', 'Courier New', monospace",
        bodyFont: "'JetBrains Mono', 'Courier New', monospace",
        effectClass: 'effect-cyber'
      }
    },
    {
      id: 2,
      name: 'ZoroXP - Sentiment Analysis',
      description: 'Une expérience utilisateur unique inspirée de Windows XP pour l\'analyse de sentiment IA.',
      tech: 'React, Next.js, Python, ML, JWT Auth, Hugging Face API, FastAPI, Docker',
      link: 'https://sentiment-analysis-frontend-vert.vercel.app/',
      theme: {
        name: 'retro',
        image: '/zoro2.png',
        textColor: '#003c74',
        accentColor: '#5c9dd8',
        titleFont: "'Tahoma', 'Verdana', sans-serif",
        bodyFont: "'Segoe UI', 'Tahoma', sans-serif",
        effectClass: 'effect-xp'
      }
    }
  ];

  const skills = [
    'Machine Learning',
    'Deep Learning',
    'React & Next.js',
    'Python & FastAPI',
    'TensorFlow & Keras',
    'Data Analysis'
  ];

  // Animation typing effect
  useEffect(() => {
    if (!isAnimating) return;

    const currentProject = projects[activeProject];
    setTypingText('');
    setTypingDesc('');

    let charIndex = 0;
    const fullText = currentProject.name;
    const fullDesc = currentProject.description;

    const typeTitle = () => {
      if (charIndex < fullText.length) {
        setTypingText(fullText.substring(0, charIndex + 1));
        charIndex++;
        typingTimeoutRef.current = setTimeout(typeTitle, 50);
      } else {
        // Start description after title
        let descIndex = 0;
        const typeDescription = () => {
          if (descIndex < fullDesc.length) {
            setTypingDesc(fullDesc.substring(0, descIndex + 1));
            descIndex++;
            typingTimeoutRef.current = setTimeout(typeDescription, 30);
          }
        };
        typingTimeoutRef.current = setTimeout(typeDescription, 200);
      }
    };

    typingTimeoutRef.current = setTimeout(typeTitle, 300);

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [activeProject, isAnimating]);

  const handleWheel = (e) => {
    if (isScrollingRef.current) return;
    
    const delta = e.deltaY;
    const threshold = 50;

    if (Math.abs(delta) > threshold) {
      isScrollingRef.current = true;

      if (delta > 0 && activeProject < projects.length - 1) {
        setActiveProject(prev => prev + 1);
      } else if (delta < 0 && activeProject > 0) {
        setActiveProject(prev => prev - 1);
      }

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1200);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' && activeProject < projects.length - 1) {
        setActiveProject(prev => prev + 1);
      } else if (e.key === 'ArrowUp' && activeProject > 0) {
        setActiveProject(prev => prev - 1);
      }
    };

    if (isVisible) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isVisible, activeProject, projects.length]);

  const handleProjectClick = (link) => {
    if (link && link !== '#') {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  if (!isVisible) return null;

  const currentTheme = projects[activeProject].theme;

  return (
    <div 
      className={`about-overlay ${isAnimating ? 'visible' : ''}`}
      style={{
        fontFamily: currentTheme.bodyFont
      }}
      onWheel={handleWheel}
      tabIndex={0}
    >
      {/* Background unifié avec effets thématiques */}
      <div className="background-layer">
        <div
          className="background-image"
          style={{
            backgroundImage: `url('/back1.jpg')`
          }}
        />
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`background-effect ${project.theme.effectClass} ${index === activeProject ? 'active' : ''}`}
          />
        ))}
      </div>

      {/* Images décoratives flottantes (hors navbar) */}
      <div className="floating-images">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`floating-image ${index === activeProject ? 'active' : ''}`}
            style={{
              opacity: index === activeProject ? 1 : 0
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={project.theme.image} 
              alt=""
            />
          </div>
        ))}
      </div>

      {/* Bouton de fermeture */}
      <button 
        className="close-button" 
        onClick={onClose} 
        aria-label="Fermer"
        style={{
          borderColor: `${currentTheme.textColor}40`,
          color: currentTheme.textColor
        }}
      >
        <X size={24} strokeWidth={1.5} />
      </button>

      {/* Container principal */}
      <div className="about-container">
        {/* Section header */}
        <div className="header-section">
          <div className="header-content">
            <h1 
              className="main-title" 
              style={{ 
                color: currentTheme.textColor,
                fontFamily: currentTheme.titleFont
              }}
            >
              Manal Farouqi
            </h1>
            <p className="main-subtitle" style={{ color: `${currentTheme.textColor}cc` }}>
              Développeuse IA & Data Science
            </p>
            <p className="main-description" style={{ color: `${currentTheme.textColor}99` }}>
              Spécialisée en Machine Learning et développement web moderne.
            </p>
          </div>

          {/* Compétences */}
          <div className="skills-container">
            <h2 className="section-label" style={{ color: `${currentTheme.textColor}99` }}>
              EXPERTISE
            </h2>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="skill-tag"
                  style={{
                    borderColor: `${currentTheme.accentColor}60`,
                    color: currentTheme.textColor,
                    background: `${currentTheme.accentColor}10`
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Section projets */}
        <div className="projects-section">
          <h2 className="section-label" style={{ color: `${currentTheme.textColor}99` }}>
            PROJETS SÉLECTIONNÉS
          </h2>

          <div className="project-display">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`project-card ${index === activeProject ? 'active' : ''}`}
                style={{
                  opacity: index === activeProject ? 1 : 0,
                  transform: index === activeProject ? 'translateY(0) scale(1)' :
                           index < activeProject ? 'translateY(-30px) scale(0.95)' :
                           'translateY(30px) scale(0.95)',
                  pointerEvents: index === activeProject ? 'auto' : 'none'
                }}
              >
                <div
                  className="project-link"
                  onClick={() => handleProjectClick(project.link)}
                  style={{
                    borderColor: `${project.theme.accentColor}40`,
                    background: `${project.theme.accentColor}08`,
                    cursor: project.link !== '#' ? 'pointer' : 'default'
                  }}
                >
                  <h3 
                    className="project-name" 
                    style={{ 
                      color: project.theme.textColor,
                      fontFamily: project.theme.titleFont
                    }}
                  >
                    {index === activeProject ? typingText : project.name}
                    {index === activeProject && typingText.length < project.name.length && (
                      <span className="cursor">|</span>
                    )}
                  </h3>
                  <p className="project-description" style={{ color: `${project.theme.textColor}cc` }}>
                    {index === activeProject ? typingDesc : project.description}
                  </p>
                  <p className="project-tech" style={{ color: `${project.theme.textColor}80` }}>
                    {project.tech}
                  </p>
                  {project.link !== '#' && (
                    <div className="project-arrow" style={{ color: project.theme.accentColor }}>
                      <ExternalLink size={18} strokeWidth={2} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation dots
          <div className="navigation-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === activeProject ? 'active' : ''}`}
                onClick={() => setActiveProject(index)}
                style={{
                  background: index === activeProject ? currentTheme.accentColor : 'transparent',
                  borderColor: currentTheme.accentColor
                }}
                aria-label={`Projet ${index + 1}`}
              />
            ))}
          </div> */}

          {/* Indicateur de scroll
          {activeProject < projects.length - 1 && (
            <div className="scroll-indicator" style={{ color: `${currentTheme.textColor}60` }}>
              <span>Scroll pour voir plus</span>
              <ChevronDown size={20} className="bounce" />
            </div>
          )} */}
        </div>
      </div>

      <style jsx>{`
        .about-overlay {
          position: fixed;
          inset: 0;
          z-index: 10000;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          outline: none;
        }

        .about-overlay.visible {
          opacity: 1;
          pointer-events: auto;
        }

        /* ============================================
           BACKGROUND UNIFIÉ AVEC EFFETS
           ============================================ */
        .background-layer {
          position: fixed;
          inset: 0;
          z-index: 1;
        }

        .background-image {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .background-effect {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }

        .background-effect.active {
          opacity: 1;
        }

        /* Effet Modern - Très léger et subtil */
        .effect-modern {
        background: 
            linear-gradient(135deg, 
            rgba(255, 255, 255, 0.3) 0%,   /* fond blanc très léger */
            rgba(230, 230, 240, 0.35) 100% /* gris clair subtil */
            ),
            radial-gradient(
            circle at 30% 40%, 
            rgba(167, 139, 250, 0.08) 0%, /* petite touche violet très douce */
            transparent 60%
            );
        backdrop-filter: blur(2px) brightness(1.05); /* effet flou et luminosité très léger */
        }


        /* Effet Cyber - Noir + Vert Matrix renforcé */
        .effect-cyber {
        background: 
            linear-gradient(180deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 30, 15, 0.9) 100%),  /* fond noir semi-transparent */
            repeating-linear-gradient(
            0deg, 
            transparent, transparent 2px, 
            rgba(0, 255, 136, 0.08) 2px,  /* vert Matrix plus visible */
            rgba(0, 255, 136, 0.08) 4px
            );
        backdrop-filter: blur(1px);
        }

        .effect-cyber::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(to bottom, 
            transparent 0%, 
            rgba(0, 255, 136, 0.1) 50%,  /* vert légèrement plus visible */
            transparent 100%
        );
        animation: scanline 3s linear infinite;
        }
        .effect-cyber::before { /* Utilisez ::before pour le bruit */
        content: '';
        position: absolute;
        inset: 0;
        /* Utilisation d'un filtre ou d'une texture de bruit */
        background-image: url("data:image/svg+xml,...noise..."); 
        opacity: 0.1; /* Bruit subtil */
        animation: glitch-anim 0.5s infinite alternate; /* Nouvelle animation */
    }

        @keyframes glitch-anim {
            0% { clip-path: inset(1% 0 99% 0); }
            50% { clip-path: inset(50% 0 50% 0); }
            100% { clip-path: inset(99% 0 1% 0); }
        }

        @keyframes scanline {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(100%); }
        }


        /* Effet Windows XP - Bleu aux bords mais beaucoup de beige au centre, fond semi-transparent */
        .effect-xp {
        background: 
            linear-gradient(135deg, 
            rgba(157, 199, 234, 0.6) 0%,   /* Bleu clair aux bords */
            rgba(236, 233, 216, 0.85) 50%,  /* Beige très visible */
            rgba(236, 233, 216, 0.85) 50%,  /* Beige très visible */
            rgba(184, 217, 245, 0.6) 100%  /* Bleu clair aux bords */
            ),
            radial-gradient(ellipse at 30% 20%, rgba(255, 250, 240, 0.35) 0%, transparent 50%), /* lumière crème douce */
            radial-gradient(ellipse at 70% 80%, rgba(184, 217, 245, 0.25) 0%, transparent 50%);  /* reflet bleu léger */
        backdrop-filter: blur(2px) saturate(1.3) brightness(1.15);
        }

        .effect-xp::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.55' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        opacity: 0.04;
        mix-blend-mode: overlay;
        }






        /* ============================================
           IMAGES FLOTTANTES DÉCORATIVES (HORS NAVBAR)
           ============================================ */
        .floating-images {
          position: fixed;
          top: 2rem;
          left: 50%;
          transform: translateX(-50%);
          width: 180px;
          height: 180px;
          z-index: 50;
          pointer-events: none;
          transition: transform 0.2s ease-out;
        }

        .floating-image {
          position: absolute;
          inset: 0;
          transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .floating-image img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 3px solid rgba(255, 255, 255, 0.3);
          object-fit: cover;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        }

        /* ============================================
           BOUTON DE FERMETURE
           ============================================ */
        .close-button {
          position: fixed;
          top: 2rem;
          right: 2rem;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          border: 1px solid;
          border-radius: 50%;
          cursor: pointer;
          z-index: 100;
          transition: all 0.3s ease;
          opacity: 0;
          transform: scale(0.8);
        }

        .about-overlay.visible .close-button {
          opacity: 1;
          transform: scale(1);
          transition-delay: 0.3s;
        }

        .close-button:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: scale(1.05);
        }

        .about-container {
          position: relative;
          z-index: 5;
          height: 100vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        /* ============================================
           HEADER SECTION
           ============================================ */
        .header-section {
          margin-top: 220px;
          padding: 2rem 2rem 1.5rem;
          text-align: center;
          opacity: 0;
          animation: fadeInUp 0.8s ease 0.3s forwards;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
          }
        }

        .main-title {
          font-size: 3rem;
          font-weight: 300;
          margin-bottom: 0.75rem;
          letter-spacing: -1.5px;
          transition: color 0.8s ease;
        }

        .main-subtitle {
          font-size: 0.9rem;
          margin-bottom: 1rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          font-weight: 500;
          transition: color 0.8s ease;
        }

        .main-description {
          font-size: 1.05rem;
          line-height: 1.7;
          max-width: 650px;
          margin: 0 auto;
          font-weight: 300;
          transition: color 0.8s ease;
        }

        .skills-container {
          margin-top: 2.5rem;
        }

        .section-label {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 3px;
          margin-bottom: 1.25rem;
          transition: color 0.8s ease;
        }

        .skills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.65rem;
          justify-content: center;
          max-width: 750px;
          margin: 0 auto;
        }

        .skill-tag {
          padding: 0.5rem 1rem;
          border: 1px solid;
          border-radius: 25px;
          font-size: 0.85rem;
          font-weight: 400;
          letter-spacing: 0.5px;
          transition: all 0.8s ease;
        }

        /* ============================================
           PROJECTS SECTION
           ============================================ */
        .projects-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 2rem;
          position: relative;
          opacity: 0;
          animation: fadeInUp 0.8s ease 0.5s forwards;
        }

        .project-display {
          position: relative;
          height: 220px;
          margin: 1.5rem 0;
        }

        .project-card {
          position: absolute;
          inset: 0;
          /* Augmenter la durée pour plus de fluidité, utiliser un easing plus dramatique */
          transition: all 1.2s cubic-bezier(0.8, 0, 0.2, 1); 
        }

        /* Ajouter une légère rotation 3D pour un effet de carte qui "tourne" en entrant/sortant */
        .project-card:not(.active) {
            transform: translateY(30px) scale(0.95) rotateX(10deg);
        }

        .project-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          height: 100%;
          padding: 2rem 2.5rem;
          border: 2px solid;
          border-radius: 20px;
          backdrop-filter: blur(10px);
          transition: all 0.5s ease;
          position: relative;
          overflow: hidden;
        }

        .project-link::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(255,255,255,0.08) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .project-link:hover::before {
          opacity: 1;
        }

        .project-link:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        }

        /* Animation Typing avec curseur */
        .project-name {
          font-size: 1.85rem;
          font-weight: 500;
          margin-bottom: 0.75rem;
          letter-spacing: 0.5px;
          transition: color 0.8s ease;
          min-height: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cursor {
          display: inline-block;
          margin-left: 2px;
          animation: blink 1s step-end infinite;
          color: ${currentTheme.textColor};
        }

        /* Thème Cyber - Curseur plus vert */
        .effect-cyber .cursor {
          background-color: #00ff88;
          width: 3px;
          height: 1.2em;
          display: inline-block;
          transform: translateY(2px);
          animation: blink 0.5s step-end infinite;
        }

        /* Thème Retro/XP - Curseur Bloc */
        .effect-xp .cursor {
          background-color: ${currentTheme.textColor}; 
          width: 8px; /* Plus large pour l'effet bloc */
          height: 1.2em;
          display: inline-block;
          animation: blink 0.8s step-end infinite;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .project-description {
          font-size: 1.05rem;
          margin-bottom: 0.75rem;
          font-weight: 300;
          transition: color 0.8s ease;
          min-height: 1.5rem;
        }

        .project-tech {
          font-size: 0.85rem;
          font-weight: 300;
          letter-spacing: 0.5px;
          transition: color 0.8s ease;
        }

        .project-arrow {
          position: absolute;
          bottom: 1.5rem;
          right: 1.5rem;
          opacity: 0.4;
          transition: all 0.3s ease;
        }

        .project-link:hover .project-arrow {
          opacity: 1;
          transform: translate(4px, -4px);
        }

        /* ============================================
           NAVIGATION
           ============================================ */
        .navigation-dots {
          display: flex;
          justify-content: center;
          gap: 0.85rem;
          margin-top: 1.5rem;
        }

        .dot {
          width: 45px;
          height: 4px;
          border: 1px solid;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .dot.active {
          width: 70px;
        }

        .dot:hover {
          opacity: 0.7;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          letter-spacing: 1px;
          opacity: 0.6;
        }

        .bounce {
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }

        /* ============================================
           RESPONSIVE
           ============================================ */
        @media (max-width: 768px) {
          .floating-images {
            width: 150px;
            height: 150px;
          }

          .header-section {
            margin-top: 190px;
            padding: 1.5rem 1rem 1rem;
          }

          .main-title {
            font-size: 2.25rem;
          }

          .main-description {
            font-size: 0.95rem;
          }

          .project-display {
            height: 240px;
          }

          .project-link {
            padding: 1.75rem 1.5rem;
          }

          .project-name {
            font-size: 1.5rem;
          }

          .project-description {
            font-size: 0.95rem;
          }

          .close-button {
            top: 1rem;
            right: 1rem;
            width: 44px;
            height: 44px;
          }

          .skills-grid {
            gap: 0.5rem;
          }

          .skill-tag {
            font-size: 0.8rem;
            padding: 0.45rem 0.85rem;
          }
        }
      `}</style>
    </div>
  );
}