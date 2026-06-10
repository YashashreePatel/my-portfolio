'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FiAperture, FiChevronDown, FiCoffee, FiImage, FiSun } from 'react-icons/fi';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionLabel from '@/components/SectionLabel';
import { AboutMePhoto, AboutMePhotos } from '@/data/AboutMe';
import { useReveal } from '@/hooks/useReveal';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const SHOW_MOMENTS = false;

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
  { label: 'moments', icon: <FiImage />, hidden: !SHOW_MOMENTS },
  { label: 'cooking', icon: <FiCoffee /> },
];

const aboutIntro = SHOW_MOMENTS
  ? {
      title: 'Beyond engineering, I stay close to color, craft, and the details that make work feel human.',
      body: 'My creative life gives me a quieter way to study patience, composition, rhythm, and care. Painting, cooking, travel, and everyday observation shape how I think, how I make decisions, and how I bring intention into the systems I build.',
    }
  : {
      title: 'Beyond engineering, I stay close to color, craft, and the care behind making things.',
      body: 'Painting teaches me patience and composition. Sunsets keep me attentive to light, transition, and restraint. Cooking reminds me that timing, texture, and care can change the whole experience.',
    };

const sunsetBody = SHOW_MOMENTS
  ? 'Sunsets are a quiet reminder that the most memorable moments are often temporary. I am drawn to the way color shifts slowly, how atmosphere changes the entire frame, and how much can be communicated without excess.'
  : 'Sunsets are a quiet reminder that the most memorable light is often temporary. I am drawn to the way color shifts slowly, how atmosphere changes the entire frame, and how much can be communicated without excess.';

const connectionBody = SHOW_MOMENTS
  ? 'These parts of my life shape how I work: painting strengthens patience, cooking reinforces care, sunsets sharpen my sense of color and atmosphere, and travel reminds me to notice the context around every decision.'
  : 'These parts of my life shape how I work: painting strengthens patience, cooking reinforces care, and sunsets sharpen my sense of color, atmosphere, and timing.';

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
    <main className='page-warm relative min-h-screen overflow-hidden'>
      <Header coverInset={isCoverVisible} forceTransparent={isCoverVisible} />

      <section
        className='relative h-screen snap-start overflow-hidden'
        aria-label='About me cover image'
      >
        <div
          className='cover-image-motion absolute inset-0 bg-cover bg-center md:bg-fixed'
          style={{
            backgroundImage: "url('/images/about-me/moments/moment-liberty-back.jpg')",
            opacity: 1 - coverProgress,
            transform: `scale(${1.04 + coverProgress * 0.08}) translate3d(0, ${coverProgress * -24}px, 0)`,
          }}
        />
        <div className='cover-overlay' style={{ opacity: 1 - coverProgress }} />
        <div className='cover-frame' style={{ opacity: 1 - coverProgress }} />
        <div
          className='cover-caption cover-caption-motion'
          style={{ opacity: Math.max(0, 1 - coverProgress * 1.4) }}
        >
          <span className='type-label text-white/90'>
            {SHOW_MOMENTS ? 'Moments outside the code' : 'Outside the code'}
          </span>
        </div>
        <a
          href='#about-me-intro'
          className='cover-scroll-cue absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-grey-5 will-change-[opacity] sm:bottom-12'
          style={{ opacity: Math.max(0, 1 - coverProgress * 1.8) }}
          aria-label='Scroll to about me intro'
        >
          <span className='type-nav text-grey-5'>Scroll down</span>
          <span className='flex h-10 w-10 items-center justify-center rounded-full border border-grey-5/70 bg-grey-0/15 text-[22px] backdrop-blur'>
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
              {aboutIntro.title}
            </h1>
            <p className='type-body-lg mt-6 max-w-4xl text-grey-1'>
              {aboutIntro.body}
            </p>
            <div className='mt-9 flex flex-wrap gap-3'>
              {introTags.filter((tag) => !tag.hidden).map((tag) => (
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
            body={sunsetBody}
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

      {SHOW_MOMENTS && (
        <section className='section-moments px-5 py-24 sm:px-8 lg:px-10 lg:py-40'>
          <div className='mx-auto w-full max-w-7xl'>
            <div className='mb-12 max-w-3xl' data-reveal>
              <SectionLabel>Moments</SectionLabel>
              <h2 className='type-section-heading-sm mt-4 text-grey-0'>
                Personal archives from places, pauses, and passing details.
              </h2>
              <p className='type-body-base mt-5 max-w-2xl text-grey-1'>
                I keep certain photographs because they hold more than the scene itself: a sense of place, a small shift in mood, or a detail that would be easy to overlook once the moment has passed.
              </p>
            </div>
            <MasonryWall photos={AboutMePhotos.moments} columns='lg:columns-4' />
          </div>
        </section>
      )}

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
              {connectionBody}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
