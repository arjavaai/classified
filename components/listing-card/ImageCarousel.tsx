"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
// Import required modules
import { Pagination, Autoplay } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

interface ImageCarouselProps {
  images: string[]
  photoCount: number
}

export default function ImageCarousel({ images, photoCount }: ImageCarouselProps) {
  // Default fallback image if none provided
  const allImages = images.length > 0 ? images : ['/placeholder.svg']
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div 
      className="relative w-[170px] min-w-[170px] h-full listing-image-carousel"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ minWidth: '170px' }}
    >
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={allImages.length > 1}
        className="h-full w-full"
        grabCursor={true}
        simulateTouch={true}
        touchEventsTarget="container"
      >
        {allImages.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              src={image}
              alt="Listing image"
              width={634}
              height={634}
              className="w-full h-full object-cover"
              priority={index === 0}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      
      <div className="absolute bottom-2 left-2 z-20 bg-black bg-opacity-10 px-1.5 py-0.5 rounded text-xs font-medium text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="inline-block w-3 h-3 mr-1 text-white"
        >
          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
          <circle cx="12" cy="13" r="3" />
        </svg>{" "}
        {photoCount}
      </div>
    </div>
  )
} 