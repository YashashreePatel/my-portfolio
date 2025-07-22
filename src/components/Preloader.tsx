'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const preloaderRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete,
    });

    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: 'power3.out',
    })
    .to(logoRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      ease: 'power3.inOut',
    }, "+=0.5")
    .to(preloaderRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      onComplete: () => {
        if (preloaderRef.current) {
          (preloaderRef.current as HTMLElement).style.display = 'none';
        }
      }
    });

  }, [onComplete]);

  return (
    <div ref={preloaderRef} className="preloader fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black z-50">
      <img ref={logoRef} src="/images/logo/logo.png" alt="Logo" className="w-32 h-32 opacity-0 scale-0" />
    </div>
  );
};

export default Preloader;
