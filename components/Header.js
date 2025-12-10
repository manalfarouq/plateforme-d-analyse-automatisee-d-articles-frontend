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
    // Vérifier l'authentification uniquement côté client
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      if (authenticated !== isAuth) {
        setIsAuth(authenticated);
      }
    };
    
    checkAuth();
    
    // Écouter les changements dans localStorage
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
      borderBottom: '1px solid #ddd', 
      padding: '20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h1 style={{ margin: 0 }}>Plateforme d&apos;Analyse</h1>
      
      <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link href="/" style={{ cursor: 'pointer' }}>Accueil</Link>
        
        {isAuth ? (
          <>
            <Link href="/analyse" style={{ cursor: 'pointer' }}>Analyser</Link>
            <button 
              onClick={handleLogout} 
              style={{ 
                padding: '5px 15px',
                cursor: 'pointer',
                border: '1px solid #333',
                background: 'white'
              }}
            >
              Déconnexion
            </button>
          </>
        ) : (
          <Link href="/auth" style={{ cursor: 'pointer' }}>Connexion</Link>
        )}
      </nav>
    </header>
  );
}