type LenisWindow = Window & {
  __ypLenis?: {
    scrollTo: (
      target: HTMLElement | number | string,
      options?: { duration?: number; offset?: number }
    ) => void;
  };
};

export const scrollToPageSection = (target: HTMLElement) => {
  const lenis = (window as LenisWindow).__ypLenis;

  if (lenis) {
    lenis.scrollTo(target, { duration: 1.1 });
    return;
  }

  window.scrollTo({
    top: target.offsetTop,
    behavior: 'smooth',
  });
};
