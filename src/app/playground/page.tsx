'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  FiActivity,
  FiArrowUpRight,
  FiCheckCircle,
  FiChevronDown,
  FiCpu,
  FiDatabase,
  FiGitBranch,
  FiPlay,
  FiRefreshCcw,
  FiSearch,
  FiShield,
  FiZap,
} from 'react-icons/fi';
import type { IconType } from 'react-icons';
import { gsap } from 'gsap';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SectionLabel from '@/components/SectionLabel';
import styles from '@/components/style.module.css';
import { Projects } from '@/data/Projects';
import { useReveal } from '@/hooks/useReveal';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

type AgentKind = 'planner' | 'searcher' | 'tool' | 'reviewer' | 'memory' | 'guardrail';
type MissionKey = 'incident' | 'release' | 'ranking';
type SearchAnswer = string;

type Agent = {
  id: string;
  kind: AgentKind;
  name: string;
  label: string;
  icon: IconType;
  color: string;
};

type SearchCard = {
  id: SearchAnswer;
  title: string;
  source: string;
  clue: string;
  score: number;
};

type SearchCase = {
  query: string;
  answerId: SearchAnswer;
  explanation: string;
  cards: SearchCard[];
};

type Slot = {
  id: string;
  title: string;
  prompt: string;
  ideal: AgentKind;
};

type Mission = {
  key: MissionKey;
  title: string;
  projectName: string;
  alert: string;
  badge: string;
  color: string;
  winCopy: string;
  loseCopy: string;
  slots: Slot[];
};

const agents: Agent[] = [
  {
    id: 'apex-planner',
    kind: 'planner',
    name: 'Incident Planner',
    label: 'turns alerts into steps',
    icon: FiGitBranch,
    color: 'bg-[#fff0a8] text-[#3b3315] border-[#e4c96e]',
  },
  {
    id: 'doc-searcher',
    kind: 'searcher',
    name: 'Doc Retriever',
    label: 'finds cross-source context',
    icon: FiSearch,
    color: 'bg-[#bdf0e3] text-[#12362f] border-[#82d7c5]',
  },
  {
    id: 'workflow-tool',
    kind: 'tool',
    name: 'Workflow Runner',
    label: 'executes service actions',
    icon: FiCpu,
    color: 'bg-[#c9d9ff] text-[#15254a] border-[#9db8f2]',
  },
  {
    id: 'release-reviewer',
    kind: 'reviewer',
    name: 'Release Reviewer',
    label: 'checks before handoff',
    icon: FiCheckCircle,
    color: 'bg-[#ffd1df] text-[#472033] border-[#efa7c0]',
  },
  {
    id: 'state-memory',
    kind: 'memory',
    name: 'State Keeper',
    label: 'carries workflow context',
    icon: FiDatabase,
    color: 'bg-[#dfccff] text-[#2e2146] border-[#c3a8ee]',
  },
  {
    id: 'risk-guardrail',
    kind: 'guardrail',
    name: 'Risk Gate',
    label: 'blocks unsafe moves',
    icon: FiShield,
    color: 'bg-[#ffd2a8] text-[#4a2a10] border-[#e6ae77]',
  },
];

const agentDeckLabels: Record<MissionKey, Record<AgentKind, Pick<Agent, 'name' | 'label'>>> = {
  incident: {
    planner: { name: 'Incident Planner', label: 'turns alerts into steps' },
    searcher: { name: 'Runbook Retriever', label: 'finds APEX recovery context' },
    tool: { name: 'Workflow Executor', label: 'runs service actions' },
    reviewer: { name: 'Resolution Reviewer', label: 'checks incident closure' },
    memory: { name: 'Signal Memory', label: 'keeps event context' },
    guardrail: { name: 'Safety Gate', label: 'blocks risky recovery' },
  },
  release: {
    planner: { name: 'Config Planner', label: 'maps JSON into steps' },
    searcher: { name: 'Schema Finder', label: 'finds agent config context' },
    tool: { name: 'Node Builder', label: 'turns structure into UI' },
    reviewer: { name: 'Flow Reviewer', label: 'checks visual handoffs' },
    memory: { name: 'State Keeper', label: 'carries graph state' },
    guardrail: { name: 'Config Guard', label: 'catches unsafe edits' },
  },
  ranking: {
    planner: { name: 'Intent Parser', label: 'understands search need' },
    searcher: { name: 'Hybrid Retriever', label: 'balances BM25 and semantic' },
    tool: { name: 'Index Runner', label: 'executes retrieval pass' },
    reviewer: { name: 'Ranking Judge', label: 'explains the top result' },
    memory: { name: 'Source Memory', label: 'keeps document context' },
    guardrail: { name: 'Trust Filter', label: 'checks source confidence' },
  },
};

