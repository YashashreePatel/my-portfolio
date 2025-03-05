import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '@/components/v1/style.module.css';

import { Intro } from '@/data/Intro';
import { SocialLinks } from '@/data/SocialLinks';

import * as FaIcons from 'react-icons/fa6';
import { FaArrowRightLong } from 'react-icons/fa6';

const About = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));
  }, []);

  return (
    <div id='about' className='w-full flex lg:flex-row xs:flex-col gap-10 items-center justify-center'>
      <div className={`2xl:w-[300px] 2xl:h-[400px] lg:w-[250px] h-[350px] xs:w-full lg:hover:w-[500px] lg:order-first xs:order-last rounded-[3px] overflow-hidden transition-all duration-300 ease-in-out`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          width={400}
          height={400}
          // src={`/images/${isDarkMode ? 'dark-about.jpeg' : 'about.jpeg'}`}
          src='/images/about.jpeg'
          alt='about image'
          className={`w-full h-full object-cover`}
        />
      </div>
      <div className='h-full flex-1 flex flex-col gap-10 justify-center'>
        <div className='w-full flex flex-col gap-4'>
          <div className={`${styles.grey_light} ${styles.card_title} lg:text-left xs:text-center`}> Hello, I&apos;m <span className={`${styles.grey_dark}`}>{Intro.name}</span> </div>
          <div className={`${styles.primary_light} lg:text-left xs:text-center transition-all duration-300 ease-in-out ${isHovered ? styles.hover_heading : styles.heading}`}>
            A
            <span className={`${styles.primary_dark}`}> {Intro.title}</span>.
            I pour meticulous
            <span className={`${styles.primary_dark}`}> attention </span>
            into developing
            <span className={`${styles.primary_dark}`}> compelling</span>,
            <span className={`${styles.primary_dark}`}> intuitive</span>,
            and
            <span className={`${styles.primary_dark}`}> inclusive </span>
            solutions.
          </div>
          {/* <div className={`w-full flex flex-row gap-2 items-center text-[#FFFBEE] ${styles.body}`}>
            <span> See more about Yashashree </span>
            <FaArrowRightLong />
          </div> */}
        </div>
        <div className={`w-full flex flex-row gap-5 items-center lg:justify-start xs:justify-center ${styles.grey_dark}`}>
          {SocialLinks.map((item, index) => {
            const IconComponent = FaIcons[item.name as keyof typeof FaIcons];

            return IconComponent ? (
              <a key={index} href={item.link} target='_blank' rel='noopener noreferrer'>
                <IconComponent className={`${styles.social_icons} hover:text-[#B7B7B7]`} />
              </a>
            ) : null;
          })}
        </div>
      </div>
    </div>
  )
}

export default About;
