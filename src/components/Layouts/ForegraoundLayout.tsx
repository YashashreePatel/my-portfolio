'use client';
import { useEffect, useRef, useState } from 'react';

import Header from '@/components/Header'
import Navbar from '@/components/Navbar';
import About from '@/components/Content/About';
import Experience from '@/components/Content/Experience';
import Project  from '@/components/Content/Project';

import { Sections } from '@/data/Sections';

import styles from '@/components/style.module.css';

const ForegroundLayout = () => {
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
    <div className='w-full h-full relative flex flex-row gap-0 z-30'>
      <div className='w-2/5 h-full pl-40 pr-20 py-16'>
        <Header />
      </div>
      <div className='w-3/5 h-full flex flex-col gap-10 pl-20 pr-40 pt-16'>
        <Navbar currentSection={currentSection} />
        <div ref={componentRef} className={`pt-4 pb-16 flex flex-col gap-20 ${styles.scrollable}`}>
          <About />
          <Experience />
          <Project />
        </div>
      </div>
    </div>
  );
};

export default ForegroundLayout;
