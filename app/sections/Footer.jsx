'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import Link from 'next/link';

const Footer = () => {
  const year = new Date().getFullYear();

  useEffect(() => {
    // Animate footer elements on mount
    gsap.fromTo(
      '.footer-content',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 }
    );

    // Social link hover effects with optimized timing
    const socialLinks = document.querySelectorAll('.social-icon');
    const hoverHandlers = [];

    socialLinks.forEach((link) => {
      const handlePointerEnter = () => {
        gsap.to(link, { 
          scale: 1.15, 
          color: '#64ffda', 
          duration: 0.15,
          boxShadow: '0 0 25px rgba(100, 255, 218, 0.5)'
        });
      };
      
      const handlePointerLeave = () => {
        gsap.to(link, { 
          scale: 1, 
          duration: 0.15,
          boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)'
        });
      };

      link.addEventListener('pointerenter', handlePointerEnter, { passive: true });
      link.addEventListener('pointerleave', handlePointerLeave, { passive: true });
      hoverHandlers.push({ link, handlePointerEnter, handlePointerLeave });
    });

    return () => {
      hoverHandlers.forEach(({ link, handlePointerEnter, handlePointerLeave }) => {
        link.removeEventListener('pointerenter', handlePointerEnter);
        link.removeEventListener('pointerleave', handlePointerLeave);
      });
      gsap.killTweensOf('.footer-content, .social-icon');
    };
  }, []);

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/ankit-Tiwari2003',
      icon: '/assets/github.svg',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/ankit-tiwari-4b8453262',
      icon: '/assets/instagram.svg',
    },
  ];

  return (
    <footer className="c-space pt-7 pb-3 border-t border-black-300 flex justify-between items-center flex-wrap gap-5 bottom-0">
      {/* Left - Legal Links */}
      <div className="footer-content text-white-500 flex gap-2">
        <Link href="#" className="hover:text-white-400 transition-colors duration-300">
          Terms & Conditions
        </Link>
        <p>|</p>
        <Link href="#" className="hover:text-white-400 transition-colors duration-300">
          Privacy Policy
        </Link>
      </div>

      {/* Center - Social Links */}
      <div className="footer-content flex gap-4">
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon flex items-center justify-center w-8 h-8 rounded-full border border-white-500 hover:border-white-400 transition-all duration-300"
            aria-label={social.name}
          >
            <img src={social.icon} alt={social.name} className="w-1/2 h-1/2" />
          </a>
        ))}
      </div>

      {/* Right - Copyright */}
      <p className="footer-content text-white-500 text-sm">
        © {year} Ankit Tiwari. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;