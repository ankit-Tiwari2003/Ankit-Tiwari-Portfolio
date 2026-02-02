import gsap from 'gsap';

/**
 * Add magnetic hover effect to interactive elements
 * Elements follow cursor within bounds
 */
export const addMagneticEffect = (selector) => {
  const elements = document.querySelectorAll(selector);

  elements.forEach((element) => {
    let bounds;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = (e.clientX - centerX) * 0.2;
      const distanceY = (e.clientY - centerY) * 0.2;

      gsap.to(element, {
        x: distanceX,
        y: distanceY,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
  });
};

/**
 * Add scale and lift effect on hover
 */
export const addCardHoverEffect = (selector, scaleValue = 1.02) => {
  const cards = document.querySelectorAll(selector);

  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        scale: scaleValue,
        boxShadow: '0 20px 40px rgba(100, 255, 218, 0.2)',
        duration: 0.3,
        ease: 'power2.out',
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        scale: 1,
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
        duration: 0.3,
        ease: 'power2.out',
      });
    });
  });
};

/**
 * Add glow effect on hover
 */
export const addGlowEffect = (selector, color = '#64ffda') => {
  const elements = document.querySelectorAll(selector);

  elements.forEach((element) => {
    element.addEventListener('mouseenter', () => {
      gsap.to(element, {
        textShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
        color: color,
        duration: 0.3,
      });
    });

    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        textShadow: 'none',
        color: 'inherit',
        duration: 0.3,
      });
    });
  });
};

/**
 * Add smooth underline animation
 */
export const addUnderlineEffect = (selector) => {
  const elements = document.querySelectorAll(selector);

  elements.forEach((element) => {
    // Create underline span if not exists
    if (!element.querySelector('.underline-effect')) {
      const underline = document.createElement('span');
      underline.className = 'underline-effect';
      underline.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background: #64ffda;
        transition: width 0.3s ease;
      `;
      element.style.position = 'relative';
      element.appendChild(underline);
    }

    const underline = element.querySelector('.underline-effect');

    element.addEventListener('mouseenter', () => {
      gsap.to(underline, {
        width: '100%',
        duration: 0.3,
      });
    });

    element.addEventListener('mouseleave', () => {
      gsap.to(underline, {
        width: 0,
        duration: 0.3,
      });
    });
  });
};
