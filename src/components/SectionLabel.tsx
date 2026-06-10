type SectionLabelProps = {
  children: string;
};

const SectionLabel = ({ children }: SectionLabelProps) => (
  <div className='section-label'>
    <span className='section-label-rule' />
    <div className='type-label text-secondary-1 dark:text-secondary-4'>{children}</div>
  </div>
);

export default SectionLabel;
