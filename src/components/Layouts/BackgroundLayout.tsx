const BackgroundLayout = () => {
  return (
    <div className='w-full h-full absolute top-0 left-0 flex flex-row gap-0 z-10'>
      <div className='w-2/5 h-full bg-background-image bg-cover'>
        <div className='w-full h-full bg-primary-4 opacity-90'> </div>
      </div>
      <div className='w-3/5 h-full'> </div>
    </div>
  );
}

export default BackgroundLayout;
