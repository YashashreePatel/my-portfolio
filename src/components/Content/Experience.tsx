import { useState } from 'react';
import styles from '@/components/style.module.css';

import { Experiences } from '@/data/Experiences';
import { IExperience } from '@/types/IExperience';

import * as FaIcons from 'react-icons/fa6';

type ExperienceCardProps = {
  experience: IExperience;
}

const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  return (
    <div className={`flex flex-col gap-4 justify-center bg-grey-5 dark:bg-grey-dark hover:shadow-custom dark:shadow-dark-custom ${styles.exp_card}`}>
      <div className={`w-full flex flex-row gap-4 justify-start items-start`}>
        <div className='flex-1 flex flex-col 2xl:gap-2 gap-1 items-start text-left'>
          <div className={`${styles.grey_dark} ${styles.card_title}`}>
            {experience.title}
          </div>
          <a
            href={experience.company_website}
            target='_blank'
            className={`${styles.grey_mid} ${styles.exp_company}`}
          >
            @{experience.company}
          </a>
        </div>
        <div className={`${styles.grey_light} ${styles.body} text-right`}>
          {experience.duration}
        </div>
      </div>
      <div className='flex flex-wrap gap-2'>
        {experience.tech_stack.map((skill, index) =>
          <div key={index} className={`${styles.skill_badge}`}> {skill} </div>
        )}
      </div>
    </div>
  )
}

const Experience = () => {
  return (
    <div id='experience' className='w-full relative flex lg:flex-row xs:flex-col gap-10 m-auto items-start justify-start'>
      <div className='lg:w-1/3 xs:w-full flex flex-col gap-4 lg:items-start xs:items-center justify-center lg:text-left xs:text-center'>
        <div className={`${styles.primary_light} ${styles.heading}`}>
          Where I have <span className={`${styles.primary_dark}`}>worked</span>
        </div>
        <div className={`${styles.grey_light} ${styles.body}`}> I&apos;ve been doing software development for about 2 years, and I&apos;m always eager to learn more in this fast paced industry. </div>
      </div>
      <div className='lg:w-2/3 xs:w-full flex flex-col lg:gap-8 xs:gap-4'>
        {Experiences.map((item, index) =>
          <ExperienceCard key={index} experience={item} />
        )}
      </div>
    </div>
  )
}

export default Experience;
