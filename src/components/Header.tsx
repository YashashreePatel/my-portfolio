'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '@/components/style.module.css';

import { Intro } from '@/data/Intro';
import { SocialLinks } from '@/data/SocialLinks';

import * as FaIcons from 'react-icons/fa6';
import { Sections } from '@/data/Sections';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
      <div className='flex flex-col'>
        <div className={`h-[3px] w-full rounded-full ${isScrolled ? 'bg-grey-3' : 'bg-grey-1'}`}></div>
        <div className={`justify-center ${isScrolled ? 'text-grey-0' : 'text-grey-5'}`}> menu </div>
        <div className={`h-[3px] w-full rounded-full ${isScrolled ? 'bg-grey-3' : 'bg-grey-1'}`}></div>
      </div>
    </div>
  )
}

export default Header;