const missions: Mission[] = [
  {
    key: 'incident',
    title: 'APEX Incident Room',
    projectName: 'APEX - AI Powered Execution Platform',
    alert: 'A real-time incident triage workflow is receiving noisy service signals. Dispatch the right agents to stabilize the route.',
    badge: 'level 1',
    color: 'from-[#ffc0d1] via-[#ffd7aa] to-[#fff0a8]',
    winCopy: 'APEX route cleared: the workflow was planned, enriched, executed, and verified.',
    loseCopy: 'APEX route drifted: the workflow needs cleaner handoffs before it can resolve safely.',
    slots: [
      { id: 'triage', title: 'Triage', prompt: 'Break the alert into a plan.', ideal: 'planner' },
      { id: 'context', title: 'Context', prompt: 'Find the most relevant runbook.', ideal: 'searcher' },
      { id: 'action', title: 'Action', prompt: 'Run the recovery step.', ideal: 'tool' },
      { id: 'verify', title: 'Verify', prompt: 'Check the fix before closing.', ideal: 'reviewer' },
    ],
  },
  {
    key: 'release',
    title: 'Visualizer Config Quest',
    projectName: 'Super Agent Visualizer',
    alert: 'A complex multi-agent JSON config needs to become a readable execution route before it ships.',
    badge: 'level 2',
    color: 'from-[#cfc5ff] via-[#c7e9ff] to-[#bdf0e3]',
    winCopy: 'Configuration route solved: the visual handoff now matches the underlying agent structure.',
    loseCopy: 'Configuration route tangled: the visual flow still hides too much of the agent structure.',
    slots: [
      { id: 'shape', title: 'Shape', prompt: 'Create a launch path.', ideal: 'planner' },
      { id: 'state', title: 'State', prompt: 'Carry rollout context.', ideal: 'memory' },
      { id: 'deploy', title: 'Deploy', prompt: 'Trigger the service action.', ideal: 'tool' },
      { id: 'risk', title: 'Risk Gate', prompt: 'Catch unsafe moves.', ideal: 'guardrail' },
    ],
  },
  {
    key: 'ranking',
    title: 'DocDiscovery Ranking Case',
    projectName: 'DocDiscovery Search Service',
    alert: 'A cross-source search result ranked strangely. Build the agent route that can explain the retrieval signal.',
    badge: 'level 3',
    color: 'from-[#dfccff] via-[#ffd1df] to-[#fff0a8]',
    winCopy: 'Ranking case explained: the retrieval path has enough context to justify the top result.',
    loseCopy: 'Ranking case unresolved: the search route needs stronger source context and review.',
    slots: [
      { id: 'question', title: 'Question', prompt: 'Understand the user intent.', ideal: 'planner' },
      { id: 'retrieve', title: 'Retrieve', prompt: 'Collect matching documents.', ideal: 'searcher' },
      { id: 'memory', title: 'Memory', prompt: 'Remember source context.', ideal: 'memory' },
      { id: 'explain', title: 'Explain', prompt: 'Validate the ranking story.', ideal: 'reviewer' },
    ],
  },
];

