import Image from 'next/image';
import styles from '@/components/style.module.css';

import { Experiences } from '@/data/Experiences';
import { IExperience } from '@/types/IExperience';

import * as FaIcons from 'react-icons/fa6';

type ExperienceCardProps = {
  experience: IExperience;
}

const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  return (
    <div className='w-full flex flex-col gap-1 items-start'>
      <div className={`text-primary-1 ${styles.exp_title}`}>
        {experience.title}
      </div>
      <a
        href={experience.company_website}
        target='_blank'
        className={`text-primary-2 ${styles.exp_company}`}
      >
        @{experience.company}
      </a>
      <div className={`text-secondary-2 ${styles.body}`}>
        {experience.duration}
      </div>
      <div className={`text-secondary-2 mt-3 ${styles.body}`}>
        {experience.description}
      </div>
    </div>
  )
}
const Experience = () => {
  return (
    <div className='w-full flex flex-col gap-4'>
      <div className={`w-full text-primary-2 ${styles.section_heading}`}> Experience </div>
      <div id='experience' className='w-full flex flex-col gap-12'>
        {Experiences.map((item, index) =>
          <ExperienceCard key={index} experience={item} />
        )}
      </div>
    </div>
  )
}

export default Experience;
