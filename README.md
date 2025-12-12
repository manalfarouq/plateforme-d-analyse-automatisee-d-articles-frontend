# ZORO Analyzer – Frontend (Next.js)

Interface web du projet **ZORO Analyzer**, une plateforme permettant d'analyser automatiquement des articles via deux services d'IA :

- **Hugging Face Zero-Shot Classification**
- **Google Gemini – Résumé + Tonality + Synthèse contextuelle**

Ce frontend communique avec un backend Python sécurisé via **JWT**.

**Backend associé :** [Plateforme de ZORO Analyzer - Backend]([https://github.com/manalfarouq/Plateforme-d-analyse-automatisee-d-articles-backend.git])
---

## Fonctionnalités principales du Frontend

- **Interface moderne Next.js** (App Router)
- **Authentification complète** :
    - Inscription
    - Connexion
    - Stockage et gestion du token JWT côté client
    - Protection des routes (`ProtectedRoute`)
- **Page d'analyse** :
    - Zone de saisie du texte
    - Appel au backend pour lancer l'analyse
    - Affichage de :
        - Catégorie prédite (via Hugging Face)
        - Score associé
        - Résumé généré (via Gemini)
        - Ton détecté (positif / neutre / négatif)
    - Gestion du **loading**, des **erreurs**, et des **états de succès**
- **Design responsive**
- **Intégration en production via Docker**

---

## Structure du projet

```bash
app/
│
├── analyse/
│   ├── analyse.module.css
│   └── page.js                # Page d'analyse (texte → backend → résultats)
│
├── auth/
│   ├── auth.module.css
│   └── page.js                # Connexion / Inscription (JWT)
│
├── services/
│   ├── api.js                 # Configuration Axios + fonctions API
│   ├── globals.css
│   ├── home.module.css
│   ├── layout.js
│   └── page.tsx               # Page d'accueil
│
components/
│   ├── styles/
│   │   └── Header.tsx         # Header + Navbar
│   └── ProtectedRoute.js      # Protection des pages privées
```

## Configuration — Variables d'environnement

Créer un fichier `.env.local` et ajouter :

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

➡️ L'URL pointe vers ton backend Python.

## Installation & Lancement
### 1. Installer les dépendances :
```bash
npm install
```
### 2. Lancer en mode développement :
```bash
npm run dev
```
L'application sera accessible sur : http://localhost:3000

## Lancement via Docker
Le frontend inclut un Dockerfile et docker-compose.yml :

Construire l'image :
```bash
docker build -t hybrid-analyzer-frontend .
Lancer avec docker-compose :
bash
docker-compose up --build
```
Le service s'exécute sur : http://localhost:3000

## Authentification (JWT)

L'application utilise :

* **Login** → `/auth`
* **Inscription** → `/auth`

Le token JWT est stocké dans `localStorage`. Le composant `ProtectedRoute` bloque l'accès à la page `/analyse` si l'utilisateur n'est pas connecté.

Exemple d'utilisation du JWT côté frontend :

```javascript
const token = localStorage.getItem('token');
axios.get('/analyze', { headers: { Authorization: `Bearer ${token}` } });
```
## Intégration avec le Backend

Le frontend utilise `/services/api.js` pour appeler les routes suivantes :

| Action | Méthode | Route | Body / Headers | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Login** | `POST` | `/login` | Body: `{ "username": "...", "password": "..." }` | Retourne le token JWT |
| **Register** | `POST` | `/register` | Body: `{ "username": "...", "password": "..." }` | Crée un nouvel utilisateur |
| **Analyze** (Protégé) | `POST` | `/analyze` | Body: `{ "text": "..." }` / Headers: `Authorization: Bearer <token>` | Lance l'analyse AI |

**Réponse affichée** dans `/analyse` :

```json
{
    "category": "Finance",
    "score": 0.93,
    "summary": "...",
    "tone": "positif"
}
```
## Commandes utiles

| Commande | Description |
| :--- | :--- |
| `npm install` | Installe les dépendances |
| `npm run dev` | Mode développement |
| `npm run build` | Build production |
| `npm start` | Lancement production |
| `docker-compose up` | Exécute Docker |

---

## UI / UX

* **Responsive** via CSS Modules (`*.module.css`).
* Animation & feedback : `loaders`, transitions, messages d'erreur.
* `Header` animé avec affichage conditionnel du menu.

