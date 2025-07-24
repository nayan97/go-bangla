import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Slider = () => {
  const backgroundImage1 =
    "https://i.ibb.co/5HLzckj/istockphoto-1399812399-2048x2048.jpg";
  const backgroundImage2 =
    "https://i.ibb.co/R4vyr5x8/photo-1601972602288-3be527b4f18a.jpg";
  const backgroundImage3 =
    "https://i.ibb.co/FbzV86Cy/premium-photo-1681487729805-91f220c7da25.jpg";

  return (
    <div className="w-full max-w-7xl mx-auto mt-8 rounded-2xl overflow-hidden shadow-lg">
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
            className="h-96 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${backgroundImage1})` }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gray-900 opacity-10 z-0"></div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6 z-10">
              <h2 className="text-3xl font-bold mb-2">🔥 Big Launch Offer!</h2>
              <p className="text-lg">
                Get 50% off on our newly released productivity app.
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div
            className="h-64 md:h-96 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${backgroundImage3})` }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gray-900 opacity-10 z-0"></div>
            <div className="absolute inset-0  flex flex-col items-center justify-center text-white  text-center p-6">
              <h2 className="text-3xl font-bold mb-2">📱 App of the Month</h2>
              <p className="text-lg">
                Check out our top-rated fitness tracking app now!
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div
            className="h-64 md:h-96 bg-cover bg-black bg-opacity-10 bg-center relative"
            style={{ backgroundImage: `url(${backgroundImage2})` }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gray-900 opacity-10 z-0"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white  text-center p-6">
              <h2 className="text-3xl font-bold mb-2">🚀 New Feature Alert</h2>
              <p className="text-lg">
                Our finance app now supports UPI and more!
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
