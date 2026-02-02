'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Button = ({ name, isBeam = false, containerClass }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!buttonRef.current) return;

    const button = buttonRef.current;

    // Hover effects
    const handleMouseEnter = () => {
      gsap.to(button, {
        backgroundColor: 'rgba(100, 255, 218, 0.2)',
        boxShadow: '0 0 30px rgba(100, 255, 218, 0.6), 0 0 60px rgba(100, 255, 218, 0.3)',
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        backgroundColor: 'rgba(100, 255, 218, 0)',
        boxShadow: '0 0 15px rgba(100, 255, 218, 0.3)',
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <button ref={buttonRef} className={`btn ${containerClass} transition-all duration-300`}>
      {isBeam && (
        <span className="relative flex h-3 w-3">
          <span className="btn-ping"></span>
          <span className="btn-ping_dot"></span>
        </span>
      )}
      {name}
    </button>
  );
};

export default Button;