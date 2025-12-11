// app/services/api.js

const AUTH_API_URL = '/api/auth';
const ANALYSE_API_URL = '/api/analyse';

// ============= SERVICE AUTH =============

export const authService = {
  signup: async (username, email, password) => {
    try {
      const response = await fetch(`${AUTH_API_URL}/Signup`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
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

  signin: async (username, password) => {
    try {
      const response = await fetch(`${AUTH_API_URL}/Login`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Erreur de connexion');
      }

      const data = await response.json();
      
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

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

// ============= SERVICE ANALYSE =============

export const analyseService = {
  analyzeText: async (text) => {
    const token = authService.getToken();
    
    if (!token) {
      throw new Error('Vous devez être connecté pour analyser un texte');
    }

    try {
      // ✅ Utiliser le bon endpoint : /AnalyzeComplet
      const response = await fetch(`${ANALYSE_API_URL}/AnalyzeComplet`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'token': token, // ✅ Envoyer le token dans le header
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text }), // ✅ Changé de "texte" à "text"
      });

      if (!response.ok) {
        if (response.status === 401) {
          authService.logout();
          throw new Error('Session expirée. Veuillez vous reconnecter.');
        }
        const error = await response.json();
        throw new Error(error.detail || error.erreur || 'Erreur lors de l\'analyse');
      }

      const data = await response.json();
      
      // Vérifier si le backend a retourné une erreur
      if (data.erreur) {
        throw new Error(data.erreur);
      }

      return data;
    } catch (error) {
      console.error('Erreur analyze:', error);
      throw error;
    }
  },

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
        
        // Si l'endpoint n'existe pas, retourner un tableau vide
        if (response.status === 404) {
          console.warn('Endpoint /history non trouvé');
          return [];
        }
        
        const error = await response.json();
        throw new Error(error.detail || 'Erreur lors de la récupération de l\'historique');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur getHistory:', error);
      // Retourner un tableau vide au lieu de throw pour éviter de bloquer l'interface
      return [];
    }
  },

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