'use client';

import { FiArrowUpRight } from 'react-icons/fi';
import * as FaIcons from 'react-icons/fa6';

import LogoMark from '@/components/LogoMark';
import SectionLabel from '@/components/SectionLabel';
import { SocialLinks } from '@/data/SocialLinks';
import styles from '@/components/style.module.css';

const Footer = () => {
  return (
    <footer id='contact' className={`relative flex min-h-[80vh] snap-start items-end overflow-hidden px-5 py-16 sm:px-8 lg:h-screen lg:px-10 ${styles.footer_background}`}>
      <div className='footer-wash'></div>
      <div className='relative mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end'>
        <div className='max-w-3xl'>
          <SectionLabel>Contact</SectionLabel>
          <h2 className='type-section-heading mt-4 text-grey-0'>
            Let&apos;s build reliable, intelligent systems together.
          </h2>
          <p className='type-body-base mt-5 text-grey-1'>
            I&apos;m open to software engineering roles where backend architecture, AI platforms, cloud systems, and thoughtful product engineering meet.
          </p>
          <a
            href='mailto:yashashreepatel9@gmail.com'
            className='primary-button mt-8 max-w-full flex-wrap break-all'
          >
            yashashreepatel9@gmail.com
            <FiArrowUpRight />
          </a>
        </div>

        <div className='flex flex-col gap-8 lg:items-end'>
          <LogoMark showWordmark />
          <div className='flex flex-wrap gap-4 text-grey-0'>
            {SocialLinks.map((item) => {
              const IconComponent = FaIcons[item.name as keyof typeof FaIcons];

              return IconComponent ? (
                <a
                  key={item.link}
                  href={item.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={item.name}
                  className='icon-button h-11 w-11'
                >
                  <IconComponent />
                </a>
              ) : null;
            })}
          </div>
          <div className='type-nav text-grey-2'>
            Designed and built with Next.js, Tailwind CSS, and a little systems thinking.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
