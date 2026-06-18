import { FiArrowLeft, FiExternalLink } from 'react-icons/fi';

const FlowForgeArchivePage = () => (
  <main className='min-h-screen bg-grey-5 text-grey-0'>
    <header className='sticky top-0 z-50 border-b border-grey-4 bg-grey-5/90 px-5 py-4 backdrop-blur-xl sm:px-8 lg:px-10'>
      <div className='mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <a href='/archive' className='text-link'>
            <FiArrowLeft />
            Project archive
          </a>
          <h1 className='type-card-heading mt-3 text-grey-0'>FlowForge</h1>
          <p className='type-body mt-1 text-grey-1'>
            Workflow orchestration platform for long-running business processes.
          </p>
        </div>

        <a
          href='https://flow-forge-mvp.vercel.app'
          target='_blank'
          rel='noopener noreferrer'
          className='compact-primary-button self-start sm:self-center'
        >
          Open live app
          <FiExternalLink />
        </a>
      </div>
    </header>

    <section className='h-[calc(100vh-156px)] min-h-[680px] px-3 pb-3 sm:px-4 sm:pb-4 lg:px-5 lg:pb-5'>
      <iframe
        title='FlowForge live app'
        src='https://flow-forge-mvp.vercel.app'
        className='h-full w-full rounded-[8px] border border-grey-4 bg-grey-5'
      />
    </section>
  </main>
);

export default FlowForgeArchivePage;
