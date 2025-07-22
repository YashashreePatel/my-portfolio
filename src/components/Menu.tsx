import { FiX } from 'react-icons/fi';

interface MenuProps {
  menuStatus: boolean;
  onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ menuStatus, onClose }) => {
  return (
    <div className={`fixed ${menuStatus ? 'translate-x-{200px]' : 'translate-x-[500px]'} top-0 right-0 w-[500px] h-screen bg-grey-5 transition-all duration-300 z-10`}>
      <FiX
        className='text-grey-1 text-3xl cursor-pointer transition-transform duration-300 hover:scale-110'
        onClick={onClose}
      />
      <div className='mt-10 text-white'>HI</div>
    </div>
  );
};

export default Menu;
