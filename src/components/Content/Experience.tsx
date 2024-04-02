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
    <div className={`flex flex-col gap-4 justify-center hover:shadow-custom ${styles.exp_card}`}>
      <div className={`w-full flex flex-row gap-4 justify-start items-start`}>
        <div className='w-2/3 flex flex-col gap-1 items-start'>
          <div className={`text-grey-1 ${styles.exp_title}`}>
            {experience.title}
          </div>
          <a
            href={experience.company_website}
            target='_blank'
            className={`text-grey-2 ${styles.exp_company}`}
          >
            @{experience.company}
          </a>
        </div>
        <div className={`w-1/3 text-grey-3 ${styles.body}`}>
          {experience.duration}
        </div>
      </div>
      <div className='flex flex-wrap gap-2'>
        {experience.tech_stack.map((skill, index) =>
          <div key={index} className={`${styles.skill_badge}`}> {skill} </div>
        )}
      </div>
    </div>

    //     <div className={`w-full uppercase text-grey-3 ${styles.body}`}>
    //       {experience.duration}
    //     </div>
    //     <div className='flex flex-wrap gap-2'>
    //       {experience.tech_stack.map((skill, index) =>
    //         <div key={index} className={`${styles.skill_badge}`}> {skill} </div>
    //       )}
    //     </div>
    //   </div>

    //   <div className={`w-full flex flex-col gap-1 items-start`}>
    //     <div className={`text-primary-1 ${styles.exp_title}`}>
    //       {experience.title}
    //     </div>
    //     <a
    //       href={experience.company_website}
    //       target='_blank'
    //       className={`text-primary-2 ${styles.exp_company}`}
    //     >
    //       @{experience.company}
    //     </a>

    //     <div className={`text-secondary-2 mt-3 ${styles.body}`}>
    //       {experience.description}
    //     </div>
    //   </div>
    // </div>
  )
}
const Experience = () => {
  return (
    <div id='experience' className='w-3/5 relative flex flex-row gap-12 m-auto items-start justify-start'>
      <div className='w-1/3 flex flex-col gap-4 pt-[20px] items-start justify-center text-left'>
        <div className={`text-primary-3 ${styles.heading}`}>
          Where I have <span className='text-primary-2'>worked</span>
        </div>
        <div className={`text-primary-3 ${styles.body}`}> I've been doing software development for about 2 years, and I'm always eager to learn more in this fast paced industry. </div>
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
