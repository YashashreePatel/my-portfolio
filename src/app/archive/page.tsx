import { FiArrowLeft, FiArrowUpRight } from 'react-icons/fi';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

export const revalidate = 86400;
export const dynamic = 'force-dynamic';

type GitHubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  fork: boolean;
  archived: boolean;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
};

type RepoMeta = {
  title: string;
  description: string;
  builtWith?: string[];
  link?: string;
};

type ArchiveProject = {
  year: string;
  source: 'Work' | 'GitHub' | 'Personal' | 'Coursework';
  title: string;
  description: string;
  builtWith: string[];
  link?: string;
  linkLabel?: string;
};

const workProjects: ArchiveProject[] = [
  {
    year: '2026',
    source: 'Personal',
    title: 'FlowForge Workflow Orchestration Platform',
    description: 'Distributed workflow orchestration platform inspired by Temporal and Netflix Conductor, with persistent execution state, retry policy metadata, pause/resume/cancel controls, schedules, RBAC, metrics, trace IDs, and an operator dashboard.',
    builtWith: ['FastAPI', 'Next.js', 'Docker', 'Prometheus', 'Kubernetes'],
    link: '/archive/flow-forge',
    linkLabel: 'View',
  },
  {
    year: '2026',
    source: 'Work',
    title: 'APEX - AI Powered Execution Platform',
    description: 'Distributed microservices platform for automating incident triage workflows with real-time event processing, orchestration, external engineering-tool integrations, and observability.',
    builtWith: ['FastAPI', 'Node.js', 'Kubernetes', 'PostgreSQL', 'Redis'],
  },
  {
    year: '2026',
    source: 'Work',
    title: 'DocDiscovery Search Service',
    description: 'Semantic search service with multi-source indexing across GitHub, Jira, Confluence, Google Drive, and Backstage, using OpenSearch, normalized schemas, BM25 ranking, and benchmark queries.',
    builtWith: ['OpenSearch', 'BM25', 'Python', 'Node.js', 'Backstage'],
  },
  {
    year: '2024',
    source: 'Work',
    title: 'Intelligent Search Optimization Engine',
    description: 'Search optimization system focused on improving result quality and latency through Elasticsearch indexing, ranking strategies, Redis caching, and RabbitMQ pipelines.',
    builtWith: ['Node.js', 'Redis', 'RabbitMQ', 'Elasticsearch', 'REST APIs'],
  },
  {
    year: '2024',
    source: 'Personal',
    title: 'Portfolio v1',
    description: 'Earlier portfolio version preserved as a legacy view, showing the original visual direction, project cards, testimonials, and career story before the current redesign.',
    builtWith: ['Next.js', 'React', 'Tailwind CSS', 'Portfolio'],
    link: '/v1',
    linkLabel: 'View',
  },
];

