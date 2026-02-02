'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const cursorGlowRef = useRef(null);
  const cursorTrailRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Hide default cursor
    document.documentElement.style.cursor = 'none';
    document.body.style.cursor = 'none';

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      // Show cursor on movement
      if (cursorRef.current) {
        gsap.to(cursorRef.current, { opacity: 1, duration: 0.1 });
      }
      if (cursorGlowRef.current) {
        gsap.to(cursorGlowRef.current, { opacity: 0.9, duration: 0.1 });
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, { opacity: 0, duration: 0.3 });
      }
      if (cursorGlowRef.current) {
        gsap.to(cursorGlowRef.current, { opacity: 0, duration: 0.3 });
      }
    };

    const handleHoverInteractive = function() {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, { scale: 1.8, duration: 0.2 });
      }
      if (cursorGlowRef.current) {
        gsap.to(cursorGlowRef.current, { scale: 2.5, duration: 0.2 });
      }
    };

    const handleHoverLeaveInteractive = function() {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
      }
      if (cursorGlowRef.current) {
        gsap.to(cursorGlowRef.current, { scale: 1, duration: 0.2 });
      }
    };

    // Animation loop with better smoothing
    let animationId;
    const animateCursor = () => {
      if (cursorRef.current && cursorGlowRef.current) {
        cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.25;
        cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.25;

        cursorRef.current.style.left = cursorPos.current.x + 'px';
        cursorRef.current.style.top = cursorPos.current.y + 'px';

        cursorGlowRef.current.style.left = cursorPos.current.x + 'px';
        cursorGlowRef.current.style.top = cursorPos.current.y + 'px';
      }

      animationId = requestAnimationFrame(animateCursor);
    };

    animateCursor();

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Add hover effects to interactive elements (delay to ensure DOM ready)
    setTimeout(() => {
      const interactiveElements = document.querySelectorAll(
        'a, button, input[type="submit"], [role="button"], .interactive, .social-icon, .project-link, .nav-link-interactive'
      );

      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', handleHoverInteractive);
        el.addEventListener('mouseleave', handleHoverLeaveInteractive);
      });
    }, 100);

    return () => {
      document.documentElement.style.cursor = 'auto';
      document.body.style.cursor = 'auto';
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);

      const interactiveElements = document.querySelectorAll(
        'a, button, input[type="submit"], [role="button"], .interactive, .social-icon, .project-link, .nav-link-interactive'
      );
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverInteractive);
        el.removeEventListener('mouseleave', handleHoverLeaveInteractive);
      });
    };
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none"
        style={{
          width: '12px',
          height: '12px',
          backgroundColor: '#64ffda',
          borderRadius: '50%',
          boxShadow: '0 0 15px #64ffda, inset 0 0 10px rgba(100, 255, 218, 0.8)',
          transform: 'translate(-50%, -50%)',
          filter: 'drop-shadow(0 0 8px #64ffda)',
          opacity: 0,
          willChange: 'transform',
          zIndex: 999999999,
        }}
      />

      {/* Cursor glow ring */}
      <div
        ref={cursorGlowRef}
        className="fixed pointer-events-none"
        style={{
          width: '40px',
          height: '40px',
          border: '2px solid #64ffda',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 30px rgba(100, 255, 218, 0.6), inset 0 0 15px rgba(100, 255, 218, 0.2)',
          opacity: 0,
          willChange: 'transform',
          zIndex: 999999998,
        }}
      />
    </>
  );
}
