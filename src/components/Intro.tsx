import styles from '@/components/style.module.css';

const Intro = () => {
  return (
    <div id='intro' className='w-full h-[100vh] flex items-center justify-center'>
      <div className='px-[200px] flex flex-col gap-6 justify-center items-center'>
        <div className='font-outfit text-[80px] text-grey-4 text-center leading-none tracking-[-0.025em]'>
          Building experiences that{' '}
          <span className={`${styles.gradient_text} text-transparent`}>
            inspire
          </span>{' '}
          and{' '}
          <span className={`${styles.gradient_text} text-transparent`}>
            include
          </span>
        </div>
        <div className='w-1/2 font-inter font-light text-[18px] text-grey-2 text-center leading-none'>
          Crafting intuitive experiences that cater to every user's needs with meticulous attention to details
        </div>
      </div>
    </div>
  )
}

export default Intro;
