'use client';
import Navbar from '@/components/Header';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { LuArrowLeftFromLine } from "react-icons/lu";

export default function Home() {
  return (
    <div className={`w-full flex flex-col px-[30px] py-[35px] bg-grey-5`}>
      <a onClick={(e) => { e.preventDefault(); window.history.back(); }} className='flex flex-row gap-[2px] text-[15px] text-grey-0 items-center justify-start cursor-pointer'>
        <LuArrowLeftFromLine />
        <div className='font-inter font-light'> back </div>
      </a>
    </div>
  );
}
