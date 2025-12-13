'use client';

import { useState, useEffect } from 'react';
import { X, ExternalLink, FileText, Code, Sparkles } from 'lucide-react';

export default function AboutOverlay({ isOpen, onClose }) {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [isAnimating, setIsAnimating] = useState(false);

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

  if (!isVisible) return null;

  const projects = [
    {
      name: 'Détection Faciale & Émotions',
      description: 'Modèle CNN avec 95% de précision',
      tech: 'TensorFlow, Keras, FastAPI',
      link: '#',
      icon: Sparkles
    },
    {
      name: 'ZoroXP - Sentiment Analysis',
      description: 'Interface Windows XP nostalgique',
      tech: 'React, Next.js, IA',
      link: '#',
      icon: Code
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

  return (
    <div className={`about-overlay ${isAnimating ? 'visible' : ''}`}>
      {/* Background avec image */}
      <div className="about-background">
        <div className="background-image" />
        <div className="background-overlay" />
      </div>

      {/* Bouton de fermeture */}
      <button className="close-button" onClick={onClose} aria-label="Fermer">
        <X size={24} strokeWidth={1.5} />
      </button>

      {/* Contenu principal */}
      <div className="about-content">
        {/* Logo/Image Zoro */}
        <div className="logo-container">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/zoro.png" alt="Manal Farouqi" className="logo-image" />
        </div>

        {/* Présentation concise */}
        <div className="intro-section">
          <h1 className="intro-title">Manal Farouqi</h1>
          <p className="intro-role">Développeuse IA & Data Science</p>
          <p className="intro-description">
            Spécialisée en Machine Learning et développement web moderne.
            Passionnée par l&apos;innovation et la création d&apos;expériences utilisateur élégantes.
          </p>
        </div>

        {/* Compétences clés */}
        <div className="skills-section">
          <h2 className="section-title">Expertise</h2>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Projets sélectionnés */}
        <div className="projects-section">
          <h2 className="section-title">Projets Sélectionnés</h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <a
                key={index}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card"
              >
                <div className="project-icon">
                  <project.icon size={20} strokeWidth={1.5} />
                </div>
                <div className="project-info">
                  <h3 className="project-name">{project.name}</h3>
                  <p className="project-description">{project.description}</p>
                  <p className="project-tech">{project.tech}</p>
                </div>
                <ExternalLink size={16} className="project-arrow" />
              </a>
            ))}
          </div>
        </div>

        {/* Lien vers CV */}
        <div className="cv-section">
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="cv-button"
          >
            <FileText size={18} strokeWidth={1.5} />
            Télécharger mon CV
          </a>
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
        }

        .about-overlay.visible {
          opacity: 1;
          pointer-events: auto;
        }

        /* ============================================
           BACKGROUND
           ============================================ */
        .about-background {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .background-image {
          position: absolute;
          inset: 0;
          background-image: url('/back1.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          transform: scale(1.1);
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .about-overlay.visible .background-image {
          transform: scale(1);
        }

        .background-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
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
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          color: white;
          cursor: pointer;
          z-index: 10;
          transition: all 0.3s ease;
          opacity: 0;
          transform: scale(0.8) rotate(-90deg);
        }

        .about-overlay.visible .close-button {
          opacity: 1;
          transform: scale(1) rotate(0deg);
          transition-delay: 0.3s;
        }

        .close-button:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.05);
        }

        /* ============================================
           CONTENU PRINCIPAL
           ============================================ */
        .about-content {
          position: relative;
          z-index: 5;
          max-width: 900px;
          margin: 0 auto;
          padding: 4rem 2rem;
          height: 100vh;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        .about-content::-webkit-scrollbar {
          width: 8px;
        }

        .about-content::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }

        .about-content::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }

        /* ============================================
           LOGO/IMAGE
           ============================================ */
        .logo-container {
          display: flex;
          justify-content: center;
          margin-top: 2rem;
          opacity: 0;
          transform: scale(0.8) translateY(30px);
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .about-overlay.visible .logo-container {
          opacity: 1;
          transform: scale(1) translateY(0);
          transition-delay: 0.2s;
        }

        .logo-image {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 3px solid rgba(255, 255, 255, 0.2);
          object-fit: cover;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        /* ============================================
           INTRODUCTION
           ============================================ */
        .intro-section {
          text-align: center;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .about-overlay.visible .intro-section {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.3s;
        }

        .intro-title {
          font-size: 3rem;
          font-weight: 300;
          color: white;
          margin-bottom: 0.5rem;
          letter-spacing: -1px;
        }

        .intro-role {
          font-size: 1.125rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 1rem;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-weight: 400;
          font-size: 0.875rem;
        }

        .intro-description {
          font-size: 1.125rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.7;
          max-width: 600px;
          margin: 0 auto;
          font-weight: 300;
        }

        /* ============================================
           SECTIONS
           ============================================ */
        .section-title {
          font-size: 1.25rem;
          font-weight: 400;
          color: white;
          margin-bottom: 1.5rem;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-size: 0.875rem;
          text-align: center;
        }

        /* ============================================
           COMPÉTENCES
           ============================================ */
        .skills-section {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .about-overlay.visible .skills-section {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.4s;
        }

        .skills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          justify-content: center;
        }

        .skill-tag {
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 20px;
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.875rem;
          font-weight: 300;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
        }

        .skill-tag:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
        }

        /* ============================================
           PROJETS
           ============================================ */
        .projects-section {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .about-overlay.visible .projects-section {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.5s;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        .project-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: white;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .project-card:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateX(8px);
        }

        .project-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          flex-shrink: 0;
        }

        .project-info {
          flex: 1;
        }

        .project-name {
          font-size: 1rem;
          font-weight: 500;
          margin-bottom: 0.25rem;
          letter-spacing: 0.3px;
        }

        .project-description {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 0.25rem;
          font-weight: 300;
        }

        .project-tech {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 300;
        }

        .project-arrow {
          color: rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
        }

        .project-card:hover .project-arrow {
          color: white;
          transform: translateX(4px);
        }

        /* ============================================
           BOUTON CV
           ============================================ */
        .cv-section {
          display: flex;
          justify-content: center;
          padding-bottom: 2rem;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .about-overlay.visible .cv-section {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.6s;
        }

        .cv-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          background: white;
          color: #1a1a1a;
          text-decoration: none;
          border-radius: 4px;
          font-weight: 500;
          font-size: 0.875rem;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
        }

        .cv-button:hover {
          background: rgba(255, 255, 255, 0.9);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        /* ============================================
           RESPONSIVE
           ============================================ */
        @media (max-width: 768px) {
          .about-content {
            padding: 3rem 1.5rem;
            gap: 2rem;
          }

          .logo-image {
            width: 100px;
            height: 100px;
          }

          .intro-title {
            font-size: 2rem;
          }

          .intro-description {
            font-size: 1rem;
          }

          .close-button {
            top: 1rem;
            right: 1rem;
            width: 40px;
            height: 40px;
          }

          .project-card {
            padding: 1.25rem;
          }

          .project-icon {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>
    </div>
  );
}