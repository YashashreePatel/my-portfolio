'use client';
import Cursor from '@/components/Cursor';
import Navbar from '@/components/Header';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import Header from '@/components/Header';
import About from '@/components/Content/About';
import Experience from '@/components/Content/Experience';
import Project from '@/components/Content/Project';
import Testimonial from '@/components/Content/Testimonial';
import Footer from '@/components/Footer';

import styles from '@/components/style.module.css';

import { Sections } from '@/data/Sections';

export default function Home() {
  const [currentSection, setCurrentSection] = useState('about');
  const componentRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    if (componentRef.current) {
      const scrollPosition = componentRef.current.scrollTop;
      const offset = 250;
      Sections.forEach(({ tag }) => {
        const sectionElement = document.getElementById(tag);

        if (
          sectionElement &&
          scrollPosition >= sectionElement.offsetTop - offset &&
          scrollPosition < sectionElement.offsetTop + sectionElement.offsetHeight - offset
        ) {
          console.log('sectionElement.offsetTop - offset', sectionElement.offsetTop - offset)
          setCurrentSection(tag);
        }
      });
    }
  };

  useEffect(() => {
    const componentElement = componentRef.current;

    if (componentElement) {
      componentElement.addEventListener('scroll', handleScroll);

      return () => {
        componentElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);
  return (
    <div className='2xl:w-[1250px] w-full h-full 2xl:m-auto relative 2xl:px-0 xl:px-20 lg:px-16 px-0 2xl:pt-[80px] pt-[50px]'>
     {/* <Cursor /> */}
      <div className={`${styles.lines} z-20`}>
        <div className={`${styles.line}`}></div>
        <div className={`${styles.line}`}></div>
        <div className={`${styles.line}`}></div>
      </div>
      <Header currentSection={currentSection} />
      <div ref={componentRef} className={`w-full 2xl:max-h-[calc(100vh-190px)] lg:max-h-[calc(100vh-160px)] xs:max-h-[calc(100vh-140px)] relative flex flex-col gap-56 2xl:px-36 xl:px-28 px-16 lg:py-28 xs:py-16 z-30 ${styles.scrollable}`}>
        <About />
        <Experience />
        <Project />
        <Testimonial />
        <Footer />
      </div>
    </div>
  );
}
