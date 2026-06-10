import Image from 'next/image';

type LogoMarkProps = {
  className?: string;
  showWordmark?: boolean;
};

const LogoMark = ({ className = '', showWordmark = false }: LogoMarkProps) => {
  return (
    <div className={`group/logo flex items-center gap-4 ${className}`}>
      <span className='relative block h-[30px] w-[38px] shrink-0'>
        <Image
          src='/images/logo/logo.png'
          alt='YP logo'
          width={139}
          height={110}
          priority
          className='absolute inset-0 h-full w-auto object-contain opacity-100 transition-opacity duration-200 dark:opacity-0 dark:group-hover/logo:opacity-100'
        />
        <Image
          src='/images/logo/logo-white.png'
          alt='YP logo'
          width={139}
          height={110}
          priority
          className='absolute inset-0 h-full w-auto object-contain opacity-0 transition-opacity duration-200 dark:opacity-100 dark:group-hover/logo:opacity-0'
        />
      </span>
      {showWordmark && (
        <div className='leading-none'>
          <div className='type-wordmark text-secondary-0 dark:text-grey-5'>
            Yashashree Patel
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoMark;
