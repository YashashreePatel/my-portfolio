import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import styles from '@/components/style.module.css';

const About = () => {
  return (
    <div id='about' className='w-full h-[100vh] px-[200px] flex flex-col gap-10 items-start justify-center'>
      <div className='font-inter font-light text-[30px] text-grey-0 leading-none'>
        Hi, I'm Yashashree.
      </div>
      <div className='w-full font-inter font-light italic text-[12px] text-grey-2 border-b border-grey-4'>
        This is me.
      </div>
      <div className='font-outfit font-normal text-[50px] text-grey-0 text-left leading-none'>
        I blend design and code to create intuitive, high-performance web experiences that feel effortless for users.
      </div>
    </div>
  )
}

export default About;
