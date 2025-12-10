// app/analyze/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '../../components/ProtectedRoute';
import { authService, analyseService } from '../services/api';

function AnalyzeContent() {
  const router = useRouter();
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Récupérer le username
    const user = authService.getToken() ? (localStorage.getItem('username') || 'Utilisateur') : 'Utilisateur';
    setUsername(user);
    
    // Charger l'historique
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await analyseService.getHistory();
      // Le backend peut retourner différents formats
      setHistory(Array.isArray(data) ? data : (data.historique || []));
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
      // Si session expirée, rediriger vers auth
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

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px' 
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '30px',
        borderBottom: '2px solid #333',
        paddingBottom: '15px'
      }}>
        <div>
          <h1 style={{ margin: 0 }}>Analyser un texte</h1>
          <p style={{ margin: '5px 0 0 0', color: '#666' }}>
            Connecté en tant que {username}
          </p>
        </div>
        <button 
          onClick={handleLogout}
          style={{ 
            padding: '8px 16px', 
            fontSize: '14px',
            cursor: 'pointer',
            border: '1px solid #dc2626',
            background: '#dc2626',
            color: 'white',
            borderRadius: '4px'
          }}
        >
          Déconnexion
        </button>
      </div>

      {/* Formulaire d'analyse */}
      <div style={{ 
        background: '#f9fafb',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        border: '1px solid #e5e7eb'
      }}>
        <h2 style={{ marginTop: 0 }}>Nouvelle analyse</h2>
        
        <form onSubmit={handleAnalyze}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Entrez votre texte ici..."
            required
            rows="6"
            style={{ 
              width: '100%', 
              padding: '12px', 
              fontSize: '14px',
              marginBottom: '15px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
          />

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              padding: '10px 20px', 
              fontSize: '16px',
              cursor: loading ? 'not-allowed' : 'pointer',
              border: 'none',
              background: loading ? '#9ca3af' : '#4f46e5',
              color: 'white',
              borderRadius: '4px',
              fontWeight: '500'
            }}
          >
            {loading ? 'Analyse en cours...' : 'Analyser'}
          </button>
        </form>

        {error && (
          <div style={{ 
            color: '#dc2626', 
            marginTop: '15px',
            padding: '12px',
            background: '#fee2e2',
            border: '1px solid #fecaca',
            borderRadius: '4px'
          }}>
            ⚠️ {error}
          </div>
        )}

        {result && (
          <div style={{ 
            marginTop: '25px', 
            padding: '20px', 
            border: '1px solid #a7f3d0',
            background: '#ecfdf5',
            borderRadius: '4px'
          }}>
            <h3 style={{ marginTop: 0, color: '#065f46' }}>✓ Résultat de l&apos;analyse</h3>
            
            {result.classification && (
              <>
                <p style={{ marginBottom: '8px' }}>
                  <strong>Catégorie :</strong> {result.classification.categorie || 'Non définie'}
                </p>
                <p style={{ marginBottom: '8px' }}>
                  <strong>Score :</strong> {result.classification.score || 'N/A'}
                </p>
              </>
            )}
            
            {result.resume && (
              <p style={{ marginBottom: '8px' }}>
                <strong>Résumé :</strong> {result.resume}
              </p>
            )}
            
            {result.ton && (
              <p style={{ marginBottom: '8px' }}>
                <strong>Ton :</strong> {result.ton}
              </p>
            )}

            {/* Afficher toutes les autres propriétés */}
            {Object.keys(result).filter(key => 
              !['classification', 'resume', 'ton'].includes(key)
            ).map(key => (
              <p key={key} style={{ marginBottom: '8px' }}>
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
      <div style={{
        background: '#f9fafb',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
      }}>
        <h2 style={{ marginTop: 0 }}>Historique des analyses</h2>
        
        {history.length === 0 ? (
          <p style={{ color: '#6b7280' }}>Aucune analyse pour le moment</p>
        ) : (
          <div>
            {history.map((item, index) => (
              <div 
                key={item.id || index} 
                style={{ 
                  padding: '15px', 
                  border: '1px solid #d1d5db',
                  background: 'white',
                  marginBottom: '12px',
                  borderRadius: '4px'
                }}
              >
                <p style={{ 
                  fontSize: '12px', 
                  color: '#6b7280',
                  marginBottom: '8px'
                }}>
                  {item.date ? new Date(item.date).toLocaleString('fr-FR') : 'Date inconnue'}
                </p>
                
                <p style={{ marginBottom: '8px' }}>
                  <strong>Texte :</strong> {
                    (item.texte_original || item.text || '')
                      .substring(0, 100)
                  }{(item.texte_original || item.text || '').length > 100 ? '...' : ''}
                </p>
                
                {item.categorie && (
                  <p style={{ marginBottom: '8px' }}>
                    <strong>Catégorie :</strong> {item.categorie}
                  </p>
                )}
                
                {item.ton && (
                  <p style={{ marginBottom: '8px' }}>
                    <strong>Ton :</strong> {item.ton}
                  </p>
                )}
                
                {item.resume && (
                  <p style={{ marginBottom: '8px' }}>
                    <strong>Résumé :</strong> {item.resume.substring(0, 150)}
                    {item.resume.length > 150 ? '...' : ''}
                  </p>
                )}

                {item.sentiment && (
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 8px',
                    fontSize: '12px',
                    borderRadius: '12px',
                    background: 
                      item.sentiment === 'positive' || item.sentiment === 'positif' ? '#d1fae5' :
                      item.sentiment === 'negative' || item.sentiment === 'negatif' ? '#fee2e2' :
                      '#f3f4f6',
                    color:
                      item.sentiment === 'positive' || item.sentiment === 'positif' ? '#065f46' :
                      item.sentiment === 'negative' || item.sentiment === 'negatif' ? '#991b1b' :
                      '#374151'
                  }}>
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