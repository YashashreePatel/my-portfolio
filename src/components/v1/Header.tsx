'use client';
import Image from 'next/image';
import styles from '@/components/v1/style.module.css';

import { Sections } from '@/data/Sections';

type HeaderProps = {
  currentSection: string;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const Header = ({ currentSection, isDarkMode, onToggleTheme }: HeaderProps) => {
  function smoothScroll(targetId: string) {
    const targetElement = document.getElementById(targetId);
  
    if (targetElement) {
      const isSmallScreen = window.matchMedia('(max-width: 1024px)').matches;
  
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: isSmallScreen ? 'start' : 'center',
      });
    }
  }

  return (
    <div className={`w-full h-[60px] relative flex flex-row items-center justify-between 2xl:px-36 xl:px-28 px-16 lg:mb-[50px] xs:mb-[30px] bg-transperant rounded-[10px] z-40`}>
      {/* Logo in the Left */}
      <div className={`w-[100px] shadow-custom dark:shadow-dark-custom ${styles.logo}`}>
        {/* Y. <span className='text-[#FFCE4D]'>Patel</span> */}
        <Image
          width={50}
          height={50}
          src={`/images/logo/v1/${isDarkMode ? 'logo-light.png' : 'logo.png'}`}
          alt='logo'
          className={`w-[50px] h-auto transition-transform ${isDarkMode ? 'translate-x-full' : ''} object-cover transition-all duration-300 ease-in-out`}
          onClick={onToggleTheme}
        />
      </div>

      {/* Right Menu Items */}
      <ul className={`lg:flex xs:hidden flex-row justify-end items-center 2xl:gap-12 lg:gap-10 xs:gap-8 ${styles.grey_mid}`}>
        {Sections.map((item, index) => (
          <li key={index} className={`
              ${currentSection === item.tag ? styles.menu_item_active : styles.menu_item}
              flex flex-row gap-2 items-center
            `}>
            {/* <span className={`${styles.menu_item_decoration}`}></span> */}
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
  )
}

export default Header;
