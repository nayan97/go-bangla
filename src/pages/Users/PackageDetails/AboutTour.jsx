import React from 'react';

const AboutTour = ({ about }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">About the Tour</h2>
      <p className="leading-relaxed">{about}</p>
    </div>
  );
};
export default AboutTour ;