const searchDocuments: SearchCard[] = [
  {
    id: 'runbook',
    title: 'Redis timeout incident runbook',
    source: 'Confluence',
    clue: 'Exact keywords are strong, but the document is older.',
    score: 78,
  },
  {
    id: 'postmortem',
    title: 'Search service latency postmortem',
    source: 'Jira',
    clue: 'It matches the meaning of the whole incident.',
    score: 94,
  },
  {
    id: 'retry',
    title: 'Kubernetes retry policy notes',
    source: 'GitHub',
    clue: 'Useful infrastructure context, not the main answer.',
    score: 71,
  },
  {
    id: 'observability',
    title: 'APEX workflow observability guide',
    source: 'Backstage',
    clue: 'Great for tracing, weaker for the user query.',
    score: 68,
  },
  {
    id: 'opensearch-schema',
    title: 'OpenSearch schema normalization guide',
    source: 'GitHub',
    clue: 'Best when the query asks why sources index differently.',
    score: 90,
  },
  {
    id: 'benchmark',
    title: 'Search benchmark evaluation notes',
    source: 'Jira',
    clue: 'Best when the query asks about ranking accuracy or test cases.',
    score: 87,
  },
  {
    id: 'backstage',
    title: 'Backstage service catalog ingestion map',
    source: 'Backstage',
    clue: 'Best when the query asks about service ownership or catalog metadata.',
    score: 84,
  },
  {
    id: 'workflow-config',
    title: 'Multi-agent workflow JSON config',
    source: 'Supabase',
    clue: 'Best when the query asks how agent structure becomes a visual flow.',
    score: 89,
  },
  {
    id: 'terraform',
    title: 'Terraform provisioning pipeline checklist',
    source: 'GitHub',
    clue: 'Best when the query asks about infrastructure provisioning or cloud rollout.',
    score: 83,
  },
  {
    id: 'auth-dashboard',
    title: 'Dashboard auth and analytics notes',
    source: 'Firebase',
    clue: 'Best when the query asks about dashboard user flows or analytics access.',
    score: 76,
  },
];

const queryIntents = [
  {
    stem: 'redis timeout search incident workflow',
    answerId: 'postmortem',
    explanation: 'The postmortem wins because semantic ranking connects Redis timeout, latency, and the incident workflow.',
  },
  {
    stem: 'runbook steps for redis cache miss recovery',
    answerId: 'runbook',
    explanation: 'The runbook wins because the query asks for direct recovery steps.',
  },
  {
    stem: 'kubernetes retry timeout policy for service recovery',
    answerId: 'retry',
    explanation: 'The retry notes win because the query is about Kubernetes retry behavior.',
  },
  {
    stem: 'workflow observability trace agent execution',
    answerId: 'observability',
    explanation: 'The observability guide wins because the query asks how execution becomes traceable.',
  },
  {
    stem: 'normalize github jira confluence indexed schemas',
    answerId: 'opensearch-schema',
    explanation: 'The schema guide wins because the query focuses on multi-source normalization.',
  },
  {
    stem: 'benchmark semantic bm25 ranking accuracy cases',
    answerId: 'benchmark',
    explanation: 'Benchmark notes win because the query asks about ranking evaluation.',
  },
  {
    stem: 'backstage catalog service ownership metadata',
    answerId: 'backstage',
    explanation: 'The Backstage map wins because the query targets catalog metadata and ownership.',
  },
  {
    stem: 'visualize multi agent json node handoff config',
    answerId: 'workflow-config',
    explanation: 'The workflow config wins because the query asks about agent JSON becoming a node flow.',
  },
  {
    stem: 'terraform gcp provisioning deployment pipeline',
    answerId: 'terraform',
    explanation: 'The Terraform checklist wins because the query asks about provisioning and cloud rollout.',
  },
  {
    stem: 'social dashboard jwt analytics firebase access',
    answerId: 'auth-dashboard',
    explanation: 'Dashboard notes win because the query asks about auth, analytics, and Firebase access.',
  },
];

const queryModifiers = [
  'urgent production note',
  'for on-call handoff',
  'with source trust signal',
  'latest owner context',
  'for release review',
  'with latency symptoms',
  'after failed workflow',
  'from engineering docs',
  'with benchmark evidence',
  'for incident summary',
];

