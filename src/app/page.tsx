'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { FiArrowUpRight, FiCloud, FiCode, FiDatabase, FiSearch } from 'react-icons/fi';
import { FaLinkedin } from 'react-icons/fa6';
import { gsap } from 'gsap';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionLabel from '@/components/SectionLabel';
import styles from '@/components/style.module.css';
import { Experiences } from '@/data/Experiences';
import { Projects } from '@/data/Projects';
import { ReferenceTestimonials } from '@/data/ReferenceTestimonials';
import { Sections } from '@/data/Sections';
import { Strengths } from '@/data/Strengths';
import { useReveal } from '@/hooks/useReveal';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const education = [
  {
    degree: 'MS, Information Systems (Software Engineering)',
    school: 'Northeastern University, Boston, MA',
    date: 'Dec 2024',
  },
  {
    degree: 'BTech, Computer Science and Engineering',
    school: 'Charotar University of Science and Technology, Gujarat, India',
    date: 'May 2022',
  },
];

export default function Home() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(true);
  const [expandedReferences, setExpandedReferences] = useState<string[]>([]);

  useReveal();
  useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      const triggerPoint = window.innerHeight * 0.65;
      setIsDark(window.scrollY < triggerPoint);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    gsap.to(document.documentElement, {
      duration: 1.0,
      ease: 'power2.out',
      css: {
        '--bg-gradient': isDark
          ? 'linear-gradient(to bottom right, rgba(15, 15, 15, 1), rgba(35, 35, 35, 1))'
          : 'linear-gradient(to bottom right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 1))',
      },
    });
  }, [isDark]);

  const featuredProjects = Projects.slice(0, 3);
  const featuredExperiences = Experiences.slice(0, 4);
  const capabilityTools = Strengths.flatMap((strength) => strength.tools);
  const sectionRoutes = useMemo(() => [{ tag: 'intro', path: '/' }, ...Sections], []);
  const scrollToSection = useCallback((id: string, path = '/') => {
    const target = document.getElementById(id);

    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', path);
  }, []);

  useEffect(() => {
    const matchingSection = sectionRoutes.find((section) => section.path === pathname);

    if (!matchingSection) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      scrollToSection(matchingSection.tag, matchingSection.path);
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname, scrollToSection, sectionRoutes]);

  useEffect(() => {
    let frame = 0;

    const updateSectionPath = () => {
      frame = 0;

      const viewportAnchor = window.scrollY + window.innerHeight * 0.48;
      let activePath = '/';

      sectionRoutes.forEach((section) => {
        const target = document.getElementById(section.tag);

        if (target && target.offsetTop <= viewportAnchor) {
          activePath = section.path;
        }
      });

      if (window.location.pathname !== activePath) {
        window.history.replaceState(null, '', activePath);
      }
    };

    const handleScroll = () => {
      if (frame) {
        return;
      }

      frame = requestAnimationFrame(updateSectionPath);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }

      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [sectionRoutes]);

  const toggleReference = (name: string) => {
    setExpandedReferences((current) => (
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name]
    ));
  };

  return (
    <main className={`relative min-h-screen overflow-hidden text-grey-0 ${styles.bg_transition} ${isDark ? styles.dark : ''}`}>
      <div className={`${styles.lines} pointer-events-none z-10 transition-colors duration-700`}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>

      <Header lightOnTop={isDark} />

      <section id='intro' className='relative flex min-h-screen snap-start items-center px-5 py-28 sm:px-8 lg:h-screen lg:px-10'>
        <div className='mx-auto flex max-w-7xl flex-col items-start' data-reveal>
          <div className='max-w-6xl'>
            <h1 className='type-hero text-grey-0 dark:text-grey-3'>
              Software Engineer for scalable{' '}
              <span className={`${styles.gradient_text} text-transparent`}>AI</span>
              ,{' '}
              <span className={`${styles.gradient_text} text-transparent`}>search</span>
              , and{' '}
              <span className={`${styles.gradient_text} text-transparent`}>cloud-native</span>
              {' '}systems.
            </h1>
            <p className='type-body-lg mt-6 max-w-4xl text-grey-1 dark:text-grey-3'>
              Recently, I&apos;ve worked on AI execution platforms, semantic search services, and cloud-native systems that coordinate real-time workflows across distributed infrastructure.
            </p>
            <div className='mt-9 flex flex-col gap-3 sm:flex-row'>
              <a
                href='/what-i-have-been-building'
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection('projects', '/what-i-have-been-building');
                }}
                className='primary-button justify-center dark:bg-grey-5 dark:text-grey-0 dark:hover:bg-secondary-4'
              >
                View Featured Work
                <FiArrowUpRight />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id='about' className='relative flex min-h-[80vh] snap-start items-center px-5 py-24 sm:px-8 lg:h-screen lg:px-10'>
        <div className='mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.42fr_1fr]' data-reveal>
          <div>
            <SectionLabel>About</SectionLabel>
            <h2 className='type-section-heading-sm mt-4 text-grey-0 dark:text-grey-5'>
              Backend depth with product instincts.
            </h2>
          </div>
          <div className='type-body-lg space-y-5 text-grey-1 dark:text-grey-3'>
            <p>
              I&apos;m a software engineer focused on systems that need to be both intelligent and dependable: AI execution platforms, semantic search services, real-time workflow tools, and cloud-native backend infrastructure.
            </p>
            <p>
              My work spans distributed microservices, event-driven APIs, observability, multi-tenant authentication, and frontend interfaces that make complex systems easier to understand and operate.
            </p>
            <a
              href='/this-is-me'
              className='text-link'
            >
              More about me
              <FiArrowUpRight />
            </a>
          </div>
        </div>
      </section>

      <section id='testimonials' className='relative flex min-h-[80vh] snap-start items-center overflow-hidden px-5 py-24 sm:px-8 lg:min-h-screen lg:px-10'>
        <div className='relative mx-auto w-full max-w-7xl'>
          <div className='max-w-4xl' data-reveal>
            <SectionLabel>Reference Signals</SectionLabel>
            <h2 className='type-section-heading-sm mt-4 text-grey-0 dark:text-grey-5'>
              Not just what I built. How I showed up.
            </h2>
            <p className='type-body-base mt-5 text-grey-1 dark:text-grey-3'>
              A few words from people who worked closely with me and trusted me with real engineering ownership.
            </p>
          </div>

          <div className='mt-10 grid items-start gap-5 lg:mt-12 lg:grid-cols-2' data-reveal>
            {ReferenceTestimonials.map((testimonial) => {
              const isExpanded = expandedReferences.includes(testimonial.name);

              return (
                <article
                  key={testimonial.name}
                  className='surface-card flex flex-col p-5 sm:p-6'
                >
                  <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <a
                        href={testimonial.linkedin}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='group inline-flex items-center gap-2 transition-colors duration-200 hover:text-secondary-1'
                      >
                        <h3 className='type-card-heading text-grey-0 transition-colors duration-200 group-hover:text-secondary-1'>{testimonial.name}</h3>
                        <FaLinkedin className='text-secondary-1' />
                      </a>
                      <div className='type-body mt-2 text-grey-1'>{testimonial.title}</div>
                    </div>
                    <div className='flex flex-wrap gap-2 sm:justify-end'>
                      {testimonial.signals.map((signal) => (
                        <span key={signal} className='tag-pill bg-primary-5 text-primary-0'>
                          {signal}
                        </span>
                      ))}
                    </div>
                  </div>

                  <blockquote className='type-body mt-6 flex-1 border-l border-secondary-3 pl-5 text-grey-1'>
                    <div className='space-y-4'>
                      <p>
                        &ldquo;{testimonial.quote[0]}{testimonial.quote.length === 1 && <>&rdquo;</>}
                      </p>

                      {testimonial.quote.length > 1 && (
                        <div
                          className={`grid transition-all duration-500 ease-in-out ${
                            isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                          }`}
                        >
                          <div className='min-h-0 overflow-hidden'>
                            <div className='space-y-4'>
                              {testimonial.quote.slice(1).map((line, lineIndex, lines) => (
                                <p key={line}>
                                  {line}
                                  {lineIndex === lines.length - 1 && <>&rdquo;</>}
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {testimonial.quote.length > 1 && (
                      <button
                        type='button'
                        onClick={() => toggleReference(testimonial.name)}
                        className='type-button mt-4 text-secondary-1 transition-colors duration-200 hover:text-secondary-3'
                      >
                        {isExpanded ? 'Read less' : 'Read more'}
                      </button>
                    )}
                  </blockquote>

                  <div className='mt-6 border-t border-grey-4 pt-4 text-right'>
                    <div className='type-kicker text-secondary-1'>{testimonial.date}</div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id='strengths' className='relative flex min-h-[80vh] snap-start items-center px-5 py-24 sm:px-8 lg:h-screen lg:px-10'>
        <div className='mx-auto w-full max-w-7xl overflow-hidden'>
          <div className='max-w-4xl' data-reveal>
            <SectionLabel>Strengths</SectionLabel>
            <h2 className='type-section-heading mt-4 text-grey-0 dark:text-grey-5'>
              I connect architecture, infrastructure, and product execution.
            </h2>
            <p className='type-body-base mt-5 text-grey-1 dark:text-grey-3'>
              The through-line is building systems that are understandable at the interface and dependable underneath.
            </p>
          </div>

          <div className='mt-14 space-y-5' data-reveal>
            <div className='border-y border-grey-4 py-5'>
              <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
                {Strengths.map((strength) => (
                  <div key={strength.title} className='surface-card p-5'>
                    <div className='flex items-start gap-4'>
                      <span className='icon-tile shrink-0'>
                        {strength.title.includes('Search') ? <FiSearch /> : strength.title.includes('Cloud') ? <FiCloud /> : strength.title.includes('Frontend') ? <FiCode /> : <FiDatabase />}
                      </span>
                      <h3 className='type-card-heading-sm text-grey-0'>{strength.title}</h3>
                    </div>
                    <p className='type-body mt-5 text-grey-1'>{strength.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className='overflow-hidden border-b border-grey-4 pb-5'>
              <div className='capability-marquee-reverse group/skills flex w-max gap-3'>
                {[...capabilityTools, ...capabilityTools].map((tool, index) => (
                  <span key={`${tool}-${index}`} className='tag-pill bg-grey-5/70 transition-colors duration-200 hover:border-primary-2 hover:bg-primary-5 hover:text-primary-0'>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id='experience' className='relative flex min-h-[80vh] snap-start items-center px-5 py-24 sm:px-8 lg:h-screen lg:px-10'>
        <div className='mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.36fr_1fr]'>
          <div data-reveal>
            <SectionLabel>Experience</SectionLabel>
            <h2 className='type-section-heading mt-4 text-grey-0 dark:text-grey-5'>Recent engineering work</h2>
          </div>
          <div className='space-y-5'>
            {featuredExperiences.map((experience) => (
              <article key={`${experience.company}-${experience.duration}`} className='surface-card surface-card-hover p-5' data-reveal>
                <div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
                  <div>
                    <h3 className='type-card-heading text-grey-0'>{experience.title}</h3>
                    <a href={experience.company_website} target='_blank' rel='noopener noreferrer' className='text-link mt-1'>
                      {experience.company}
                      <FiArrowUpRight />
                    </a>
                  </div>
                  <div className='type-nav text-grey-2'>{experience.duration}</div>
                </div>
                <p className='type-body mt-4 text-grey-1'>{experience.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id='projects' className='relative flex min-h-[80vh] snap-start items-center px-5 py-24 sm:px-8 lg:min-h-screen lg:px-10'>
        <div className='mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.34fr_1fr]'>
          <div data-reveal>
            <div className='lg:sticky lg:top-28'>
              <SectionLabel>Featured Work</SectionLabel>
              <h2 className='type-section-heading mt-4 text-grey-0'>
                Projects shaped around systems, search, and scale.
              </h2>
              <div className='mt-6 flex flex-wrap gap-4'>
                <a href='https://github.com/YashashreePatel' target='_blank' rel='noopener noreferrer' className='text-link'>
                  GitHub
                  <FiArrowUpRight />
                </a>
                <a href='/archive' className='text-link'>
                  View project archive
                  <FiArrowUpRight />
                </a>
              </div>
            </div>
          </div>

          <div className='space-y-5' data-reveal>
            {featuredProjects.map((project) => (
              <article key={project.name} className='surface-card surface-card-hover group p-5'>
                <div>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    {project.project_link ? (
                      <a
                        href={project.project_link}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='group/title inline-flex items-center gap-2'
                      >
                        <h3 className='type-card-heading text-grey-0 transition-colors duration-200 group-hover/title:text-secondary-1'>
                          {project.name}
                        </h3>
                        <FiArrowUpRight className='text-grey-1 transition-colors duration-200 group-hover/title:text-secondary-1' />
                      </a>
                    ) : (
                      <h3 className='type-card-heading text-grey-0'>{project.name}</h3>
                    )}
                    <div className='type-nav text-grey-2'>{project.completion_date}</div>
                  </div>

                  <p className='type-body mt-3 max-w-3xl text-grey-1'>
                    {project.description}
                  </p>

                  <div className='mt-4 flex flex-wrap gap-2'>
                    {project.tech_stack.slice(0, 5).map((tool) => (
                      <span key={`${project.name}-${tool}`} className='tag-pill bg-primary-5 text-primary-0'>
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}

          </div>
        </div>
      </section>

      <section id='academic-foundation' className='relative flex min-h-[70vh] snap-start items-center px-5 py-24 sm:px-8 lg:h-screen lg:px-10'>
        <div className='mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.42fr_1fr]'>
          <div data-reveal>
            <SectionLabel>Education</SectionLabel>
            <h2 className='type-section-heading mt-4 text-grey-0'>Academic foundation</h2>
          </div>
          <div className='grid gap-4 md:grid-cols-2'>
            {education.map((item) => (
              <article key={item.degree} className='surface-card p-6' data-reveal>
                <div className='type-card-heading-sm text-grey-0'>{item.degree}</div>
                <div className='type-body mt-3 text-grey-1'>{item.school}</div>
                <div className='type-nav mt-5 text-secondary-1'>{item.date}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
