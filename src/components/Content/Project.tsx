import Image from 'next/image';
import styles from '@/components/style.module.css';

import { Projects } from '@/data/Projects';
import { IProject } from '@/types/IProject';

type ProjectCardProps = {
  project: IProject;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className='w-full flex flex-row gap-4 items-start justify-center'>
      <div className='w-1/5 h-[100px]'>
        <Image
          width={400}
          height={400}
          src={project.image}
          alt={project.name}
          className={`w-full h-full object-cover rounded-[3px]`}
        />
      </div>
      <div className='w-4/5 flex flex-col gap-2 items-start'>
        <div className={`text-primary-1 ${styles.exp_title}`}>
          {project.name}
        </div>
        <div className={`text-secondary-2 ${styles.body}`}>
          {project.description}
        </div>
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
