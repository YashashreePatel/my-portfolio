'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FiAperture, FiChevronDown, FiCoffee, FiSun } from 'react-icons/fi';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionLabel from '@/components/SectionLabel';
import { AboutMePhoto, AboutMePhotos } from '@/data/AboutMe';
import { useReveal } from '@/hooks/useReveal';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const PhotoTile = ({
  photo,
  className = '',
}: {
  photo: AboutMePhoto;
  className?: string;
}) => (
  <figure className={`group mb-5 break-inside-avoid ${className}`} data-reveal>
    <div className='surface-photo relative'>
      <Image
        src={photo.image}
        alt={photo.title || 'personal photo'}
        width={1200}
        height={1600}
        unoptimized
        sizes='(min-width: 1024px) 30vw, 100vw'
        className={`h-auto w-full transition-transform duration-700 group-hover:scale-[1.02] ${photo.position || ''}`}
      />
    </div>
    {(photo.title || photo.caption || photo.note) && (
      <figcaption className='archive-note max-w-md'>
        {photo.note && <div className='archive-note-meta'>{photo.note}</div>}
        {photo.title && <div className='archive-note-title'>{photo.title}</div>}
        {photo.caption && <p className='archive-note-body'>{photo.caption}</p>}
      </figcaption>
    )}
  </figure>
);

const MasonryWall = ({
  photos,
  columns = 'lg:columns-4',
}: {
  photos: AboutMePhoto[];
  columns?: string;
}) => {
  return (
    <div className={`mt-14 columns-1 gap-5 sm:columns-2 ${columns}`}>
      {photos.map((photo) => (
        <PhotoTile key={photo.image} photo={photo} />
      ))}
    </div>
  );
};

const SectionIntro = ({
  label,
  title,
  body,
  note,
}: {
  label: string;
  title: string;
  body: string;
  note?: string;
}) => (
  <div data-reveal>
    <SectionLabel>{label}</SectionLabel>
    <h2 className='type-section-heading-sm mt-4 text-grey-0'>{title}</h2>
    <p className='type-body-base mt-5 max-w-3xl text-grey-1'>{body}</p>
    {note && (
      <p className='editorial-note type-body mt-5 max-w-2xl'>
        {note}
      </p>
    )}
  </div>
);

const introTags = [
  { label: 'painting', icon: <FiAperture /> },
  { label: 'sunsets', icon: <FiSun /> },
  { label: 'cooking', icon: <FiCoffee /> },
];

