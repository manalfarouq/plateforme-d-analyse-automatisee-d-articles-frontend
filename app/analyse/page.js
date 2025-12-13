/* app/analyse/analyze.page.js */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '../../components/ProtectedRoute';
import { authService, analyseService } from '../services/api';
import styles from './analyze.module.css';

function AnalyzeContent() {
  const router = useRouter();
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const user = authService.getToken() 
      ? (localStorage.getItem('username') || 'Utilisateur') 
      : 'Utilisateur';
    setUsername(user);
    loadHistory();
    
    // Debug: vérifier que le composant se monte
    console.log('AnalyzeContent mounted');
  }, []);

  const loadHistory = async () => {
    try {
      const data = await analyseService.getHistory();
      setHistory(Array.isArray(data) ? data : (data.historique || []));
      console.log('History loaded:', data);
    } catch (err) {
      console.error('Erreur historique:', err);
    }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    
    if (!text.trim()) {
      setError('Veuillez entrer un texte à analyser');
      return;
    }

    setError('');
    setLoading(true);
    setResult(null);

    try {
      const data = await analyseService.analyzeText(text);
      setResult(data);
      setText('');
      await loadHistory();
    } catch (err) {
      setError(err.message);
      if (err.message.includes('Session expirée')) {
        setTimeout(() => router.push('/auth'), 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    router.push('/auth');
  };

  const getSentimentClass = (sentiment) => {
    if (sentiment === 'positive' || sentiment === 'positif') {
      return `${styles.sentimentBadge} ${styles.sentimentPositive}`;
    }
    if (sentiment === 'negative' || sentiment === 'negatif') {
      return `${styles.sentimentBadge} ${styles.sentimentNegative}`;
    }
    return `${styles.sentimentBadge} ${styles.sentimentNeutral}`;
  };

  return (
    <div className={styles.analyzeContainer}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <h1>Analyser un texte</h1>
          <p>Connecté en tant que {username}</p>
        </div>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Déconnexion
        </button>
      </div>

      {/* Formulaire */}
      <div className={styles.formSection}>
        <h2>Nouvelle analyse</h2>
        
        <form onSubmit={handleAnalyze} className={styles.analyzeForm}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Entrez votre texte ici..."
            required
            rows="6"
            className={styles.textarea}
          />

          <button 
            type="submit" 
            disabled={loading}
            className={styles.submitButton}
          >
            {loading ? 'Analyse en cours...' : 'Analyser'}
          </button>
        </form>

        {error && (
          <div className={styles.errorMessage}>
            ⚠️ {error}
          </div>
        )}

        {result && (
          <div className={styles.resultBox}>
            <h3>✓ Résultat de l&apos;analyse</h3>
            
            {result.classification && (
              <>
                <p className={styles.resultItem}>
                  <strong>Catégorie :</strong> {result.classification.categorie || 'Non définie'}
                </p>
                <p className={styles.resultItem}>
                  <strong>Score :</strong> {result.classification.score || 'N/A'}
                </p>
              </>
            )}
            
            {result.resume && (
              <p className={styles.resultItem}>
                <strong>Résumé :</strong> {result.resume}
              </p>
            )}
            
            {result.ton && (
              <p className={styles.resultItem}>
                <strong>Ton :</strong> {result.ton}
              </p>
            )}

            {/* Afficher autres propriétés */}
            {Object.keys(result).filter(key => 
              !['classification', 'resume', 'ton'].includes(key)
            ).map(key => (
              <p key={key} className={styles.resultItem}>
                <strong>{key} :</strong> {
                  typeof result[key] === 'object' 
                    ? JSON.stringify(result[key]) 
                    : String(result[key])
                }
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Historique */}
      <div className={styles.historySection}>
        <h2>Historique des analyses</h2>
        
        {history.length === 0 ? (
          <p className={styles.emptyHistory}>Aucune analyse pour le moment</p>
        ) : (
          <div>
            {history.map((item, index) => (
              <div key={item.id || index} className={styles.historyItem}>
                <p className={styles.historyDate}>
                  {item.date ? new Date(item.date).toLocaleString('fr-FR') : 'Date inconnue'}
                </p>
                
                <p className={styles.historyText}>
                  <strong>Texte :</strong> {
                    (item.texte_original || item.text || '').substring(0, 100)
                  }{(item.texte_original || item.text || '').length > 100 ? '...' : ''}
                </p>
                
                {item.categorie && (
                  <p className={styles.historyText}>
                    <strong>Catégorie :</strong> {item.categorie}
                  </p>
                )}

                {item.ton && (
                  <p className={styles.historyText}>
                    <strong>Ton :</strong> {item.ton}
                  </p>
                )}
                
                {item.resume && (
                  <p className={styles.historyText}>
                    <strong>Résumé :</strong> {item.resume.substring(0, 150)}
                    {item.resume.length > 150 ? '...' : ''}
                  </p>
                )}
                
                {item.sentiment && (
                  <span className={getSentimentClass(item.sentiment)}>
                    {item.sentiment}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AnalysePage() {
  return (
    <ProtectedRoute>
      <AnalyzeContent />
    </ProtectedRoute>
  );
}