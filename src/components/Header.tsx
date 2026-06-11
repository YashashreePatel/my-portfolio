'use client';

import { useEffect, useState, type MouseEvent } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

import LogoMark from '@/components/LogoMark';
import WebsiteStarCta from '@/components/WebsiteStarCta';
import { Sections } from '@/data/Sections';

type HeaderProps = {
  coverInset?: boolean;
  forceTransparent?: boolean;
  lightOnTop?: boolean;
};

const Header = ({ coverInset = false, forceTransparent = false, lightOnTop = false }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = Sections.filter((section) => section.tag !== 'contact' && !section.hidden);
  const contactSection = Sections.find((section) => section.tag === 'contact') ?? {
    name: 'Contact',
    tag: 'contact',
    path: '/contact',
  };

  const handleSectionClick = (event: MouseEvent<HTMLAnchorElement>, tag: string, path: string) => {
    const target = document.getElementById(tag);

    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', path);
    setIsMenuOpen(false);
  };

  const showScrolledChrome = isScrolled && !forceTransparent;
  const showLoveStrip = isScrolled;
  const useHeroStrip = forceTransparent || lightOnTop;
  const useLightTop = (forceTransparent || lightOnTop) && !isScrolled;
  const useLightControls = forceTransparent || lightOnTop;
  const loveStripClass = useHeroStrip
    ? forceTransparent
      ? 'border-b border-white/25 bg-transparent text-grey-5'
      : 'border-b border-grey-1/80 bg-grey-0/80 text-grey-3'
    : 'border-b border-secondary-4/35 bg-secondary-5/35 text-secondary-1';
  const coverTextClass = forceTransparent
    ? 'text-grey-5 hover:text-secondary-4'
    : useLightTop
      ? 'text-grey-5/80 hover:text-grey-5'
      : 'text-grey-1 hover:text-secondary-1 dark:text-grey-3 dark:hover:text-secondary-4';

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full px-3 transition-all duration-300 sm:px-6 lg:px-10 ${
        coverInset ? 'py-7 sm:py-8' : 'py-4'
      }`}
    >
      <div
        className={`relative mx-auto max-w-7xl overflow-hidden rounded-[8px] border transition-all duration-300 ${
          showScrolledChrome
            ? 'chrome-surface'
            : 'border-transparent bg-transparent'
        }`}
      >
        <div
          className={`transition-all duration-300 ${
            showLoveStrip
              ? 'max-h-20 opacity-100 sm:max-h-14'
              : 'pointer-events-none max-h-0 opacity-0'
          }`}
        >
          <div
            className={`px-3 py-2 backdrop-blur-xl sm:px-4 ${loveStripClass}`}
          >
            <WebsiteStarCta inverted />
          </div>
        </div>

        <div className='relative flex items-center justify-between px-3 py-3 transition-all duration-300 sm:px-4'>
          <a href='/' aria-label='Go to intro' onClick={(event) => handleSectionClick(event, 'intro', '/')}>
            <LogoMark />
          </a>

          <nav className='absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex'>
            {navItems.map((section) => (
              <a
                key={section.tag}
                href={section.path}
                onClick={(event) => handleSectionClick(event, section.tag, section.path)}
                className={`type-nav transition-colors duration-200 ${coverTextClass}`}
              >
                {section.name}
              </a>
            ))}
            <a
              href='/playground'
              className={`type-nav transition-colors duration-200 ${coverTextClass}`}
            >
              Playground
            </a>
          </nav>

          <div className='hidden items-center gap-3 lg:flex'>
            <a
              href={contactSection.path}
              onClick={(event) => handleSectionClick(event, contactSection.tag, contactSection.path)}
              className='compact-primary-button'
            >
              Contact
            </a>
          </div>

          <button
            type='button'
            aria-label='Toggle navigation'
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className={`mobile-menu-button ${
              useLightControls
                ? 'border-white/40 text-grey-5'
                : ''
            }`}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className='chrome-surface mx-auto mt-3 flex max-w-7xl flex-col gap-2 rounded-[8px] border p-3 lg:hidden'>
          {[...navItems, contactSection, { name: 'Playground', tag: 'playground', path: '/playground' }].map((section) => (
            <a
              key={section.tag}
              href={section.path}
              onClick={(event) => {
                if (section.tag === 'playground') {
                  setIsMenuOpen(false);
                  return;
                }

                handleSectionClick(event, section.tag, section.path);
              }}
              className='type-nav rounded-[6px] px-3 py-3 text-grey-0 transition-colors duration-200 hover:bg-grey-4 dark:text-grey-5 dark:hover:bg-grey-1'
            >
              {section.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
