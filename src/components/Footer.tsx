'use client';
import Image from 'next/image';
import styles from '@/components/style.module.css';

import { Intro } from '@/data/Intro';
import { SocialLinks } from '@/data/SocialLinks';

import * as FaIcons from 'react-icons/fa6';
import { Sections } from '@/data/Sections';

const Footer = () => {
  return (
    <div className='w-3/5 relative flex flex-col gap-4 m-auto items-center justify-center'>
      <div className={`text-primary-2 ${styles.hover_heading}`}>
        Yashashree Patel
      </div>
      <div className='flex flex-row gap-5 items-center text-primary-0'>
        {SocialLinks.map((item, index) => {
          const IconComponent = FaIcons[item.name as keyof typeof FaIcons];

          return IconComponent ? (
            <a key={index} href={item.link} target='_blank' rel='noopener noreferrer'>
              <IconComponent className={`${styles.social_icons} hover:text-primary-3`} />
            </a>
          ) : null;
        })}
      </div>
      <div className={`w-[550px] text-primary-3 mt-2 text-center ${styles.body}`}>
        Loosely designed in
        <span className='text-primary-2'> Figma </span>
        and coded in
        <span className='text-primary-2'> Visual Studio Code </span>
        by yours truly. Built with
        <span className='text-primary-2'> Next.js </span>
        and
        <span className='text-primary-2'> Tailwind CSS </span>
        , deployed with
        <span className='text-primary-2'> Vercel </span>
        . All text is set in the
        <span className='text-primary-2'> Poppins </span>
        typeface.
      </div>
    </div>
  )
}

export default Footer;
