// PackageDetails.jsx
import GallerySection from './GallerySection';

import AboutTour from './AboutTour';
import TourPlan from './TourPlan';
import TourGuideList from './TourGuideList';
import BookingForm from './BookingForm';

const PackageDetails = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-12">
      <GallerySection />
      <AboutTour />
      <TourPlan />
      <TourGuideList />
      <BookingForm />
    </div>
  );
};

export default PackageDetails;

