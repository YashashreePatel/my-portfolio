import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import styles from '@/components/style.module.css';
import Button from '@/components/Button';
import { FiArrowUpRight } from 'react-icons/fi';

const About = () => {
  return (
    <div id='about' className='w-full h-screen px-[200px] flex flex-col gap-10 items-start justify-center'>
      <div className='font-inter font-light text-[30px] text-grey-0 leading-none'>
        Hi, I&apos;m Yashashree.
      </div>
      <div className='w-full flex flex-row gap-[5px] text-[14px] items-center border-b border-grey-4'>
        <div className='w-1/2 font-inter font-light italic text-grey-2'>
          this is me.
        </div>
        <a href='/this-is-me' className='w-1/2 flex flex-row gap-[3px] items-center justify-end font-outfit font-medium text-secondary-1 hover:text-secondary-3 transition-all duration-300'>
          <div> know more about me </div> <FiArrowUpRight />
        </a>
      </div>
      <div className='font-outfit font-normal text-[50px] text-grey-0 text-left leading-none'>
        I blend design and code to create intuitive, high-performance web experiences that feel effortless for users.
      </div>
      <Button link='/' text='Get in Touch' />
    </div>
  )
}

export default About;
