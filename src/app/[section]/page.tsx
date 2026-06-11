import { notFound } from 'next/navigation';

import Home from '@/app/page';
import { Sections } from '@/data/Sections';

type SectionPageProps = {
  params: Promise<{
    section: string;
  }>;
};

export const generateStaticParams = () => (
  Sections.map((section) => ({
    section: section.path.replace('/', ''),
  }))
);

const SectionPage = async ({ params }: SectionPageProps) => {
  const { section } = await params;
  const isKnownSection = Sections.some((item) => item.path === `/${section}`);

  if (!isKnownSection) {
    notFound();
  }

  return <Home />;
};

export default SectionPage;
