import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

type LenisWindow = Window & {
  __ypLenis?: Lenis;
};

export const useSmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      anchors: true,
      duration: 1.1,
    });
    const lenisWindow = window as LenisWindow;

    lenisWindow.__ypLenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      if (lenisWindow.__ypLenis === lenis) {
        delete lenisWindow.__ypLenis;
      }
      lenis.destroy();
    };
  }, []);
};
