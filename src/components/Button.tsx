import { FiArrowUpRight } from 'react-icons/fi';

interface ButtonProps {
  text: string;
  link: string;
}

const Button: React.FC<ButtonProps> = ({ text, link }) => {
  return (
    <a
      href={link}
      target='_self'
      rel='noopener noreferrer'
      className='inline-block px-[30px] py-[10px] flex flex-row gap-[5px] text-[15px] bg-grey-0 rounded-[5px] items-center transition-all duration-300 group hover:bg-secondary-3'
    >
      <div className='font-inter font-light text-grey-5 transition-all duration-300'> {text} </div>
      <FiArrowUpRight className='text-grey-5 group-hover:text-[20px] transition-all duration-300 ' />
    </a>
  );
};

export default Button;
