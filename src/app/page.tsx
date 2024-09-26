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
    <div className='w-full h-full relative px-40 pt-[50px] bg-background-gradient'>
     {/* <Cursor /> */}
      <div className={`${styles.lines} z-20`}>
        <div className={`${styles.line}`}></div>
        <div className={`${styles.line}`}></div>
        <div className={`${styles.line}`}></div>
      </div>
      <Header currentSection={currentSection} />
      <div ref={componentRef} className={`w-full max-h-[calc(100vh-200px)] relative flex flex-col gap-56 px-36 py-28 z-30 ${styles.scrollable}`}>
        <About />
        <Experience />
        <Project />
        <Testimonial />
        <Footer />
      </div>
    </div>
  );
}
