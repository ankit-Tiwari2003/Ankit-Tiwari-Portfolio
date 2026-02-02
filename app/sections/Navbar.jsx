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
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out'
        }
      );

      // Brand animation
      gsap.fromTo('.navbar-brand',
        { opacity: 0, x: -20 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.6,
          ease: 'power3.out'
        }
      );

      // Add hover effects to nav links
      const navLinks = document.querySelectorAll('.nav-link-interactive');
      navLinks.forEach((link) => {
        link.addEventListener('mouseenter', function() {
          gsap.to(this, {
            color: '#64ffda',
            textShadow: '0 0 15px rgba(100, 255, 218, 0.6)',
            duration: 0.3,
            ease: 'power2.out'
          });
        });

        link.addEventListener('mouseleave', function() {
          gsap.to(this, {
            color: 'inherit',
            textShadow: 'none',
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      });
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