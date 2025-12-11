'use client';

import { useRouter } from 'next/navigation';
import { authService } from './services/api';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [isAuth] = useState(() => {
    if (typeof window !== 'undefined') {
      return authService.isAuthenticated();
    }
    return false;
  });

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Bienvenue sur la Plateforme d&apos;Analyse</h1>
      <p style={{ margin: '20px 0' }}>
        Analysez vos textes avec l&apos;IA
      </p>

      <div style={{ marginTop: '40px' }}>
        {isAuth ? (
          <button 
            onClick={() => router.push('/analyse')}
            style={{ 
              padding: '10px 20px', 
              fontSize: '16px',
              cursor: 'pointer',
              border: '1px solid #333',
              background: 'white'
            }}
          >
            Commencer l&apos;analyse
          </button>
        ) : (
          <button 
            onClick={() => router.push('/auth')}
            style={{ 
              padding: '10px 20px', 
              fontSize: '16px',
              cursor: 'pointer',
              border: '1px solid #333',
              background: 'white'
            }}
          >
            Se connecter
          </button>
        )}
      </div>
    </div>
  );
}