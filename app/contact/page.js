'use client';

import { useState } from 'react';
import { Mail, Linkedin, Github, MapPin, Send, ArrowRight } from 'lucide-react';
import AboutOverlay from '../../components/AboutOverlay';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showAbout, setShowAbout] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      label: 'EMAIL',
      value: 'farouqimanal@gmail.com',
      link: 'mailto:farouqimanal@gmail.com',
      color: '#ea4335'
    },
    {
      icon: Linkedin,
      label: 'LINKEDIN',
      value: 'linkedin.com/in/manal-farouqi',
      link: 'https://www.linkedin.com/in/manal-farouqi/',
      color: '#0077b5'
    },
    {
      icon: Github,
      label: 'GITHUB',
      value: 'github.com/manalfarouq',
      link: 'https://github.com/manalfarouq',
      color: '#333'
    },
    {
      icon: MapPin,
      label: 'LOCATION',
      value: 'Agadir, Morocco',
      link: null,
      color: '#10b981'
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
  <div className="contact-page">
    <div className="contact-container">
      {/* Header */}
      <div className="contact-header">
        <h1 className="contact-title">
          <span className="title-line">Restons en</span>
          <span className="title-line highlight">Contact</span>
        </h1>

        {/* Lien "En savoir plus" */}
        <div className="about-link-section">
          <button 
            className="about-link"
            onClick={() => setShowAbout(true)}
          >
            <span>En savoir plus sur la développeuse</span>
            <ArrowRight size={16} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>


        <div className="content-wrapper">
          {/* Contact Info Cards */}
          <div className="contact-info-section">
            <h2 className="section-title">Informations de contact</h2>
            <div className="info-cards">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link || '#'}
                  target={info.link ? '_blank' : undefined}
                  rel={info.link ? 'noopener noreferrer' : undefined}
                  className={`info-card ${!info.link ? 'no-link' : ''}`}
                  style={{ '--accent-color': info.color }}
                >
                  <div className="icon-wrapper">
                    <info.icon size={20} strokeWidth={1.5} />
                  </div>
                  <div className="info-content">
                    <span className="info-label">{info.label}</span>
                    <span className="info-value">{info.value}</span>
                  </div>
                  {info.link && (
                    <div className="link-arrow">→</div>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-section">
            <h2 className="section-title">Envoyez un message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Nom complet</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Sujet</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Objet de votre message"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Écrivez votre message ici..."
                  rows="6"
                  required
                />
              </div>

              <button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send size={16} strokeWidth={2} />
                    Envoyer le message
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="success-message">
                  ✓ Message envoyé avec succès !
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="error-message">
                  ✗ Erreur lors de l envoi. Veuillez réessayer.
                </div>
              )}
            </form>
          </div>
        </div>
        
            
      {/* About Overlay */}
      <AboutOverlay isOpen={showAbout} onClose={() => setShowAbout(false)} />

      <style jsx>{`
        .contact-page {
          min-height: 100vh;
          padding: 8rem 2rem 4rem;
          position: relative;
          z-index: 10;
        }

        .contact-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* ============================================
           HEADER
           ============================================ */
        .contact-header {
          text-align: center;
          margin-bottom: 4rem;
          animation: fadeInDown 0.8s ease forwards;
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .contact-title {
          font-size: 3.5rem;
          font-weight: 300;
          line-height: 1.2;
          margin-bottom: 1rem;
          color: white;
          letter-spacing: -1px;
        }

        .title-line {
          display: block;
        }

        .title-line.highlight {
          font-weight: 600;
          letter-spacing: -2px;
        }

        .contact-subtitle {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 300;
          letter-spacing: 0.5px;
        }

        /* ============================================
           CONTENT WRAPPER
           ============================================ */
        .content-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          animation: fadeInUp 0.8s ease 0.2s forwards;
          opacity: 0;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .section-title {
          font-size: 1.25rem;
          font-weight: 400;
          color: white;
          margin-bottom: 1.5rem;
          letter-spacing: 1px;
        }

        /* ============================================
           INFO CARDS - Style minimaliste élégant
           ============================================ */
        .info-cards {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .info-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 4px;
          text-decoration: none;
          color: white;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .info-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--accent-color) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .info-card:hover:not(.no-link) {
          background: rgba(255, 255, 255, 0.06);
          border-color: var(--accent-color);
          transform: translateX(4px);
        }

        .info-card:hover:not(.no-link)::before {
          opacity: 0.1;
        }

        .info-card.no-link {
          cursor: default;
        }

        .icon-wrapper {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          flex-shrink: 0;
          position: relative;
          z-index: 1;
          transition: all 0.3s ease;
        }

        .info-card:hover .icon-wrapper {
          background: var(--accent-color);
          transform: scale(1.1) rotate(5deg);
        }

        .info-content {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          flex: 1;
          position: relative;
          z-index: 1;
        }

        .info-label {
          font-size: 0.65rem;
          color: rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          font-weight: 400;
        }

        .info-value {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.85);
          font-weight: 300;
          letter-spacing: 0.3px;
        }

        .link-arrow {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
        }

        .info-card:hover .link-arrow {
          color: var(--accent-color);
          transform: translateX(4px);
        }

        /* ============================================
           CONTACT FORM - Style minimaliste
           ============================================ */
        .contact-form {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 4px;
          padding: 2rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 0.5rem;
          font-weight: 400;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.875rem 1rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 4px;
          color: white;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          font-family: inherit;
          font-weight: 300;
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: rgba(255, 255, 255, 0.25);
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.05);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .submit-button {
          width: 100%;
          padding: 1rem;
          background: white;
          border: none;
          border-radius: 4px;
          color: #1a1a1a;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .submit-button:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.9);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }

        .submit-button:active:not(:disabled) {
          transform: translateY(0);
        }

        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(26, 26, 26, 0.2);
          border-top-color: #1a1a1a;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .success-message,
        .error-message {
          margin-top: 1rem;
          padding: 0.875rem;
          border-radius: 4px;
          font-size: 0.8rem;
          text-align: center;
          animation: slideIn 0.3s ease;
          letter-spacing: 0.5px;
        }

        .success-message {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
          color: #10b981;
        }

        .error-message {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ============================================
           LIEN "EN SAVOIR PLUS"
           ============================================ */
        .about-link-section {
          text-align: center;
          margin-top: 4rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          animation: fadeInUp 0.8s ease 0.4s forwards;
          opacity: 0;
        }

        .about-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0;
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
          font-weight: 300;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 0.5px;
        }

        .about-link:hover {
          color: white;
          gap: 0.75rem;
        }

        .about-link:hover :global(svg) {
          transform: translateX(4px);
        }

        .about-link :global(svg) {
          transition: transform 0.3s ease;
        }

        /* ============================================
           RESPONSIVE
           ============================================ */
        @media (max-width: 968px) {
          .content-wrapper {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .contact-title {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 640px) {
          .contact-page {
            padding: 6rem 1rem 3rem;
          }

          .contact-title {
            font-size: 2rem;
          }

          .contact-subtitle {
            font-size: 0.9rem;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .contact-form {
            padding: 1.5rem;
          }

          .info-card {
            padding: 1rem;
          }

          .icon-wrapper {
            width: 36px;
            height: 36px;
          }

          .about-link-section {
            margin-top: 3rem;
          }
        }
      `}</style>
    </div>
  );
}