const repoMeta: Record<string, RepoMeta> = {
  'flow-forge': {
    title: 'FlowForge Workflow Orchestration Platform',
    description: 'Distributed workflow orchestration platform for defining, executing, monitoring, and recovering long-running business workflows.',
    builtWith: ['FastAPI', 'Next.js', 'Docker', 'Prometheus', 'Kubernetes'],
    link: '/archive/flow-forge',
  },
  'daily-news-bot': {
    title: 'Daily News Bot',
    description: 'Python automation for collecting daily news updates and packaging them into a lightweight bot workflow.',
    builtWith: ['Python', 'Automation', 'News'],
  },
  'uscis-watch-bot': {
    title: 'USCIS Watch Bot',
    description: 'A monitoring bot for tracking USCIS case movement and reducing manual status checks.',
    builtWith: ['Python', 'Automation', 'Monitoring'],
  },
  'aashish-website': {
    title: 'Aashish Patel Portfolio',
    description: 'A personal portfolio website built for my brother with a clean profile, work, and contact presentation.',
    builtWith: ['Portfolio', 'Frontend', 'Responsive UI'],
  },
  'ca-website': {
    title: 'Cogniify AI Website',
    description: 'A live product website for Cogniify AI with a focused landing experience and production deployment.',
    builtWith: ['Product Website', 'Frontend', 'Vercel'],
    link: 'https://cogniify.ai',
  },
  'my-portfolio': {
    title: 'Yashashree Patel Portfolio',
    description: 'This portfolio site, built around engineering work, references, personal pages, and project experiments.',
    builtWith: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    link: 'https://yashashree.vercel.app',
  },
  'landing-page-template': {
    title: 'Landing Page Template',
    description: 'A reusable landing-page foundation for quick product experiments and polished one-page sites.',
    builtWith: ['Landing Page', 'Frontend', 'Template'],
  },
  'super-ai-visuaizer': {
    title: 'Super Agent Visualizer',
    description: 'Interactive interface for visualizing and editing multi-agent configuration flows through a clearer UI.',
    builtWith: ['TypeScript', 'React', 'Agent UI'],
  },
  'sentiment-analysis': {
    title: 'Sentiment Analysis',
    description: 'Natural language processing experiment for classifying text sentiment and exploring model-driven interpretation.',
    builtWith: ['NLP', 'Machine Learning', 'Analysis'],
  },
  'SAHAAY---Help-to-Earn': {
    title: 'SAHAAY - Help to Earn',
    description: 'A social-impact web concept for helping people find work opportunities and support toward stable income.',
    builtWith: ['CSS', 'Social Impact', 'Web App'],
  },
  'digital-time-capsule-platform': {
    title: 'Digital Time Capsule Platform',
    description: 'A product concept for preserving memories and messages digitally so they can be revisited later.',
    builtWith: ['Product Concept', 'Frontend', 'Archive'],
  },
  'YashashreePatel.github.io': {
    title: 'GitHub Pages Portfolio',
    description: 'An earlier GitHub Pages version of my portfolio and personal web presence.',
    builtWith: ['GitHub Pages', 'Portfolio', 'Web'],
  },
  'spotify-api': {
    title: 'Spotify API Explorer',
    description: 'Python project for working with Spotify API data and exploring music-related integrations.',
    builtWith: ['Python', 'Spotify API', 'Integration'],
  },
  ConnectSocial: {
    title: 'ConnectSocial',
    description: 'MERN social media dashboard for managing social workflows, analytics, authentication, and automated posting.',
    builtWith: ['React', 'Node.js', 'Firebase'],
  },
  'Data-Science-Engineering-Methods-and-Tools': {
    title: 'Data Science Engineering Methods and Tools',
    description: 'Coursework and experiments around data science workflows, engineering methods, and analytical tooling.',
    builtWith: ['Data Science', 'Engineering', 'Coursework'],
  },
  'Stresser-Website': {
    title: 'Stresser Website',
    description: 'Mental-health oriented web project exploring stress assessment and personality prediction workflows.',
    builtWith: ['JavaScript', 'React', 'Django'],
  },
  'Music-Recommendation-System': {
    title: 'Music Recommendation System',
    description: 'Recommendation-system experiment for analyzing music preferences and generating personalized suggestions.',
    builtWith: ['Jupyter Notebook', 'Machine Learning', 'Recommendation'],
  },
  'House-Property-Sales-and-Rental-Management': {
    title: 'House Property Sales and Rental Management',
    description: 'Database-backed management system for property sales, rental operations, and housing records.',
    builtWith: ['TSQL', 'Database', 'Management System'],
  },
  'Sales-Predication-of-Bigmart': {
    title: 'BigMart Sales Prediction',
    description: 'Machine learning notebook for predicting product sales and studying retail demand patterns.',
    builtWith: ['Jupyter Notebook', 'Machine Learning', 'Prediction'],
  },
  'Encryption-Decryption-using-RSA-Algorithm': {
    title: 'RSA Encryption and Decryption',
    description: 'Python mini project implementing RSA-based encryption and decryption fundamentals.',
    builtWith: ['Python', 'Cryptography', 'RSA'],
  },
};

const formatProjectName = (name: string) => (
  name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
);

const getRepoYear = (date: string) => new Date(date).getFullYear();

const getRepoStack = (repo: GitHubRepo, meta?: RepoMeta) => {
  if (meta?.builtWith) {
    return meta.builtWith;
  }

  const stack = [
    repo.language,
    ...repo.topics.map((topic) => formatProjectName(topic)),
  ].filter(Boolean) as string[];

  return stack.length > 0 ? stack.slice(0, 4) : ['Repository'];
};

const getProjectLink = (repo: GitHubRepo, meta?: RepoMeta) => (
  meta?.link || repo.homepage || repo.html_url
);

const getRepoSource = (repo: GitHubRepo): ArchiveProject['source'] => {
  if (repo.name.includes('Data-Science') || repo.name.includes('Bigmart') || repo.name.includes('RSA')) {
    return 'Coursework';
  }

  if (repo.name.includes('portfolio') || repo.name.includes('website') || repo.name.includes('template')) {
    return 'Personal';
  }

  return 'GitHub';
};

const getLinkProps = (link: string) => (
  link.startsWith('/')
    ? {}
    : { target: '_blank', rel: 'noopener noreferrer' }
);

const mapRepoToArchiveProject = (repo: GitHubRepo): ArchiveProject => {
  const meta = repoMeta[repo.name];
  const link = getProjectLink(repo, meta);

  return {
    year: String(getRepoYear(repo.created_at)),
    source: getRepoSource(repo),
    title: meta?.title || formatProjectName(repo.name),
    description: meta?.description || repo.description || 'Public GitHub project from my engineering archive.',
    builtWith: getRepoStack(repo, meta),
    link,
    linkLabel: meta?.link || repo.homepage ? 'Live' : 'GitHub',
  };
};

async function getGitHubRepos() {
  try {
    const response = await fetch('https://api.github.com/users/YashashreePatel/repos?per_page=100&sort=created', {
      next: { revalidate },
    });

    if (!response.ok) {
      return [];
    }

    const repos = await response.json() as GitHubRepo[];

    return repos
      .filter((repo) => !repo.fork)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  } catch {
    return [];
  }
}

