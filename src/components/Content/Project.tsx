import Image from 'next/image';
import styles from '@/components/style.module.css';

import { Projects } from '@/data/Projects';
import { IProject } from '@/types/IProject';

type ProjectCardProps = {
  project: IProject;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className='w-full flex flex-col gap-1 items-start'>
      <div className={`text-primary-1 ${styles.exp_title}`}>
        {project.name}
      </div>
      <a
        href={'/'}
        target='_blank'
        className={`text-primary-2 ${styles.exp_company}`}
      >
        abc
      </a>
      <div className={`text-secondary-2 ${styles.body}`}>
        abc
      </div>
      <div className={`text-secondary-2 mt-3 ${styles.body}`}>
        abc
      </div>
    </div>
  )
}
const Project = () => {
  return (
    <div className='w-full flex flex-col gap-4'>
      <div className={`w-full text-primary-2 ${styles.section_heading}`}> Projects </div>
      <div id='experience' className='w-full flex flex-col gap-12'>
        {Projects.map((item, index) =>
          <ProjectCard key={index} project={item} />
        )}
      </div>
    </div>
  )
}

export default Project;