const getSearchCaseCards = (answerId: SearchAnswer, offset: number) => {
  const answer = searchDocuments.find((document) => document.id === answerId) ?? searchDocuments[0];
  const distractors = searchDocuments
    .filter((document) => document.id !== answer.id)
    .slice(offset, offset + 3);
  const wrappedDistractors = distractors.length === 3
    ? distractors
    : [
      ...distractors,
      ...searchDocuments.filter((document) => document.id !== answer.id).slice(0, 3 - distractors.length),
    ];

  return [answer, ...wrappedDistractors]
    .map((card, index) => ({
      ...card,
      score: card.id === answer.id ? Math.min(98, card.score + 3) : Math.max(54, card.score - index * 4),
    }))
    .sort((first, second) => first.title.localeCompare(second.title));
};

const searchCases: SearchCase[] = queryIntents.flatMap((intent, intentIndex) => (
  queryModifiers.map((modifier, modifierIndex) => ({
    query: `${intent.stem} ${modifier}`,
    answerId: intent.answerId,
    explanation: intent.explanation,
    cards: getSearchCaseCards(intent.answerId, (intentIndex + modifierIndex) % searchDocuments.length),
  }))
));

const getRandomSearchCaseIndex = (currentIndex?: number) => {
  if (searchCases.length <= 1) return 0;

  let nextIndex = Math.floor(Math.random() * searchCases.length);
  while (nextIndex === currentIndex) {
    nextIndex = Math.floor(Math.random() * searchCases.length);
  }

  return nextIndex;
};

const emptyAssignments = missions[0].slots.reduce<Record<string, AgentKind | null>>((acc, slot) => {
  acc[slot.id] = null;
  return acc;
}, {});