export default function ThisIsMe() {
  const [coverProgress, setCoverProgress] = useState(0);
  const isCoverVisible = coverProgress < 0.98;

  useReveal();
  useSmoothScroll();

  useEffect(() => {
    let frame = 0;

    const updateCoverProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const progress = Math.min(window.scrollY / (window.innerHeight * 0.85), 1);
        setCoverProgress(progress);

        if (progress < 0.98) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      });
    };

    updateCoverProgress();
    window.addEventListener('scroll', updateCoverProgress, { passive: true });
    window.addEventListener('resize', updateCoverProgress);

    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove('dark');
      window.removeEventListener('scroll', updateCoverProgress);
      window.removeEventListener('resize', updateCoverProgress);
    };
  }, []);

  return (
    <main className='about-grid-bg page-warm relative min-h-screen overflow-hidden'>
      <Header coverInset={isCoverVisible} forceTransparent={isCoverVisible} />

      <section
        className='relative h-screen snap-start overflow-hidden'
        aria-label='About me cover image'
      >
        <div
          className='absolute inset-0 scale-[1.04] bg-cover bg-center md:bg-fixed motion-safe:animate-[cover-drift_18s_ease-in-out_infinite_alternate] will-change-[opacity]'
          style={{
            backgroundImage: "url('/images/about-me/moments/moment-liberty-back.jpg')",
            opacity: 1 - coverProgress,
          }}
        />
        <div className='cover-overlay' style={{ opacity: 1 - coverProgress }} />
        <div className='cover-frame' style={{ opacity: 1 - coverProgress }} />
        <div
          className='cover-caption'
          style={{ opacity: Math.max(0, 1 - coverProgress * 1.4) }}
        >
          <span className='type-label text-white/90'>Moments outside the code</span>
        </div>
        <a
          href='#about-me-intro'
          className='absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-grey-5 will-change-[opacity] sm:bottom-12'
          style={{ opacity: Math.max(0, 1 - coverProgress * 1.8) }}
          aria-label='Scroll to about me intro'
        >
          <span className='type-nav text-grey-5'>Scroll down</span>
          <span className='flex h-10 w-10 animate-bounce items-center justify-center rounded-full border border-grey-5/70 bg-grey-0/15 text-[22px] backdrop-blur'>
            <FiChevronDown aria-hidden='true' />
          </span>
        </a>
      </section>

      <section
        id='about-me-intro'
        className='section-paper flex min-h-screen snap-start items-center overflow-hidden px-5 py-24 sm:px-8 lg:h-screen lg:px-10'
      >
        <div className='relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.42fr] lg:items-center lg:gap-14'>
          <div className='max-w-5xl' data-reveal>
            <SectionLabel>This is me</SectionLabel>
            <h1 className='type-hero mt-4 text-grey-0'>
              Beyond engineering, I stay close to color, craft, and the details that make work feel human.
            </h1>
            <p className='type-body-lg mt-6 max-w-4xl text-grey-1'>
              My creative life gives me a quieter way to study patience, composition, rhythm, and care. Painting, cooking, sunsets, and everyday observation shape how I think, how I make decisions, and how I bring intention into the systems I build.
            </p>
            <div className='mt-9 flex flex-wrap gap-3'>
              {introTags.map((tag) => (
                <span
                  key={tag.label}
                  className='editorial-chip type-tag'
                >
                  <span className='text-secondary-1'>{tag.icon}</span>
                  {tag.label}
                </span>
              ))}
            </div>
          </div>
          <div className='relative mx-auto w-full max-w-[320px] sm:max-w-[430px]' data-reveal>
            <div className='editorial-frame absolute -left-4 top-8 h-full w-full sm:-left-6' />
            <div className='surface-photo-strong relative aspect-[4/5]'>
              <Image
                src='/images/about.jpeg'
                alt='Yashashree near the waterfront'
                fill
                priority
                unoptimized
                sizes='(min-width: 1024px) 430px, 86vw'
                className='object-cover'
              />
            </div>
            <div className='floating-caption absolute -bottom-4 right-4'>
              <div className='handwritten-caption'>my happiest smile</div>
            </div>
          </div>
        </div>
      </section>

      <section className='section-sunset px-5 py-24 sm:px-8 lg:px-10 lg:py-36'>
        <div className='mx-auto w-full max-w-7xl'>
          <SectionIntro
            label='Sunsets'
            title='A study in light, transition, and restraint.'
            body='Sunsets are a quiet reminder that the most memorable light is often temporary. I am drawn to the way color shifts slowly, how atmosphere changes the entire frame, and how much can be communicated without excess.'
            note='Color, atmosphere, and the discipline of noticing what is changing.'
          />

          <MasonryWall photos={AboutMePhotos.sunsets} columns='lg:columns-4' />
        </div>
      </section>

      <section className='section-painting px-5 py-24 sm:px-8 lg:px-10 lg:py-40'>
        <div className='mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.38fr_1fr] lg:items-start lg:gap-16'>
          <SectionIntro
            label='Painting'
            title='My most deliberate creative practice.'
            body='Painting gives me room to slow down and work through ambiguity. It teaches me to layer, revise, observe carefully, and trust that strong outcomes often begin in an unresolved middle.'
            note='A practice in patience, judgment, and building depth over time.'
          />

          <MasonryWall photos={AboutMePhotos.painting} columns='lg:columns-3' />
        </div>
      </section>

      <section className='section-cooking px-5 py-24 sm:px-8 lg:px-10 lg:py-40'>
        <div className='mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1fr_0.38fr] lg:items-start lg:gap-16'>
          <div className='columns-1 gap-5 sm:columns-2 lg:columns-4'>
            {AboutMePhotos.cooking.map((photo) => (
              <PhotoTile key={photo.image} photo={photo} />
            ))}
          </div>
          <SectionIntro
            label='Cooking'
            title='Another way of practicing care.'
            body='Cooking is creative execution in a very immediate form: reading what is in front of me, adjusting with instinct, balancing texture and timing, and making something that can be shared.'
            note='Taste, timing, texture, and the small decisions that create warmth.'
          />
        </div>
      </section>

      <section className='section-paper px-5 py-20 sm:px-8 lg:px-10'>
        <div className='mx-auto w-full max-w-7xl'>
          <div className='max-w-4xl border-l border-secondary-3 pl-6' data-reveal>
            <div className='type-label text-secondary-1'>How it connects</div>
            <p className='type-body-base mt-4 text-grey-1'>
              These parts of my life shape how I work: painting strengthens patience, cooking reinforces care, and sunsets sharpen my sense of color, atmosphere, and timing.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
