import Image from 'next/image';
import styles from '@/components/style.module.css';

import { Intro } from '@/data/Intro';
import { SocialLinks } from '@/data/SocialLinks';

import * as FaIcons from 'react-icons/fa6';

const About = () => {
  return (
    <div className='w-full flex flex-col gap-4'>
      <div className={`w-full text-primary-2 ${styles.section_heading}`}> About </div>
      <div id='about' className='w-full flex flex-col gap-4'>
        <div className='w-full flex flex-row gap-4 items-center justify-center'>
          <div className='w-1/2 h-[300px]'>
            <Image
              width={400}
              height={400}
              src='/images/about.jpeg'
              alt='about image'
              className={`w-full h-full object-cover rounded-[3px]`}
            />
          </div>
          <div className={`w-1/2 flex flex-col gap-4 text-secondary-2 ${styles.body}`}>
            <span> A driven software engineer dedicated to crafting exceptional digital experiences. Currently pursuing an MS in Information Systems with a concentration in Software Engineering at Northeastern University. </span>
            <span> With a solid foundation in Computer Science and Engineering, I've contributed to impactful projects during internships, demonstrating proficiency in a range of technologies, including JavaScript, TypeScript, React.js, Next.js, and Python. My journey spans collaborative web development, where I've optimized performance and fostered cross-functional teamwork. </span>
          </div>
          {/* <div className={`text-secondary-2 flex flex-col gap-4 ${styles.body}`}>
          <span> A driven software engineer dedicated to crafting exceptional digital experiences. Currently pursuing an MS in Information Systems with a concentration in Software Engineering at Northeastern University, my academic journey commenced with a BTech in Computer Science and Engineering, where I delved into Java, Data Structures, and Web Technologies. </span>
          <span> In the professional arena, I've made significant contributions as a Software Engineer Co-op at AdsGency AI. I led the development of a comprehensive 24-page company website, seamlessly integrating OpenAI APIs and deploying the final product on AWS EC2. During my Front End Developer Internship at Avatto LLP, I refined my skills in HTML, CSS, JavaScript, and ReactJS, optimizing web performance and collaborating seamlessly with cross-functional teams. </span>
        </div> */}
        </div>
        <div className={`text-secondary-2 ${styles.body}`}> Beyond coding, I find harmony in culinary arts and painting, blending creativity with technical prowess. </div>
        {/* <div className={`text-secondary-2 flex flex-col gap-4 ${styles.body}`}>
        <span> My technical expertise spans a diverse toolkit, including JavaScript, TypeScript, React.js, Next.js, and Python, allowing me to tackle intricate projects and deliver innovative solutions. Beyond coding, I find joy in culinary arts and painting, striking a balance between creativity and technical acumen. </span>
        <span> Join me on this journey of combining passion with proficiency as I strive to leave a lasting impact in the ever-evolving landscape of software engineering. </span>
      </div> */}
      </div>
    </div>
  )
}

export default About;
