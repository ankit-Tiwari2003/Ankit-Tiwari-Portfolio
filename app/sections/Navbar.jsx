import Link from 'next/link'
import React, { useEffect } from 'react'
import gsap from 'gsap'
import { navLinks } from '../constants'

const NavItems = () => {
    return(
        <ul className='nav-ul'>
            {
                navLinks.map(({id,href,name}) => (
                    <li key={id} className='nav-li'>
                        <Link href={href} className='nav-li_a nav-link-interactive' onClick={()=>{}}>{name}</Link>
                    </li>
                ))
            }
        </ul>
    )
}

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    useEffect(() => {
      // Animate navbar items on mount
      gsap.fromTo('.nav-li_a', 
        { opacity: 0, y: -10 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out'
        }
      );

      // Brand animation
      gsap.fromTo('.navbar-brand',
        { opacity: 0, x: -20 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.5,
          ease: 'power3.out'
        }
      );

      // Simple color transition on hover (let CustomCursor handle scale)
      const navLinks = document.querySelectorAll('.nav-link-interactive');
      const hoverHandlers = [];

      navLinks.forEach((link) => {
        const handlePointerEnter = function() {
          gsap.killTweensOf(this);
          gsap.to(this, {
            color: '#64ffda',
            duration: 0.12,
            ease: 'power2.out',
            overwrite: false
          });
        };

        const handlePointerLeave = function() {
          gsap.killTweensOf(this);
          gsap.to(this, {
            color: 'inherit',
            duration: 0.12,
            ease: 'power2.out',
            overwrite: false
          });
        };

        link.addEventListener('pointerenter', handlePointerEnter, { passive: true });
        link.addEventListener('pointerleave', handlePointerLeave, { passive: true });
        hoverHandlers.push({ link, handlePointerEnter, handlePointerLeave });
      });

      // Cleanup
      return () => {
        hoverHandlers.forEach(({ link, handlePointerEnter, handlePointerLeave }) => {
          link.removeEventListener('pointerenter', handlePointerEnter);
          link.removeEventListener('pointerleave', handlePointerLeave);
        });
        gsap.killTweensOf('.nav-li_a, .navbar-brand');
      };
    }, []);

    const toggleMenu = () => {
        setIsOpen((pre)=> !pre);
    }
  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-black/90'>
        <div className='max-w-7xl mx-auto'>
            <div className="flex justify-between items-center py-5 c-space">
                <Link href='/' className='navbar-brand text-neutral-400 font-bold text-xl hover:text-white transition-colors duration-300'>Ankit Tiwari</Link>
                <button onClick={toggleMenu} className='text-neutral-400 hover:text-white focus:outline-none sm:hidden flex transition-colors duration-300' aria-label="Toggle Menu">
                    <img src={isOpen ? '/assets/close.svg' : '/assets/menu.svg'} alt="toggle" className='w-6 h-6' />
                </button>
                <nav className='sm:flex hidden'>
                    <NavItems />
                </nav>
            </div>
        </div>
        <div className={`nav-sidebar ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
            <nav className="p-5">
                <NavItems />
            </nav>
        </div>
    </header>
  )
}

export default Navbar