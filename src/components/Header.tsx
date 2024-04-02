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
        block: 'start',
      });
    }
  }

  return (
    <div className='w-full h-[150px] fixed flex flex-row gap-0 justify-center items-center px-40 backdrop-blur-[20px]'>
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

// <div className='w-full h-full'>
//   <div className='w-full h-full flex flex-col gap-10 text-secondary-4'>
//     <div className='w-full flex flex-col gap-2 items-start'>
//       <div className={`${styles.heading}`}> {Intro.name} </div>
//       <div className={`${styles.sub_heading}`}> {Intro.title} </div>
//       <div className={`text-secondary-2 mt-4 ${styles.body}`}> {Intro.bio} </div>
//     </div>
//     <div className='w-full flex flex-row gap-5 items-center'>
//       {SocialLinks.map((item, index) => {
//         const IconComponent = FaIcons[item.name as keyof typeof FaIcons];

//         return IconComponent ? (
//           <a key={index} href={item.link} target='_blank' rel='noopener noreferrer'>
//             <IconComponent className={`${styles.social_icons} hover:text-primary-2`} />
//           </a>
//         ) : null;
//       })}
//     </div>
//   </div>
// </div>
