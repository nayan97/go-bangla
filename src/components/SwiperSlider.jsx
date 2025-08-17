import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Slider = () => {
  const backgroundImage1 =
    "https://i.ibb.co/RGbXychH/Marine-drive-road.jpg";
  const backgroundImage2 =
    "https://i.ibb.co/SwMGhcbZ/da284bd31d7a39ed2874320277d2d9f714f3db95f12f429d.jpg";
  const backgroundImage3 =
    "https://i.ibb.co/KcMNz7YQ/sun-banner-3.webp";

  return (
    <div className="w-full  max-w-[1440px] mx-auto mt-8 rounded-2xl overflow-hidden shadow-lg">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div
            className="h-64 md:h-96 lg:h-100 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${backgroundImage1})` }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gray-900 opacity-10 z-0"></div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6 z-10">
              <h2 className="text-xl lg:text-3xl font-bold mb-2">🌍 Explore the World, One Journey at a Time</h2>
              <p className="text-md lg:text-lg">
                Discover unforgettable adventures with us — your passport to wonder.
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div
            className="h-64 md:h-96 lg:h-100 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${backgroundImage2})` }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gray-900 opacity-10 z-0"></div>
            <div className="absolute inset-0  flex flex-col items-center justify-center text-white  text-center p-6">
              <h2 className="text-xl lg:text-3xl font-bold mb-2">🏝️ Turn Your Travel Dreams into Reality</h2>
              <p className="text-md lg:text-lg">
                Custom tours, local guides, and lifelong memories — all in one place.
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div
            className="h-64 md:h-96 lg:h-100 bg-cover bg-black bg-opacity-10 bg-center relative"
            style={{ backgroundImage: `url(${backgroundImage3})` }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gray-900 opacity-10 z-0"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white  text-center p-6">
              <h2 className="text-xl lg:text-3xl font-bold mb-2">✈️ Pack Your Bags, The World Awaits</h2>
              <p className="text-md lg:text-lg">
               From hidden gems to iconic landmarks — we take you there.
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
