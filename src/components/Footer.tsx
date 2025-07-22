'use client';
import Image from 'next/image';
import styles from '@/components/style.module.css';

import { Intro } from '@/data/Intro';
import { SocialLinks } from '@/data/SocialLinks';

import * as FaIcons from 'react-icons/fa6';
import { Sections } from '@/data/Sections';

const Footer = () => {
  return (
    <div className={`relative w-full h-screen pb-[100px] flex flex-col gap-16 justify-end items-center ${styles.footer_background}`}>
      <div className='flex flex-col gap-2 items-center'>
        <div className='font-inter font-light text-[18px] text-grey-1 leading-none'>
          Want to create something amazing together?
        </div>
        <div className='font-outfit font-semibold text-[50px] text-grey-0 leading-none'>
          Let&apos;s connect!
        </div>
      </div>
      <div className='flex flex-row gap-5 items-center text-grey-0'>
        {SocialLinks.map((item, index) => {
          const IconComponent = FaIcons[item.name as keyof typeof FaIcons];

          return IconComponent ? (
            <a key={index} href={item.link} target='_blank' rel='noopener noreferrer'>
              <IconComponent className={`${styles.social_icons} hover:text-primary-2`} />
            </a>
          ) : null;
        })}
      </div>
      <div className='flex flex-col gap-2 items-center'>
        <Image
          width={40}
          height={40}
          src={`/images/logo/logo.png`}
          alt='logo'
          className='w-auto h-[30px]'
        />
        <div className='font-inter font-light text-[18px] text-grey-0 leading-none'>
          Yashashree Patel
        </div>
      </div>
      <div className={`w-1/2 font-inter font-light text-[12px] text-grey-2 text-center`}>
        Designed in{' '}
        <span className={`text-primary-0`}>Figma</span>
        {' '}and coded in{' '}
        <span className={`text-primary-0`}>Visual Studio Code</span>
        . Built using{' '}
        <span className={`text-primary-0`}>Next.js</span>
        , styled using{' '}
        <span className={`text-primary-0`}>Tailwind CSS</span>
        {' '}and deployed on{' '}
        <span className={`text-primary-0`}>Vercel</span>
        . The{' '}
        <span className={`text-primary-0`}>Inter</span>
        {' '}and the{' '}
        <span className={`text-primary-0`}>Outfit</span>
        {' '}typefaces are used throughout, with the logo text featuring the{' '}
        <span className={`text-primary-0`}>Playfair Display</span>
        {' '}typeface.
      </div>
    </div>
  )
}

export default Footer;
