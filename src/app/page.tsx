import BackgroundLayout from '@/components/Layouts/BackgroundLayout';
import Cursor from '@/components/Cursor';
import ForegroundLayout from '@/components/Layouts/ForegraoundLayout';
import Navbar from '@/components/Header';
import Image from 'next/image';

export default function Home() {
  return (
    <div className='w-full h-full'>
      {/* <Cursor /> */}
      <BackgroundLayout />
      <ForegroundLayout />
    </div>
  );
}