const ProjectArchive = async () => {
  const repos = await getGitHubRepos();
  const curatedProjectTitles = new Set(workProjects.map((project) => project.title));
  const archiveProjects = [
    ...workProjects,
    ...repos
      .map(mapRepoToArchiveProject)
      .filter((project) => !curatedProjectTitles.has(project.title)),
  ];

  return (
    <main className='relative min-h-screen overflow-hidden bg-grey-5 text-grey-0'>
      <Header />

      <section className='relative z-10 px-5 pb-24 pt-36 sm:px-8 lg:px-10'>
        <div className='mx-auto max-w-7xl'>
          <a href='/what-i-have-been-building' className='text-link'>
            <FiArrowLeft />
            Featured projects
          </a>

          <div className='mt-6 max-w-4xl'>
            <h1 className='type-hero text-grey-0'>Project Archive</h1>
            <p className='type-body-lg mt-5 text-grey-1'>
              A fuller index of public GitHub work, experiments, coursework, and project builds.
            </p>
          </div>

          <div className='mt-12 grid gap-4 lg:hidden'>
            {archiveProjects.length === 0 && (
              <div className='surface-card p-5'>
                <p className='type-body-base text-grey-1'>Project archive is waiting on project data.</p>
              </div>
            )}

            {archiveProjects.map((project) => (
              <article key={`${project.source}-${project.title}`} className='surface-card p-5'>
                <div className='flex items-start justify-between gap-4'>
                  <span className='tag-pill bg-grey-5 text-grey-1'>{project.source}</span>
                  <span className='type-nav shrink-0 text-grey-2'>{project.year}</span>
                </div>
                <div className='mt-4'>
                  {project.link ? (
                    <a href={project.link} {...getLinkProps(project.link)} className='group inline-flex items-start gap-2'>
                      <h2 className='type-card-heading-sm text-grey-0 transition-colors duration-200 group-hover:text-secondary-1'>{project.title}</h2>
                      <FiArrowUpRight className='mt-1 shrink-0 text-grey-1 transition-colors duration-200 group-hover:text-secondary-1' />
                    </a>
                  ) : (
                    <h2 className='type-card-heading-sm text-grey-0'>{project.title}</h2>
                  )}
                  <p className='type-body mt-3 text-grey-1'>{project.description}</p>
                </div>
                <div className='mt-4 flex flex-wrap gap-2'>
                  {project.builtWith.map((item) => (
                    <span key={`${project.title}-${item}`} className='tag-pill bg-primary-5 text-primary-0'>
                      {item}
                    </span>
                  ))}
                </div>
                <div className='mt-5'>
                  {project.link ? (
                    <a href={project.link} {...getLinkProps(project.link)} className='text-link'>
                      {project.linkLabel}
                      <FiArrowUpRight />
                    </a>
                  ) : (
                    <span className='type-body text-grey-2'>Private</span>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className='mt-14 hidden overflow-x-auto lg:block'>
            <table className='w-full min-w-[1160px] border-collapse text-left'>
              <thead>
                <tr className='border-b border-grey-4'>
                  <th className='type-kicker w-24 py-4 text-grey-2'>Year</th>
                  <th className='type-kicker w-32 py-4 text-grey-2'>Source</th>
                  <th className='type-kicker w-[38%] py-4 text-grey-2'>Project</th>
                  <th className='type-kicker py-4 text-grey-2'>Built with</th>
                  <th className='type-kicker w-44 py-4 text-grey-2'>Link</th>
                </tr>
              </thead>
              <tbody>
                {archiveProjects.length === 0 && (
                  <tr>
                    <td colSpan={5} className='type-body-base py-10 text-grey-1'>
                      Project archive is waiting on project data.
                    </td>
                  </tr>
                )}

                {archiveProjects.map((project) => (
                  <tr key={`${project.source}-${project.title}`} className='group border-b border-grey-4 transition-colors duration-200 hover:bg-primary-5/20'>
                    <td className='type-body-base py-6 align-top text-grey-2'>{project.year}</td>
                    <td className='py-6 align-top'>
                      <span className='tag-pill bg-grey-5 text-grey-1'>
                        {project.source}
                      </span>
                    </td>
                    <td className='py-6 align-top'>
                      {project.link ? (
                        <a href={project.link} {...getLinkProps(project.link)} className='type-card-heading-sm text-grey-0 transition-colors duration-200 group-hover:text-secondary-1'>
                          {project.title}
                        </a>
                      ) : (
                        <div className='type-card-heading-sm text-grey-0'>{project.title}</div>
                      )}
                      <p className='type-body mt-2 max-w-xl text-grey-1'>{project.description}</p>
                    </td>
                    <td className='py-6 align-top'>
                      <div className='flex max-w-md flex-wrap gap-2'>
                        {project.builtWith.map((item) => (
                          <span key={`${project.title}-${item}`} className='tag-pill bg-primary-5 text-primary-0'>
                            {item}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className='py-6 align-top'>
                      {project.link ? (
                        <a href={project.link} {...getLinkProps(project.link)} className='text-link text-grey-1'>
                          {project.linkLabel}
                          <FiArrowUpRight />
                        </a>
                      ) : (
                        <span className='type-body text-grey-2'>Private</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ProjectArchive;
