import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Fade in and slide up on scroll
 * @param {string} selector - CSS selector for elements
 * @param {object} options - Animation config
 */
export const fadeInUp = (selector, options = {}) => {
  const { duration = 0.8, stagger = 0.1, delay = 0 } = options;

  gsap.set(selector, { opacity: 0, y: 40 });

  gsap.to(selector, {
    opacity: 1,
    y: 0,
    duration,
    stagger,
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

  gsap.set(selector, { opacity: 0, scale: from });

  gsap.to(selector, {
    opacity: 1,
    scale: 1,
    duration,
    ease: 'back.out',
    scrollTrigger: {
      trigger: selector,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
  });
};
