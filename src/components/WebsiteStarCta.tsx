'use client';

import { useEffect, useState } from 'react';
import { FiHeart } from 'react-icons/fi';

const STARRED_KEY = 'yp-portfolio-starred';

type WebsiteStarCtaProps = {
  inverted?: boolean;
};

const WebsiteStarCta = ({ inverted = false }: WebsiteStarCtaProps) => {
  const [isStarred, setIsStarred] = useState(false);
  const [count, setCount] = useState<number | null>(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const fetchCount = async () => {
      const savedStarred = window.localStorage.getItem(STARRED_KEY) === 'true';
      setIsStarred(savedStarred);

      try {
        const response = await fetch('/api/stars', { cache: 'no-store' });

        if (!response.ok) {
          setCount(0);
          return;
        }

        const data = await response.json() as { count?: number };
        setCount(data.count ?? 0);
      } catch {
        setCount(0);
      }
    };

    fetchCount();
  }, []);

  const handleStar = async () => {
    if (isPending) {
      return;
    }

    const nextStarred = !isStarred;
    setIsPending(true);

    try {
      const response = await fetch('/api/stars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: nextStarred ? 'star' : 'unstar' }),
      });

      if (!response.ok) {
        return;
      }

      const data = await response.json() as { count?: number };
      setCount(data.count ?? 0);
      setIsStarred(nextStarred);
      window.localStorage.setItem(STARRED_KEY, String(nextStarred));
    } finally {
      setIsPending(false);
    }
  };

  return (
    <button
      type='button'
      onClick={handleStar}
      aria-pressed={isStarred}
      disabled={isPending}
      className='flex w-full items-center justify-between gap-3 text-left disabled:cursor-not-allowed disabled:opacity-70 sm:gap-4'
    >
      <span className={`type-nav min-w-0 leading-5 ${inverted ? 'text-current' : 'text-grey-1 dark:text-grey-3'}`}>
        If this little corner of the web feels thoughtful, leave a little love for the work.
      </span>
      <span className='inline-flex shrink-0 items-center gap-2'>
        <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full sm:h-8 sm:w-8 ${
          inverted
            ? 'bg-grey-5/85 text-secondary-1 dark:bg-secondary-5 dark:text-secondary-1'
            : 'bg-secondary-5 text-secondary-1 dark:bg-grey-5/10 dark:text-grey-5'
        }`}>
          <FiHeart className={isStarred ? 'fill-current' : ''} />
        </span>
        <span className={`type-button ${inverted ? 'text-current' : 'text-grey-0 dark:text-grey-5'}`}>
          {count ?? '...'}
        </span>
      </span>
    </button>
  );
};

export default WebsiteStarCta;
