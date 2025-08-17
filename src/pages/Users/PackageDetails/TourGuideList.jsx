import React from 'react';
import { useNavigate } from 'react-router';

const TourGuideList = ({ guideIds }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tour Guides</h2>
      <ul className="space-y-4">
        {guideIds.map((email, index) => (
          <li key={index} className="flex items-center justify-between p-4 rounded shadow">
            <span className="">{email}</span>
            <button
              onClick={() => navigate(`/guide-profile/${email}`)}
              className="btn btn-outline btn-sm"
            >
              View Details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TourGuideList;
