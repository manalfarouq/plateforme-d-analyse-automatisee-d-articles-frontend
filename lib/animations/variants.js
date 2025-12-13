// lib/animations/variants.js

/**
 * CONFIGURATION CENTRALISÉE DES ANIMATIONS
 * Source unique de vérité pour toutes les animations du projet
 */

// Durées standards
export const DURATIONS = {
  fast: 300,
  normal: 600,
  slow: 1000,
  verySlow: 1500,
};

// Easing curves
export const EASINGS = {
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  elastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
};

// Classes CSS pour animations communes
export const ANIMATION_CLASSES = {
  fadeIn: 'animate-fade-in',
  fadeOut: 'animate-fade-out',
  slideUp: 'animate-slide-up',
  slideDown: 'animate-slide-down',
};

// Configuration des animations de la homepage
export const HOME_ANIMATION_SEQUENCE = {
  loadingComplete: { delay: 300 },
  showBackground: { delay: 1800 },
  showMenu: { delay: 2500 },
  navigationDelay: { expanding: 800, redirect: 1200 },
};

// Configuration des transitions de page
export const PAGE_TRANSITIONS = {
  expanding: {
    duration: 800,
    easing: EASINGS.smooth,
  },
  navigation: {
    duration: 1200,
    easing: EASINGS.smooth,
  },
};

// Export d'un helper pour obtenir les delays
export function getAnimationDelay(key) {
  return HOME_ANIMATION_SEQUENCE[key]?.delay || 0;
}
