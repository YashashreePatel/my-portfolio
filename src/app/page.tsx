'use client';
import BackgroundLayout from '@/components/Layouts/BackgroundLayout';
import Cursor from '@/components/Cursor';
import ForegroundLayout from '@/components/Layouts/ForegraoundLayout';
import Navbar from '@/components/Header';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import Header from '@/components/Header';
import About from '@/components/Content/About';
import Experience from '@/components/Content/Experience';
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
    <div className='w-full h-full bg-background-gradient'>
      <Cursor />
      <Header currentSection={currentSection} />
      <div ref={componentRef} className={`w-full h-full flex flex-col gap-56 pb-16 z-30 ${styles.scrollable}`}>
        <About />
        <Experience />
        <Testimonial />
        <Footer />
      </div>
      {/* <BackgroundLayout />
      <ForegroundLayout /> */}
    </div>
  );
}
