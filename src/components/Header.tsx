'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '@/components/style.module.css';

import Menu from '@/components/Menu';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Change when scrolling past 50px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed w-full flex flex-row px-8 py-10 justify-between items-center`}>
      <Image
        width={40}
        height={40}
        src={isScrolled ? `/images/logo/logo.png` : `/images/logo/logo-white.png`}
        alt='logo'
        className='w-auto h-[30px]'
      />
      <div className='flex flex-col' onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <div className={`h-[3px] w-full rounded-full ${isScrolled ? 'bg-grey-3' : 'bg-grey-1'} ${isMenuOpen ? 'rotate-45 translate-y-[5px]' : ''}`}></div>
        <div className={`justify-center ${isScrolled ? 'text-grey-0' : 'text-grey-5'} ${isMenuOpen ? 'none' : 'inline'}`}> menu </div>
        <div className={`h-[3px] w-full rounded-full ${isScrolled ? 'bg-grey-3' : 'bg-grey-1'} ${isMenuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`}></div>
      </div>
      {isMenuOpen && <Menu onClose={() => setIsMenuOpen(false)} />}
    </div>
  )
}

export default Header;
