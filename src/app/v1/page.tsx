'use client';
import { useEffect, useRef, useState } from 'react';

import Header from '@/components/v1/Header';
import About from '@/components/Home/v1/About';
import Experience from '@/components/Home/v1/Experience';
import Project from '@/components/Home/v1/Project';
import Testimonial from '@/components/Home/v1/Testimonial';
import Footer from '@/components/v1/Footer';

import styles from '@/components/v1/style.module.css';
import '@/app/globals.css';

import { Sections } from '@/data/Sections';

export default function HomeV1() {
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
    <div className={`2xl:w-[1250px] w-full h-full 2xl:m-auto relative 2xl:px-0 xl:px-20 lg:px-16 px-0 2xl:pt-[80px] pt-[50px] ${styles.background}`}>
     {/* <Cursor /> */}
      <div className={`${styles.lines} z-20`}>
        <div className={`${styles.line}`}></div>
        <div className={`${styles.line}`}></div>
        <div className={`${styles.line}`}></div>
      </div>
      <Header currentSection={currentSection} />
      <div ref={componentRef} className={`w-full 2xl:max-h-[calc(100vh-190px)] lg:max-h-[calc(100vh-160px)] xs:max-h-[calc(100vh-140px)] relative flex flex-col gap-56 2xl:px-36 xl:px-28 sm:px-16 xs:px-8 lg:py-28 sm:py-16 xs:py-8 z-30 ${styles.scrollable}`}>
        <About />
        <Experience />
        <Project />
        <Testimonial />
        <Footer />
      </div>
    </div>
  );
}
