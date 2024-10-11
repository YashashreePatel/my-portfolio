import { useRef, useState } from 'react';
import Image from 'next/image';
import styles from '@/components/style.module.css';

import { Testimonials } from '@/data/Testimonials';
import { ITestimonail } from '@/types/ITestimonial';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

type TestimonialCardProps = {
  testimonial: ITestimonail;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <div className={`w-full flex flex-row gap-[80px] pr-[40px] rounded-[3px] bg-grey-5 dark:bg-grey-0 items-center ${styles.testi_card}`}>
      <div className={`w-4/5 h-[150px] relative flex justify-center items-center rounded-[3px] ${styles.testi_content_card}`}>
        <div className={`pl-[40px] pr-[80px] text-center text-grey-1 dark:text-grey-2 ${styles.body}`}>
          {testimonial.content}
        </div>
        <Image
          width={400}
          height={400}
          src={testimonial.image}
          alt='about image'
          className={`w-[80px] h-[80px] absolute right-[-40px] rounded-full object-cover`}
        />
      </div>
      <div className='w-1/5 flex flex-col 2xl:gap-2 gap-1 items-start'>
        <a
          href={testimonial.linkedin}
          target='_blank' className={`${styles.grey_dark} ${styles.testi_name}`}>
          {testimonial.name}
        </a>
        <div className={`${styles.grey_mid} ${styles.testi_occupation}`}>
          {testimonial.occupation}
        </div>
      </div>
    </div>
  )
}

const Testimonial = () => {
  return (
    <div id='testimonials' className='w-full relative flex flex-col gap-2 m-auto items-start justify-start'>
      <div className='w-full flex flex-col gap-4 items-center justify-center text-center'>
        <div className={`${styles.primary_light} ${styles.heading}`}>
          What <span className={`${styles.primary_dark}`}>people say</span> about <span className={`${styles.primary_dark}`}>me</span>
        </div>
        <div className={`${styles.grey_light} ${styles.body}`}> Explore testimonials showcasing how I was able to positively impact lives. I valued their transparency and feedbacks. </div>
      </div>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="w-full !p-[40px]"
      >
        {Testimonials.map((item, index) =>
          <SwiperSlide key={index}>
            <TestimonialCard testimonial={item} />
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  )
}

export default Testimonial;
