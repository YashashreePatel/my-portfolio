'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '@/components/style.module.css';

import Menu from '@/components/Menu';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
    
  useEffect(() => {
    const savedScrollState = sessionStorage.getItem('isScrolled');
    if (savedScrollState !== null) {
      setIsScrolled(savedScrollState === 'true');
    }

    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
      sessionStorage.setItem('isScrolled', scrolled.toString());
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed w-full flex flex-row px-[30px] py-[35px] justify-between items-center z-50`}>
      <Image
        width={40}
        height={40}
        src={isScrolled ? `/images/logo/logo.png` : `/images/logo/logo-white.png`}
        alt='logo'
        className='w-auto h-[30px]'
      />
      <div className='flex flex-col' onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <div className={`h-[3px] w-full rounded-full z-60 ${isScrolled ? 'bg-grey-3' : 'bg-grey-1'} ${isMenuOpen ? 'rotate-45 translate-y-[5px]' : ''}`}></div>
        <div className={`justify-center z-60 ${isScrolled ? 'text-grey-0' : 'text-grey-5'} ${isMenuOpen ? 'none' : 'inline'}`}> menu </div>
        <div className={`h-[3px] w-full rounded-full z-60 ${isScrolled ? 'bg-grey-3' : 'bg-grey-1'} ${isMenuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`}></div>
        <Menu menuStatus={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>
    </div>
  )
}

export default Header;
