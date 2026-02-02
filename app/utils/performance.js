/**
 * Device performance detection and optimization
 * Helps tailor animations and features to device capabilities
 */

export const getDevicePerformanceLevel = () => {
  if (typeof navigator === 'undefined') return 'high';

  const cores = navigator.hardwareConcurrency || 4;
  const memory = navigator.deviceMemory || 8;
  const connection = navigator.connection?.effectiveType || '4g';

  // Low-end devices: 2 cores, 4GB RAM, or slow connection
  if (cores <= 2 || memory <= 4 || connection === 'slow-2g' || connection === '2g') {
    return 'low';
  }

  // Mid-range: 4 cores, 8GB RAM, 3G connection
  if (cores <= 4 || memory <= 8 || connection === '3g') {
    return 'medium';
  }

  return 'high';
};

export const shouldReduceAnimations = () => {
  if (typeof window === 'undefined') return false;

  // Respect user's motion preferences
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Reduce on low-end devices
  const performanceLevel = getDevicePerformanceLevel();
  
  return prefersReducedMotion || performanceLevel === 'low';
};

export const getAnimationDuration = (baseDuration = 0.8) => {
  if (shouldReduceAnimations()) {
    return baseDuration * 0.5; // 50% faster on low-end
  }
  return baseDuration;
};

export const getAnimationStagger = (baseStagger = 0.1) => {
  if (shouldReduceAnimations()) {
    return baseStagger * 0.5;
  }
  return baseStagger;
};

/**
 * Check if device can handle complex 3D graphics
 */
export const supportsWebGL2 = () => {
  if (typeof window === 'undefined') return true;

  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGL2RenderingContext && canvas.getContext('webgl2'));
  } catch (e) {
    return false;
  }
};

/**
 * Detect if browser supports CSS filters (for cursor effects)
 */
export const supportsCSSFilters = () => {
  if (typeof window === 'undefined') return true;

  const el = document.createElement('div');
  el.style.filter = 'drop-shadow(0 0 1px black)';
  
  return el.style.filter !== '';
};

/**
 * Get optimal animation frame rate based on device
 */
export const getTargetFrameRate = () => {
  const performanceLevel = getDevicePerformanceLevel();
  
  if (performanceLevel === 'low') return 30; // 30 FPS for low-end
  if (performanceLevel === 'medium') return 45; // 45 FPS for mid-range
  return 60; // 60 FPS for high-end
};
