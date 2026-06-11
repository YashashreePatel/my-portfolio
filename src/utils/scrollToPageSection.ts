type LenisWindow = Window & {
  __ypLenis?: {
    scrollTo: (
      target: HTMLElement | number | string,
      options?: { duration?: number; offset?: number }
    ) => void;
  };
  __ypSectionNavigationUntil?: number;
};

export const scrollToPageSection = (target: HTMLElement) => {
  const lenisWindow = window as LenisWindow;
  const lenis = lenisWindow.__ypLenis;
  const top = target.getBoundingClientRect().top + window.scrollY;

  lenisWindow.__ypSectionNavigationUntil = Date.now() + 1400;

  if (lenis) {
    lenis.scrollTo(top, { duration: 1.1 });
    return;
  }

  window.scrollTo({
    top,
    behavior: 'smooth',
  });
};
