'use client';
import Image from 'next/image';
import styles from '@/components/v1/style.module.css';

import { Intro } from '@/data/Intro';
import { SocialLinks } from '@/data/SocialLinks';

import * as FaIcons from 'react-icons/fa6';
import { Sections } from '@/data/Sections';

const Footer = () => {
  return (
    <div className='w-3/5 relative flex flex-col gap-4 m-auto items-center justify-center'>
      <div className={`${styles.primary_dark} ${styles.hover_heading}`}>
        Yashashree Patel
      </div>
      <div className='flex flex-row gap-5 items-center text-[#3B3B3B]'>
        {SocialLinks.map((item, index) => {
          const IconComponent = FaIcons[item.name as keyof typeof FaIcons];

          return IconComponent ? (
            <a key={index} href={item.link} target='_blank' rel='noopener noreferrer'>
              <IconComponent className={`${styles.social_icons} hover:text-[#B7B7B7]`} />
            </a>
          ) : null;
        })}
      </div>
      <div className={`w-[550px] ${styles.grey_light} mt-2 text-center ${styles.body}`}>
        Designed in
        <span className={`${styles.primary_dark}`}> Figma </span>
        and coded in
        <span className={`${styles.primary_dark}`}> Visual Studio Code</span>
        . Built using
        <span className={`${styles.primary_dark}`}> Next.js</span>
        , styled using
        <span className={`${styles.primary_dark}`}> Tailwind CSS </span>
        and deployed on
        <span className={`${styles.primary_dark}`}> Vercel</span>
        . The
        <span className={`${styles.primary_dark}`}> Poppins</span>
        typeface is used throughout, with the logo text featuring the
        <span className={`${styles.primary_dark}`}> Unna </span>
        typeface.
      </div>
    </div>
  )
}

export default Footer;
