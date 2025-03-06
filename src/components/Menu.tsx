import { FiX } from 'react-icons/fi';

interface MenuProps {
  onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ onClose }) => {
  return (
    <div className='fixed top-0 right-0 w-1/2 h-screen bg-grey-2 flex flex-col items-end p-10 z-40 transition-all duration-300'>
      <FiX
        className='text-grey-5 text-3xl cursor-pointer transition-transform duration-300 hover:scale-110'
        onClick={onClose}
      />
      <div className='mt-10 text-white'>HI</div>
    </div>
  );
};

export default Menu;
