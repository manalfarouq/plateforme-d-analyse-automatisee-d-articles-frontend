// components/Header.js
'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authService } from '../app/services/api';
import { useState, useEffect } from 'react';

export default function Header() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      // Mettre à jour seulement si l'état a changé
      if (authenticated !== isAuth) {
        setIsAuth(authenticated);
      }
    };
    
    checkAuth();
    
    window.addEventListener('storage', checkAuth);
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, [isAuth]);

  const handleLogout = () => {
    authService.logout();
    setIsAuth(false);
    router.push('/auth');
  };

  return (
    <header style={{ 
      borderBottom: '1px solid #e5e7eb', /* Ligne de séparation très claire */
      padding: '15px 30px', /* Plus d'espace sur les côtés */
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white', /* Fond blanc propre */
      position: 'sticky', /* Rendre le header flottant */
      top: 0,
      zIndex: 20,
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    }}>
      <h1 style={{ 
        margin: 0, 
        fontSize: '1.5rem',
        fontWeight: '700',
        fontFamily: "'EB Garamond', serif",
        color: '#1f2937'
      }}>
        Hybrid<span style={{color: '#4f46e5'}}>Analyzer</span>
      </h1>
      
      <nav style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
        <NavLink href="/">Accueil</NavLink>
        
        {isAuth ? (
          <>
            <NavLink href="/analyse">Analyser</NavLink>
            <button 
              onClick={handleLogout} 
              style={{ 
                padding: '8px 15px',
                cursor: 'pointer',
                border: '1px solid #ef4444', 
                borderRadius: '4px',
                background: '#ef4444',
                color: 'white',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}
            >
              Déconnexion
            </button>
          </>
        ) : (
          <NavLink href="/auth" primary>Connexion</NavLink>
        )}
      </nav>
    </header>
  );
}

// Composant interne pour styliser les liens de navigation
const NavLink = ({ href, children, primary }) => {
  const linkStyle = {
    color: primary ? '#4f46e5' : '#4b5563',
    fontWeight: primary ? '600' : '400',
    fontSize: '0.95rem',
    textDecoration: 'none',
    transition: 'color 0.2s',
    padding: primary ? '5px 10px' : '0' 
  };
  
  const hoverStyle = {
    color: primary ? '#6366f1' : '#1f2937',
    textDecoration: primary ? 'none' : 'underline'
  };

  return (
    <Link href={href}>
      <span 
        style={linkStyle}
        onMouseEnter={e => {
          Object.assign(e.target.style, hoverStyle);
          e.target.style.cursor = 'pointer';
        }}
        onMouseLeave={e => Object.assign(e.target.style, linkStyle)}
      >
        {children}
      </span>
    </Link>
  );
};