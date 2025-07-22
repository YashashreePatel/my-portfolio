'use client';
import Navbar from '@/components/Header';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import Header from '@/components/Header';
import Intro from '@/components/Home/Intro';
import About from '@/components/Home/About';
import Footer from '@/components/Footer';
import styles from '@/components/style.module.css';
import Globe from '@/components/Sphere';
import Preloader from '@/components/Preloader';

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  
  useEffect(() => {
    const savedIsDark = sessionStorage.getItem('isDark');
    if (savedIsDark !== null) {
      setIsDark(savedIsDark === 'true');
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const triggerPoint = window.innerHeight * 0.5;
      const newIsDark = scrollY < triggerPoint;
      setIsDark(newIsDark);
      sessionStorage.setItem('isDark', newIsDark.toString());
    };

    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.add(styles.dark);
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.remove(styles.dark);
    }

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isDark]);

  useEffect(() => {
    gsap.to(document.documentElement, {
      duration: 1.0,
      ease: 'power2.out',
      css: {
        '--bg-gradient': isDark
          ? 'linear-gradient(to bottom right, rgba(15, 15, 15, 1), rgba(35, 35, 35, 1))'
          : 'linear-gradient(to bottom right, rgba(245, 245, 245, 1), rgba(255, 255, 255, 1))',
      },
    });
  }, [isDark]);

  useEffect(() => {
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {/* {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      {!isLoading && ( */}
        <div className={`main relative w-full h-auto ${styles.bg_transition} ${isDark ? 'dark' : ''} transition-all duration-500`}>
          {/* <Globe /> */}
          <div className={`${styles.lines} transition-all duration-500 z-20`}>
            <div className={`${styles.line}`}></div>
            <div className={`${styles.line}`}></div>
            <div className={`${styles.line}`}></div>
          </div>
          <Header />
          {/* <a href="/v1" className='z-40'>Go to version 1</a> */}
          <div className='content relative 2xl:w-[1250px] w-full z-30'>
            <Intro />
            <About />
            <Footer />
          </div>
        </div>
      {/* )} */}
    </>
  );
}
