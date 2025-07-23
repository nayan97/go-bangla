// PackageDetails.jsx
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';


import GallerySection from './GallerySection';
import AboutTour from './AboutTour';
import TourPlan from './TourPlan';
import TourGuideList from './TourGuideList';
import BookingForm from './BookingForm';
import useAxios from '../../../hooks/useAxios';




const PackageDetails = () => {
  const axiosdata = useAxios();
  const fetchPackageDetails = async (id) => {
  const res = await axiosdata.get(`/api/packagesby/${id}`);
  // console.log(res);
  return res.data;
  
};
  const { id } = useParams();

  const { data: packageData, isLoading, error } = useQuery({
    queryKey: ['packageDetails', id],
    queryFn: () => fetchPackageDetails(id),
    enabled: !!id,
  });

  if (isLoading) return <p className="text-center">Loading package details...</p>;
  if (error) return <p className="text-center text-red-500">Error loading data</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-12">
      <GallerySection images={packageData.images || []} />
      <AboutTour about={packageData.about} />
      <TourPlan faqs={packageData.faqs} />
      <TourGuideList guideIds={packageData.guideIds} />
      <BookingForm packageData={packageData} guides={packageData.guides || []} />
    </div>
  );
};

export default PackageDetails;

