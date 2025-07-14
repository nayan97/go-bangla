import React from 'react';

const TourPlan = ({ plan }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tour Plan</h2>
      <ul className="space-y-4">
            {plan}
      </ul>
    </div>
  );
};


export default TourPlan;