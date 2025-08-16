import React from "react";
import SwiperSlider from "../../components/SwiperSlider";
import TopAttractions from "../../components/TopAttractions";
import TourismGuideSection from "../../components/TourismGuideSection";
import TouristStories from "../../components/TouristStories";
import TouristTips from "../../components/TouristTips";
import Newsletter from "../../components/Newsletter";
import OverviewSection from "../../components/OverviewSection ";
import WhyChooseUs from "../../components/WhyChooseUs";

const Home = () => {
  return (
    <div>
      <SwiperSlider />
      <OverviewSection></OverviewSection>
      <TourismGuideSection></TourismGuideSection>
      <TouristStories />
      <TopAttractions />
      <WhyChooseUs></WhyChooseUs>
      <TouristTips />
      <Newsletter></Newsletter>
    </div>
  );
};

export default Home;
