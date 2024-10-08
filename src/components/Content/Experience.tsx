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
        <div className='w-2/3 flex flex-col gap-1 items-start'>
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
        <div className={`w-1/3 ${styles.grey_light} ${styles.body}`}>
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
    <div id='experience' className='w-full relative flex flex-row gap-12 m-auto items-start justify-start'>
      <div className='w-1/3 flex flex-col gap-4 items-start justify-center text-left'>
        <div className={`${styles.primary_light} ${styles.heading}`}>
          Where I have <span className={`${styles.primary_dark}`}>worked</span>
        </div>
        <div className={`${styles.grey_light} ${styles.body}`}> I&apos;ve been doing software development for about 2 years, and I&apos;m always eager to learn more in this fast paced industry. </div>
      </div>
      <div className='w-2/3 flex flex-col gap-8'>
        {Experiences.map((item, index) =>
          <ExperienceCard key={index} experience={item} />
        )}
      </div>
    </div>
  )
}

export default Experience;
