import styles from '@/components/style.module.css';

import { Intro } from '@/data/Intro';
import { SocialLinks } from '@/data/SocialLinks';

import * as FaIcons from 'react-icons/fa6';

const Header = () => {
  return (
    <div className='w-full h-full'>
      <div className='w-full h-full flex flex-col gap-10 text-primary-0'>
        <div className='w-full flex flex-col gap-2 items-start'>
          <div className={`${styles.heading}`}> {Intro.name} </div>
          <div className={`${styles.sub_heading}`}> {Intro.title} </div>
          <div className={`text-secondary-3 mt-4 ${styles.body}`}> {Intro.bio} </div>
        </div>
        <div className='w-full flex flex-row gap-5 items-center'>
          {SocialLinks.map((item, index) => {
            const IconComponent = FaIcons[item.name as keyof typeof FaIcons];

            return IconComponent ? (
              <a key={index} href={item.link} target='_blank' rel='noopener noreferrer'>
                <IconComponent className={`${styles.social_icons} hover:text-primary-2`} />
              </a>
            ) : null;
          })}
        </div>
      </div>
    </div>
  )
}

export default Header;
