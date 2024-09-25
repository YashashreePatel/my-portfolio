import { useState } from 'react';
import Image from 'next/image';
import styles from '@/components/style.module.css';

import { Intro } from '@/data/Intro';
import { SocialLinks } from '@/data/SocialLinks';

import * as FaIcons from 'react-icons/fa6';
import { FaArrowRightLong } from 'react-icons/fa6';

const About = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div id='about' className='w-full flex flex-row gap-10 items-center justify-center'>
      <div className={`w-[250px] h-[350px] hover:w-[500px] rounded-[3px] overflow-hidden transition-all duration-300 ease-in-out`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          width={400}
          height={400}
          src='/images/about.jpeg'
          alt='about image'
          className={`w-full h-full object-cover`}
        />
      </div>
      <div className='h-full flex-1 flex flex-col gap-10 justify-center'>
        <div className='w-full flex flex-col gap-4 items-left'>
          <div className={`${styles.grey_light} ${styles.sub_heading}`}> Hello, I&apos;m <span className={`${styles.grey_dark}`}>{Intro.name}</span> </div>
          <div className={`${styles.primary_light} transition-all duration-300 ease-in-out ${isHovered ? styles.hover_heading : styles.heading}`}>
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
          {/* <div className={`w-full flex flex-row gap-2 items-center text-secondary-3 ${styles.body}`}>
            <span> See more about Yashashree </span>
            <FaArrowRightLong />
          </div> */}
        </div>
        <div className='w-full flex flex-row gap-5 items-center text-grey-0'>
          {SocialLinks.map((item, index) => {
            const IconComponent = FaIcons[item.name as keyof typeof FaIcons];

            return IconComponent ? (
              <a key={index} href={item.link} target='_blank' rel='noopener noreferrer'>
                <IconComponent className={`${styles.social_icons} hover:text-grey-3`} />
              </a>
            ) : null;
          })}
        </div>
      </div>
    </div>
  )
}

export default About;
