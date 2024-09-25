'use client';
import Image from 'next/image';
import styles from '@/components/style.module.css';

import { Intro } from '@/data/Intro';
import { SocialLinks } from '@/data/SocialLinks';

import * as FaIcons from 'react-icons/fa6';
import { Sections } from '@/data/Sections';

type HeaderProps = {
  currentSection: string;
}

const Header = ({ currentSection }: HeaderProps) => {
  function smoothScroll(targetId: string) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }

  return (
    <div className={`w-full h-[100px] relative flex flex-row justify-center items-center px-20 mb-[30px] bg-white rounded-[10px] shadow-custom z-40`}>
      {/* Left Menu Items */}
      <div className={`w-1/3`}>
        <ul className='flex flex-row gap-10 justify-end items-center text-grey-2'>
          {Sections.slice(0, 2).map((item, index) => (
            <li key={index} className={`
          ${currentSection === item.tag ? styles.menu_item_active : styles.menu_item}
          flex flex-row gap-2 items-center
        `}>
              <span className={`${styles.menu_item_decoration}`}></span>
              <a
                href={`#${item.tag}`}
                onClick={(e) => {
                  e.preventDefault();
                  smoothScroll(item.tag);
                }}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Logo in the Center */}
      <div className={`w-1/3 text-center`}>
        <div className={`text-secondary-0 ${styles.logo}`}>
          Y. <span className='text-secondary-1'>Patel</span>
        </div>
      </div>

      {/* Right Menu Items */}
      <div className={`w-1/3`}>
        <ul className='flex flex-row gap-10 justify-start items-center text-grey-2'>
          {Sections.slice(2).map((item, index) => (
            <li key={index} className={`
          ${currentSection === item.tag ? styles.menu_item_active : styles.menu_item}
          flex flex-row gap-2 items-center
        `}>
              <span className={`${styles.menu_item_decoration}`}></span>
              <a
                href={`#${item.tag}`}
                onClick={(e) => {
                  e.preventDefault();
                  smoothScroll(item.tag);
                }}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Header;
