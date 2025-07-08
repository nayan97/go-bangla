import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SwiperSlider = () => {
  return (
    <div className="w-full h-[500px]">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000 }}
        navigation
        pagination={{ clickable: true }}
        modules={[Autoplay, Navigation, Pagination]}
        className="w-full h-full"
      >
        <SwiperSlide>
          <img
            src="https://i.ibb.co/9mMmrMH5/premium-photo-1678565879444-f87c8bd9f241.jpg"
            className="w-full h-full object-cover"
            alt="Slide 1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://i.ibb.co/9mMmrMH5/premium-photo-1678565879444-f87c8bd9f241.jpg"
            className="w-full h-full object-cover"
            alt="Slide 2"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SwiperSlider;
