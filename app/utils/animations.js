import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Check if device is mobile for performance optimization
const isMobile = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth < 768;
  }
  return false;
};

/**
 * Fade in and slide up on scroll
 * @param {string} selector - CSS selector for elements
 * @param {object} options - Animation config
 */
export const fadeInUp = (selector, options = {}) => {
  const { duration = 0.8, stagger = 0.1, delay = 0 } = options;
  
  // Reduce motion on mobile for performance
  const actualDuration = isMobile() ? duration * 0.7 : duration;
  const actualStagger = isMobile() ? stagger * 0.7 : stagger;

  gsap.set(selector, { opacity: 0, y: 40 });

  gsap.to(selector, {
    opacity: 1,
    y: 0,
    duration: actualDuration,
    stagger: actualStagger,
    delay,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: selector,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });
};

/**
 * Scale in on scroll
 * @param {string} selector - CSS selector
 * @param {object} options - Animation config
 */
export const scaleIn = (selector, options = {}) => {
  const { duration = 0.8, from = 0.9 } = options;
  
  const actualDuration = isMobile() ? duration * 0.7 : duration;

  gsap.set(selector, { opacity: 0, scale: from });

  gsap.to(selector, {
    opacity: 1,
    scale: 1,
    duration: actualDuration,
    ease: 'back.out',
    scrollTrigger: {
      trigger: selector,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
  });
};

/**
 * Disable animations completely on low-end devices
 */
export const shouldReduceMotion = () => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches || isMobile();
  }
  return false;
};
