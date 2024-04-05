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
    <div className='w-full h-[150px] fixed flex flex-row gap-0 justify-center items-center px-40 backdrop-blur-[20px] z-40'>
      <div className={`w-1/2`}>
        <Image
          width={50}
          height={50}
          src='/images/logo_light.svg'
          alt='logo'
          className={`w-[100px] h-auto object-cover rounded-[3px]`}
        />
      </div>
      <div className={`w-1/2`}>
        <ul className='w-full flex flex-row gap-10 justify-end items-center text-primary-0'>
          {Sections.map((item, index) =>
            <li key={index} className={`
          ${currentSection === item.tag ? styles.manu_item_active : ''}
          ${styles.manu_item} flex flex-row gap-2 items-center
        `}>
              <span className={`${styles.manu_item_decoration}`}> </span>
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
          )}
        </ul>
      </div>
    </div>
  )
}

export default Header;