export default function Playground() {
  const [isDark, setIsDark] = useState(true);
  const [selectedMissionKey, setSelectedMissionKey] = useState<MissionKey>('incident');
  const [selectedAgent, setSelectedAgent] = useState<AgentKind>('planner');
  const [assignments, setAssignments] = useState<Record<string, AgentKind | null>>(emptyAssignments);
  const [isRunning, setIsRunning] = useState(false);
  const [runResult, setRunResult] = useState<string | null>(null);
  const [lives, setLives] = useState(3);
  const [searchCaseIndex, setSearchCaseIndex] = useState(0);
  const [searchPick, setSearchPick] = useState<SearchAnswer | null>(null);
  const [detectiveSolved, setDetectiveSolved] = useState(false);

  useReveal();
  useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      const triggerPoint = window.innerHeight * 0.65;
      setIsDark(window.scrollY < triggerPoint);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.classList.remove('dark');
    };
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

  useEffect(() => {
    setSearchCaseIndex(getRandomSearchCaseIndex());
  }, []);

  const selectedMission = missions.find((mission) => mission.key === selectedMissionKey) ?? missions[0];
  const selectedProject = Projects.find((project) => project.name === selectedMission.projectName);
  const searchProject = Projects.find((project) => project.name === 'DocDiscovery Search Service');
  const currentSearchCase = searchCases[searchCaseIndex % searchCases.length];
  const activeAgents = agents.map((agent) => ({
    ...agent,
    ...agentDeckLabels[selectedMission.key][agent.kind],
  }));
  const getAgent = (kind: AgentKind | null) => activeAgents.find((agent) => agent.kind === kind);

  useEffect(() => {
    setAssignments(selectedMission.slots.reduce<Record<string, AgentKind | null>>((acc, slot) => {
      acc[slot.id] = null;
      return acc;
    }, {}));
    setRunResult(null);
    setIsRunning(false);
  }, [selectedMission]);

  const score = useMemo(() => {
    const matchedSlots = selectedMission.slots.filter((slot) => assignments[slot.id] === slot.ideal).length;
    return Math.round((matchedSlots / selectedMission.slots.length) * 100);
  }, [assignments, selectedMission]);

  const assignedCount = selectedMission.slots.filter((slot) => assignments[slot.id]).length;
  const missionReady = assignedCount === selectedMission.slots.length;

  const assignSlot = (slotId: string) => {
    setAssignments((current) => ({
      ...current,
      [slotId]: selectedAgent,
    }));
    setRunResult(null);
  };

  const runMission = () => {
    if (!missionReady) {
      setRunResult('Assign every station before launching the mission.');
      return;
    }

    setIsRunning(true);
    setRunResult(null);
    window.setTimeout(() => {
      setIsRunning(false);

      if (score >= 75) {
        setRunResult(`${selectedMission.winCopy} +${score} points.`);
        return;
      }

      setLives((current) => Math.max(0, current - 1));
      setRunResult(`${selectedMission.loseCopy} +${score} points, -1 life.`);
    }, 900);
  };

  const resetMission = () => {
    setAssignments(selectedMission.slots.reduce<Record<string, AgentKind | null>>((acc, slot) => {
      acc[slot.id] = null;
      return acc;
    }, {}));
    setRunResult(null);
    setIsRunning(false);
  };

  const resetGame = () => {
    resetMission();
    setLives(3);
  };

  const nextSearchCase = () => {
    setSearchCaseIndex((current) => getRandomSearchCaseIndex(current));
    setSearchPick(null);
    setDetectiveSolved(false);
  };

  const playgroundModes = [
    {
      href: '#agent-dispatch',
      label: 'Agent Dispatch',
      detail: 'Assign project-specific agents to workflow stations.',
      accent: 'bg-[#f4d98b] text-[#2f2711]',
      border: 'border-[#f4d98b]/45',
      card: 'bg-[#e7cf83] text-[#2f2711] border-[#b69d55]',
      muted: 'text-[#5b502b]',
      float: 'play-card-float-a',
      icon: FiPlay,
    },
    {
      href: '#search-detective',
      label: 'Search Detective',
      detail: `Solve a random query from ${searchCases.length} search cases.`,
      accent: 'bg-[#9fcfc5] text-[#102d29]',
      border: 'border-[#9fcfc5]/45',
      card: 'bg-[#9fcfc5] text-[#102d29] border-[#6fa89d]',
      muted: 'text-[#315650]',
      float: 'play-card-float-b',
      icon: FiSearch,
    },
  ];

  return (
    <main className={`relative min-h-screen overflow-hidden text-grey-0 ${styles.bg_transition} ${isDark ? styles.dark : ''}`}>
      <Header lightOnTop={isDark} />

      <section className='relative flex min-h-screen snap-start items-center px-5 py-28 text-grey-5 sm:px-8 lg:px-10 lg:py-32'>
        <div className='pointer-events-none absolute right-[6%] top-[28%] h-80 w-80 rounded-full bg-[#ffd1df]/20 blur-3xl' />
        <div className='pointer-events-none absolute bottom-[12%] left-[10%] h-72 w-72 rounded-full bg-[#bdf0e3]/15 blur-3xl' />

        <div className='relative mx-auto flex min-h-[58vh] w-full max-w-7xl items-center'>
          <div className='mx-auto w-full max-w-[720px] xl:max-w-[780px]' data-reveal>
            <SectionLabel>Playground</SectionLabel>
            <h1 className='type-hero mt-4 max-w-4xl text-grey-5'>
              Play with the systems behind the work.
            </h1>
            <p className='type-body-lg mt-6 max-w-3xl text-grey-3'>
              Explore playful slices of my engineering work, from agent orchestration and workflow routing to semantic search and ranking decisions.
            </p>

            <div className='mt-10 grid gap-3 sm:grid-cols-2 xl:hidden'>
              {playgroundModes.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`play-mode-card-mobile group ${item.card} ${item.float}`}
                  >
                    <div className='flex items-start gap-4'>
                      <span className='play-mode-icon'>
                        <Icon />
                      </span>
                      <span>
                        <span className='block font-inter text-lg font-medium'>{item.label}</span>
                        <span className={`mt-2 block font-inter text-sm font-light leading-6 ${item.muted}`}>{item.detail}</span>
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {playgroundModes.map((item, index) => {
            const Icon = item.icon;

            return (
              <a
                key={item.href}
                href={item.href}
                className={`play-mode-card group absolute hidden w-[220px] xl:block 2xl:w-[240px] ${item.card} ${item.float} ${
                  index === 0 ? 'right-0 top-[18%]' : 'bottom-[2%] left-0 2xl:-bottom-[10%] 2xl:-left-16'
                }`}
                data-reveal
              >
                <div className='flex items-start justify-between gap-4'>
                  <div>
                    <div className='font-inter text-[10px] font-medium uppercase opacity-70'>Play mode</div>
                    <div className='mt-3 font-inter text-xl font-medium'>{item.label}</div>
                  </div>
                  <span className='play-mode-icon'>
                    <Icon />
                  </span>
                </div>
                <p className={`mt-4 font-inter text-sm font-light leading-6 ${item.muted}`}>{item.detail}</p>
                <div className='mt-5 inline-flex items-center gap-2 font-inter text-xs font-medium uppercase'>
                  Open
                  <FiArrowUpRight />
                </div>
              </a>
            );
          })}
        </div>
        <a
          href='#agent-dispatch'
          className='cover-scroll-cue absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-grey-5 sm:bottom-12'
          aria-label='Scroll to agent dispatch game'
        >
          <span className='type-nav text-grey-5'>Scroll down</span>
          <span className='flex h-10 w-10 items-center justify-center rounded-full border border-grey-5/70 bg-grey-0/15 text-[22px] backdrop-blur'>
            <FiChevronDown aria-hidden='true' />
          </span>
        </a>
      </section>

      <section id='agent-dispatch' className='relative snap-start px-5 py-20 sm:px-8 lg:px-10 lg:py-28'>
        <div className='relative mx-auto max-w-7xl'>
          <div className='game-surface-soft grid gap-4 transition-colors duration-700 dark:border-grey-1/80 dark:bg-grey-0/75 sm:grid-cols-[0.32fr_1fr]' data-reveal>
            <div>
              <SectionLabel>How To Play</SectionLabel>
              <p className='type-body-base mt-4 text-grey-1 dark:text-grey-3'>
                Source project: <span className='font-normal text-grey-0 dark:text-grey-5'>{selectedProject?.name ?? 'APEX, Super Agent Visualizer, DocDiscovery'}</span>
              </p>
            </div>
            <div>
              <p className='type-body-base text-grey-1 dark:text-grey-3'>
                Clear three project-based levels. Pick a mission, choose an agent from the crew deck, then click each station to assign that agent. Launch when all stations are filled. Better role matches raise the score; weak routes cost a life.
              </p>
              {selectedProject && (
                <div className='surface-panel mt-5 p-4 transition-colors duration-700 dark:border-grey-1 dark:bg-grey-0/80'>
                  <p className='type-body text-grey-1 dark:text-grey-3'>{selectedProject.description}</p>
                </div>
              )}
            </div>
          </div>

          <section className='game-board-shell mt-6 overflow-hidden bg-[#8a7289]' data-reveal>
            <div className={`bg-gradient-to-r ${selectedMission.color} p-5 sm:p-7`}>
              <div className='flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between'>
                <div>
                  <div className='game-badge game-shadow-soft inline-flex px-4 py-2 uppercase text-[#4e394d] dark:border-white/25 dark:bg-grey-0/75 dark:text-secondary-4 dark:shadow-[3px_3px_0_rgba(255,255,255,0.08)]'>
                    Agent Dispatch Board
                  </div>
                  <h2 className='mt-5 font-inter text-3xl font-medium leading-tight text-[#3f3044] sm:text-4xl lg:text-5xl'>
                    Build the right crew before the system timer blinks red.
                  </h2>
                </div>

                <div className='game-surface bg-white/85 p-4'>
                  <div className='font-inter text-xs font-medium uppercase text-[#8b3156]'>Route Score</div>
                  <div className='mt-1 font-inter text-5xl font-medium text-[#3f3044]'>{score}%</div>
                </div>
              </div>
            </div>

            <div className='grid gap-0 bg-[#8a7289] lg:grid-cols-[0.28fr_0.44fr_0.28fr]'>
              <aside className='game-panel-cream border-b border-[#8a7289] p-5 lg:border-b-0 lg:border-r'>
                <div className='type-kicker text-[#8b3156]'>Choose mission</div>
                <div className='mt-4 grid gap-3'>
                  {missions.map((mission) => (
                    <button
                      key={mission.key}
                      type='button'
                      onClick={() => setSelectedMissionKey(mission.key)}
                      className={`game-card ${
                        selectedMission.key === mission.key
                          ? 'bg-[#fff0a8]'
                          : 'bg-white/85'
                      }`}
                    >
                      <span className='font-inter text-[11px] font-medium uppercase text-[#8b3156]'>{mission.badge}</span>
                      <span className='mt-1 block font-inter text-lg font-medium text-[#3f3044]'>{mission.title}</span>
                    </button>
                  ))}
                </div>

                <div className='game-surface game-shadow-soft mt-6 bg-[#bdf0e3] p-4'>
                  <div className='font-inter text-xs font-medium uppercase text-[#06251f]'>Alert</div>
                  <p className='mt-2 font-inter text-sm font-light leading-6 text-[#06251f]'>{selectedMission.alert}</p>
                </div>
              </aside>

              <div className='bg-[#fff5fb] p-5'>
                <div className='grid gap-4'>
                  {selectedMission.slots.map((slot, index) => {
                    const assignedAgent = getAgent(assignments[slot.id]);
                    const Icon = assignedAgent?.icon ?? FiZap;
                    const matched = assignments[slot.id] === slot.ideal;

                    return (
                      <button
                        key={slot.id}
                        type='button'
                        onClick={() => assignSlot(slot.id)}
                        className={`game-card group ${
                          assignedAgent ? assignedAgent.color : 'bg-white text-[#3f3044]'
                        } ${isRunning ? 'animate-pulse' : ''}`}
                      >
                        <div className='flex items-start justify-between gap-4'>
                          <div>
                            <div className='font-inter text-xs font-medium uppercase opacity-75'>Station {index + 1}</div>
                            <h3 className='mt-1 font-inter text-2xl font-medium'>{slot.title}</h3>
                            <p className='mt-2 font-inter text-sm font-light leading-6 opacity-80'>{slot.prompt}</p>
                          </div>
                          <span className='game-icon-cell h-12 w-12 text-2xl'>
                            <Icon />
                          </span>
                        </div>
                        <div className='mt-4 flex flex-wrap items-center gap-2'>
                          <span className='game-badge'>
                            {assignedAgent ? assignedAgent.name : 'click to assign selected agent'}
                          </span>
                          {matched && (
                            <span className='game-badge bg-[#d9f7ad]'>
                              combo match
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className='mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4'>
                  <button
                    type='button'
                    onClick={runMission}
                    disabled={lives <= 0}
                    className='primary-button justify-center bg-[#4e394d] hover:bg-[#7a5d7a] disabled:cursor-not-allowed disabled:bg-grey-2'
                  >
                    <FiPlay />
                    Launch
                  </button>
                  <button type='button' onClick={resetMission} className='secondary-button game-shadow-tight justify-center border-[#8a7289] bg-white'>
                    <FiRefreshCcw />
                    Reset
                  </button>
                  <button type='button' onClick={resetGame} className='secondary-button game-shadow-tight justify-center border-[#8a7289] bg-white'>
                    <FiActivity />
                    New game
                  </button>
                  <div className='game-surface game-shadow-tight bg-white px-4 py-3 text-center'>
                    <div className='font-inter text-xs font-medium uppercase text-[#8b3156]'>Assigned</div>
                    <div className='font-inter text-lg font-medium text-[#3f3044]'>{assignedCount}/{selectedMission.slots.length}</div>
                  </div>
                </div>

                {runResult && (
                  <div className='game-surface mt-5 bg-[#fff0a8] p-4 font-inter text-base font-medium text-[#3f3044]'>
                    {runResult}
                  </div>
                )}
              </div>

              <aside className='game-panel-lavender border-t border-[#8a7289] p-5 lg:border-l lg:border-t-0'>
                <div className='type-kicker text-[#8b3156]'>Crew deck</div>
                <div className='mt-4 grid gap-3'>
                  {activeAgents.map((agent) => {
                    const Icon = agent.icon;
                    const isSelected = selectedAgent === agent.kind;

                    return (
                      <button
                        key={agent.id}
                        type='button'
                        onClick={() => setSelectedAgent(agent.kind)}
                        className={`game-card-compact ${agent.color} ${
                          isSelected ? 'ring-4 ring-[#8a7289]/20' : ''
                        }`}
                      >
                        <div className='flex items-center gap-3'>
                          <span className='game-icon-cell h-10 w-10'>
                            <Icon />
                          </span>
                          <span>
                            <span className='block font-inter text-base font-medium'>{agent.name}</span>
                            <span className='block font-inter text-xs font-light'>{agent.label}</span>
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </aside>
            </div>
          </section>
        </div>
      </section>

      <section id='search-detective' className='relative snap-start px-5 py-20 sm:px-8 lg:px-10 lg:py-28'>
        <div className='relative mx-auto max-w-7xl'>
          <div className='game-surface-soft grid gap-4 sm:grid-cols-[0.32fr_1fr]' data-reveal>
            <div>
              <SectionLabel>How To Play</SectionLabel>
              <p className='type-body-base mt-4 text-grey-1'>
                Source project: <span className='font-normal text-grey-0'>DocDiscovery Search Service</span>
              </p>
            </div>
            <div>
              <p className='type-body-base text-grey-1'>
                Read one query from a 100-case project-grounded pool, then guess which result should rank first for a semantic-heavy search pass. After you choose, the cards reveal the best match.
              </p>
              {searchProject && (
                <div className='surface-panel mt-5 p-4'>
                  <p className='type-body text-grey-1'>{searchProject.description}</p>
                </div>
              )}
            </div>
          </div>

          <section className='mt-10 grid gap-5 lg:grid-cols-[0.36fr_0.64fr]' data-reveal>
            <div className='game-surface-strong bg-[#c9d9ff] p-5 sm:p-7'>
              <SectionLabel>Search Detective</SectionLabel>
              <h2 className='mt-4 font-inter text-3xl font-medium leading-tight text-[#071a3a] sm:text-4xl'>
                Guess which result should win.
              </h2>
              <p className='mt-4 font-inter text-base font-light leading-7 text-[#071a3a]'>
                {currentSearchCase.query}
              </p>
              <button
                type='button'
                onClick={nextSearchCase}
                className='game-surface game-shadow-soft mt-6 inline-flex items-center gap-2 bg-white px-4 py-3 font-inter text-sm font-medium text-[#3f3044]'
              >
                <FiRefreshCcw />
                Next query
              </button>
            </div>

            <div className='game-surface-pink bg-white p-5 sm:p-7'>
              <div className='grid gap-3 md:grid-cols-2'>
                {currentSearchCase.cards.map((card) => {
                  const isPicked = searchPick === card.id;
                  const isAnswer = card.id === currentSearchCase.answerId;
                  const showResult = detectiveSolved && (isPicked || isAnswer);

                  return (
                    <button
                      key={card.id}
                      type='button'
                      onClick={() => {
                        setSearchPick(card.id);
                        setDetectiveSolved(true);
                      }}
                      className={`game-card ${
                        showResult && isAnswer
                          ? 'bg-[#d9f7ad]'
                          : showResult
                            ? 'bg-[#ffc8c8]'
                            : isPicked
                              ? 'bg-[#fff0a8]'
                              : 'game-panel-cream'
                      }`}
                    >
                      <div className='font-inter text-xs font-medium uppercase text-[#8b3156]'>{card.source}</div>
                      <h3 className='mt-2 font-inter text-xl font-medium text-[#3f3044]'>{card.title}</h3>
                      <p className='mt-3 font-inter text-sm font-light leading-6 text-[#4d4d4d]'>{card.clue}</p>
                      <div className='mt-4 flex items-center justify-between gap-3'>
                        <span className='game-badge bg-white text-[#3f3044]'>
                          semantic {card.score}%
                        </span>
                        {showResult && (
                          <span className='font-inter text-xs font-medium uppercase text-[#3f3044]'>
                            {isAnswer ? 'best clue' : 'close, but not top'}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {detectiveSolved && (
                <div className='game-surface mt-5 bg-[#bdf0e3] p-4 font-inter text-base font-light leading-7 text-[#12362f]'>
                  {searchPick === currentSearchCase.answerId
                    ? currentSearchCase.explanation
                    : `Good clue, but the better match is "${currentSearchCase.cards.find((card) => card.id === currentSearchCase.answerId)?.title}". ${currentSearchCase.explanation}`}
                </div>
              )}
            </div>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}
