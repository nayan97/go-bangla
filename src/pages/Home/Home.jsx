import React from 'react';
import SwiperSlider from '../../components/SwiperSlider';
import TopAttractions from '../../components/TopAttractions';
import TourismGuideSection from '../../components/TourismGuideSection';
import TouristTips from '../../components/TouristTips';

const Home = () => {
  return (
    <div>
      <SwiperSlider />
      <TourismGuideSection></TourismGuideSection>      
      <TopAttractions />
      <TouristTips />
    </div>
  );
};

export default Home;
