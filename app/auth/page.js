// app/auth/page.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../services/api';

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        // Connexion
        const response = await authService.signin(
          formData.username,
          formData.password
        );
        console.log('✅ Connexion réussie:', response);
        router.push('/analyse');
      } else {
        // Inscription
        await authService.signup(
          formData.username,
          formData.email,
          formData.password
        );
        console.log('Inscription réussie');
        
        // Connexion automatique après inscription
        await authService.signin(formData.username, formData.password);
        router.push('/analyse');
      }
    } catch (err) {
      console.error('Erreur:', err);
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f9fafb',
      padding: '1rem'
    }}>
      <div style={{
        maxWidth: '400px',
        width: '100%',
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <h1 style={{
          fontSize: '1.875rem',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '0.5rem',
          color: '#111827'
        }}>
          Plateforme d&apos;Analyse
        </h1>
        
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          textAlign: 'center',
          marginBottom: '2rem',
          color: '#4f46e5'
        }}>
          {isLogin ? 'Connexion' : 'Inscription'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Nom d&apos;utilisateur
            </label>
            <input
              name="username"
              type="text"
              required
              style={{
                width: '100%',
                padding: '0.625rem',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '0.875rem',
                color: '#111827'
              }}
              placeholder="Votre nom d'utilisateur"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          
          {!isLogin && (
            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                style={{
                  width: '100%',
                  padding: '0.625rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                  color: '#111827'
                }}
                placeholder="votre.email@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          )}
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Mot de passe
            </label>
            <input
              name="password"
              type="password"
              required
              style={{
                width: '100%',
                padding: '0.625rem',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '0.875rem',
                color: '#111827'
              }}
              placeholder="Votre mot de passe"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {error && (
            <div style={{
              padding: '0.75rem',
              backgroundColor: '#fee2e2',
              border: '1px solid #fecaca',
              borderRadius: '4px',
              marginBottom: '1rem'
            }}>
              <p style={{
                fontSize: '0.875rem',
                color: '#991b1b',
                margin: 0
              }}>
                ⚠️ {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.625rem',
              backgroundColor: loading ? '#9ca3af' : '#4f46e5',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            {loading ? 'Chargement...' : (isLogin ? 'Se connecter' : 'S&apos;inscrire')}
          </button>

          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setFormData({ username: '', email: '', password: '' });
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#4f46e5',
                fontSize: '0.875rem',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              {isLogin ? 'Pas de compte ? S&apos;inscrire' : 'Déjà un compte ? Se connecter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}