import Link from 'next/link'
import React from 'react'
import { navLinks } from '../constants'

const NavItems = () => {
    return(
        <ul className='nav-ul'>
            {
                navLinks.map(({id,href,name}) => (
                    <li key={id} className='nav-li'>
                        <Link href={href} className='nav-li_a' onClick={()=>{}}>{name}</Link>
                    </li>
                ))
            }
        </ul>
    )
}

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleMenu = () => {
        setIsOpen((pre)=> !pre);
    }
  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-black/90'>
        <div className='max-w-7xl mx-auto'>
            <div className="flex justify-between items-center py-5 c-space">
                <Link href='/' className='text-neutral-400 font-bold text-xl hover:text-white'>Ankit Tiwari</Link>
                <button onClick={toggleMenu} className='text-neutral-400 hover:text-white focus:outline-none sm:hidden flex' aria-label="Toggle Menu">
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