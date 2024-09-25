'use client';
import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import styles from '@/components/style.module.css';

import { Sections } from '@/data/Sections';

type NavbarProps = {
  currentSection: string;
}

const Navbar = ({ currentSection }: NavbarProps) => {
  function smoothScroll(targetId: string) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  return (
    <div className='w-full'>
      <ul className='w-full flex flex-row gap-10 text-primary-0'>
        {Sections.map((item, index) =>
          <li key={index} className={`
          ${currentSection === item.tag ? styles.menu_item_active : ''}
          ${styles.menu_item} flex flex-row gap-2 items-center
        `}>
            <span className={`${styles.menu_item_decoration}`}> </span>
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
  )
}

export default Navbar;
