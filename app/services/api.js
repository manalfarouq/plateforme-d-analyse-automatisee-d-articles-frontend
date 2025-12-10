// app/services/api.js

// const AUTH_API_URL = 'http://127.0.0.1:8000';
// const ANALYSE_API_URL = 'http://127.0.0.1:8001';

const AUTH_API_URL = '/api/auth';     
const ANALYSE_API_URL = '/api/analyse';

// ============= SERVICE AUTH =============

export const authService = {
  // Inscription
  signup: async (username, email, password) => {
    try {
      const response = await fetch(`${AUTH_API_URL}/Signup`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Erreur lors de l\'inscription');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur signup:', error);
      throw error;
    }
  },

  // Connexion
  signin: async (username, password) => {
    try {
      const response = await fetch(`${AUTH_API_URL}/Login`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Erreur de connexion');
      }

      const data = await response.json();
      
      // Sauvegarder le token dans localStorage
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', username);
      }

      return data;
    } catch (error) {
      console.error('Erreur signin:', error);
      throw error;
    }
  },

  // Déconnexion
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  },

  // Récupérer le token
  getToken: () => {
    return localStorage.getItem('token');
  },

  // Vérifier si l'utilisateur est connecté
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

// ============= SERVICE ANALYSE =============

export const analyseService = {
  // Analyse complète d'un texte
  analyzeText: async (text) => {
    const token = authService.getToken();
    
    if (!token) {
      throw new Error('Vous devez être connecté pour analyser un texte');
    }

    try {
      const response = await fetch(`${ANALYSE_API_URL}/AnalyzeComplet`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          authService.logout();
          throw new Error('Session expirée. Veuillez vous reconnecter.');
        }
        const error = await response.json();
        throw new Error(error.detail || 'Erreur lors de l\'analyse');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur analyze:', error);
      throw error;
    }
  },

  // Récupérer l'historique des analyses
  getHistory: async () => {
    const token = authService.getToken();
    
    if (!token) {
      throw new Error('Vous devez être connecté pour voir l\'historique');
    }

    try {
      const response = await fetch(`${ANALYSE_API_URL}/history`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'token': token,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          authService.logout();
          throw new Error('Session expirée. Veuillez vous reconnecter.');
        }
        const error = await response.json();
        throw new Error(error.detail || 'Erreur lors de la récupération de l\'historique');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur getHistory:', error);
      throw error;
    }
  },

  // Filtrer les analyses
  filterAnalyses: async () => {
    const token = authService.getToken();
    
    if (!token) {
      throw new Error('Vous devez être connecté pour filtrer les analyses');
    }

    try {
      const response = await fetch(`${ANALYSE_API_URL}/filtrer_analyses`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'token': token,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          authService.logout();
          throw new Error('Session expirée. Veuillez vous reconnecter.');
        }
        const error = await response.json();
        throw new Error(error.detail || 'Erreur lors du filtrage');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur filterAnalyses:', error);
      throw error;
    }
  }
};