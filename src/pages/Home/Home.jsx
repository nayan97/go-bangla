import React from 'react';
import SwiperSlider from '../../components/SwiperSlider';
import TopAttractions from '../../components/TopAttractions';
import TourismGuideSection from '../../components/TourismGuideSection';
import TouristStories from '../../components/TouristStories';
import TouristTips from '../../components/TouristTips';

const Home = () => {
  return (
    <div>
      <SwiperSlider />
      <TourismGuideSection></TourismGuideSection>  
          <TouristStories />
      <TopAttractions />
      <TouristTips />
    </div>
  );
};

export default Home;
