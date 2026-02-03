'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const cursorGlowRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const interactiveHandlers = useRef([]);

  useEffect(() => {
    // Hide default cursor globally and for all elements
    document.documentElement.style.cursor = 'none !important';
    document.body.style.cursor = 'none !important';
    
    // Add CSS rule to force hide cursor on all elements
    const style = document.createElement('style');
    style.textContent = `
      * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      // Show cursor on movement without blocking
      if (cursorRef.current) {
        gsap.killTweensOf(cursorRef.current);
        gsap.to(cursorRef.current, { opacity: 1, duration: 0.05, overwrite: false });
      }
      if (cursorGlowRef.current) {
        gsap.killTweensOf(cursorGlowRef.current);
        gsap.to(cursorGlowRef.current, { opacity: 0.9, duration: 0.05, overwrite: false });
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, { opacity: 0, duration: 0.12 });
      }
      if (cursorGlowRef.current) {
        gsap.to(cursorGlowRef.current, { opacity: 0, duration: 0.12 });
      }
    };

    const handleHoverInteractive = function() {
      if (cursorRef.current) {
        gsap.killTweensOf(cursorRef.current);
        gsap.to(cursorRef.current, { scale: 1.8, duration: 0.08, overwrite: false });
      }
      if (cursorGlowRef.current) {
        gsap.killTweensOf(cursorGlowRef.current);
        gsap.to(cursorGlowRef.current, { scale: 2.5, duration: 0.08, overwrite: false });
      }
    };

    const handleHoverLeaveInteractive = function() {
      if (cursorRef.current) {
        gsap.killTweensOf(cursorRef.current);
        gsap.to(cursorRef.current, { scale: 1, duration: 0.08, overwrite: false });
      }
      if (cursorGlowRef.current) {
        gsap.killTweensOf(cursorGlowRef.current);
        gsap.to(cursorGlowRef.current, { scale: 1, duration: 0.08, overwrite: false });
      }
    };

    // Animation loop with optimized smoothing
    let animationId;
    const animateCursor = () => {
      if (cursorRef.current && cursorGlowRef.current) {
        cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.2;
        cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.2;

        cursorRef.current.style.left = cursorPos.current.x + 'px';
        cursorRef.current.style.top = cursorPos.current.y + 'px';

        cursorGlowRef.current.style.left = cursorPos.current.x + 'px';
        cursorGlowRef.current.style.top = cursorPos.current.y + 'px';
      }

      animationId = requestAnimationFrame(animateCursor);
    };

    animateCursor();

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // Add hover effects to interactive elements with delay
    const setupTimeout = setTimeout(() => {
      const interactiveElements = document.querySelectorAll(
        'a, button, input[type="submit"], [role="button"], .interactive, .social-icon, .project-link, .nav-link-interactive'
      );

      interactiveElements.forEach((el) => {
        // Use pointer events instead of mouse events for better performance
        el.addEventListener('pointerenter', handleHoverInteractive, { passive: true });
        el.addEventListener('pointerleave', handleHoverLeaveInteractive, { passive: true });
        interactiveHandlers.current.push({ 
          el, 
          handleHoverInteractive, 
          handleHoverLeaveInteractive 
        });
      });
    }, 150);

    return () => {
      clearTimeout(setupTimeout);
      document.head.removeChild(style);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);

      // Clean up all interactive element handlers
      interactiveHandlers.current.forEach(({ el, handleHoverInteractive, handleHoverLeaveInteractive }) => {
        el.removeEventListener('pointerenter', handleHoverInteractive);
        el.removeEventListener('pointerleave', handleHoverLeaveInteractive);
      });
      interactiveHandlers.current = [];
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
