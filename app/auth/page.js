'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../services/api';
import styles from './auth.module.css';

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loadingComplete, setLoadingComplete] = useState(false);
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoadingComplete(true), 1000);
    return () => clearTimeout(timer);
  }, []);

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
        await authService.signin(formData.username, formData.password);
        router.push('/analyse');
      } else {
        await authService.signup(formData.username, formData.email, formData.password);
        await authService.signin(formData.username, formData.password);
        router.push('/analyse');
      }
    } catch (err) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      {/* Background */}
      <div className={`${styles.backgroundContainer} ${loadingComplete ? styles.visible : ''}`}>
        <div className={styles.backgroundImage}></div>
      </div>

      {/* Card */}
      <div className={styles.authCard}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>
            {isLogin ? 'Connexion' : 'Inscription'}
          </h2>
          <p className={styles.cardDescription}>
            {isLogin ? "Accédez à votre espace d'analyse" : 'Créez votre compte pour commencer'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Nom d&apos;utilisateur</label>
            <input
              name="username"
              type="text"
              required
              className={styles.formInput}
              placeholder="Votre nom d'utilisateur"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          {!isLogin && (
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Email</label>
              <input
                name="email"
                type="email"
                required
                className={styles.formInput}
                placeholder="votre.email@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          )}

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Mot de passe</label>
            <input
              name="password"
              type="password"
              required
              className={styles.formInput}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {error && (
            <div className={styles.errorMessage}>
              <span className={styles.errorIcon}>⚠</span>
              <span>{error}</span>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading} 
            className={`${styles.submitButton} ${loading ? styles.loading : ''}`}
          >
            {loading ? (
              <>
                <span className={styles.spinner} />
                <span>Traitement...</span>
              </>
            ) : (
              isLogin ? 'Se connecter' : "S'inscrire"
            )}
          </button>

          <div className={styles.toggleSection}>
            <span className={styles.toggleText}>
              {isLogin ? 'Pas encore de compte ?' : 'Déjà inscrit ?'}
            </span>
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setFormData({ username: '', email: '', password: '' });
              }}
              className={styles.toggleButton}
            >
              {isLogin ? 'Créer un compte' : 'Se connecter'}
            </button>
          </div>
        </form>
      </div>

      <p className={styles.authFooter}>
        Designed by Manal, from Morocco with love
      </p>
    </div>
  );
}