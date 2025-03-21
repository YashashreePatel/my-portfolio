import Image from 'next/image';
import styles from '@/components/v1/style.module.css';

import { Projects } from '@/data/Projects';
import { IProject } from '@/types/IProject';

import { FaGithub } from 'react-icons/fa6';

type ProjectCardProps = {
  project: IProject;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className={`w-full flex flex-col gap-4 bg-[#FFFFFF] dark:bg-[#3A3A3A] items-start justify-start hover:shadow-custom dark:shadow-dark-custom ${styles.project_card}`}>
      <div className='w-full h-[250px] overflow-hidden rounded-t-[3px]'>
        <Image
          width={400}
          height={400}
          src={project.image}
          alt={project.name}
          className={`w-full h-full object-cover ${styles.project_image}`}
        />
      </div>
      <div className='w-full flex flex-col 2xl:gap-4 gap-2 2xl:p-8 p-4 justify-center'>
        <div className='w-full flex flex-row gap-2'>
          <div className={`w-full text-left ${styles.grey_dark} ${styles.card_title}`}>
            {project.name}
          </div>
          <div className={`text-right ${styles.grey_dark}`}>
            <a href={project.project_link} target='_blank' rel='noopener noreferrer'>
              <FaGithub className={`${styles.social_icons} hover:text-[#B7B7B7]`} />
            </a>
          </div>
        </div>
        <div className={`${styles.grey_light} ${styles.body}`}>
          {project.description}
        </div>
      </div>
    </div>
  )
}
const Project = () => {
  return (
    <div id='projects' className='w-full relative flex flex-col gap-10 m-auto items-start justify-start'>
      {/* <div className={`w-full text-[#7F76A5] ${styles.section_heading}`}> Projects </div> */}
      <div className='lg:w-2/3 xs:w-full flex flex-col gap-4 lg:items-start xs:items-center justify-center lg:text-left xs:text-center'>
        <div className={`${styles.primary_light} ${styles.heading}`}>
          What I have been <span className={`${styles.primary_dark}`}>Building</span>
        </div>
        <div className={`${styles.grey_light} ${styles.body}`}> Here are some projects where I&apos;ve brought creativity and code together to solve challenges, each one contributing to my journey of growth and learning. </div>
      </div>
      <div className='w-full grid grid-cols-2 items-start gap-8'>
        {Projects.map((item, index) =>
          <ProjectCard key={index} project={item} />
        )}
      </div>
    </div>
  )
}

export default Project;
