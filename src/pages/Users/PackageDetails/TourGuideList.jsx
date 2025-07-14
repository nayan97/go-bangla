import React from 'react';

const TourGuideList = ({ guideIds }) => {
     return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tour Plan</h2>
      <ul className="space-y-4">
            {guideIds}
      </ul>
    </div>
  );
};

export default TourGuideList;