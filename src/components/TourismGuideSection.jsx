import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useNavigate } from "react-router";

const TourismGuideSection = () => {
  const [packages, setPackages] = useState([]);
  const [guides, setGuides] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/packages/random")
      .then((res) => res.json())
      .then(setPackages);
      // console.log(packages.price);
      

    fetch("http://localhost:3000/api/guides/random")
      .then((res) => res.json())
      .then(setGuides);
  }, []);

  return (
    <div className="p-6 bg-gray-50 rounded-xl shadow">
      <h2 className="text-3xl font-bold mb-4 text-center">
        Tourism & Travel Guide
      </h2>
      <Tabs>
       <div className="text-center">
         <TabList>
          <Tab>Our Packages</Tab>
          <Tab>Meet Our Tour Guides</Tab>
        </TabList>
       </div>

        {/* Packages Tab */}
        <TabPanel>
          <div>
            <h1>tour Packages</h1>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-4">
            {packages.map((pkg) => (
             
              
              <div key={pkg._id} className="bg-white rounded-xl shadow-md p-4">
                <img
                  src={pkg.images?.[0] || "/placeholder.jpg"}
                  alt={pkg.title}
                  className="rounded-md h-40 w-full object-cover"
                />
                <div className="mt-3">
                    <p className="text-sm text-gray-500">{pkg.type}</p>
                  <h3 className="text-lg font-bold">{pkg.title}</h3>
                  <p className="text-blue-600 font-semibold mt-1">
                    ${pkg.price}
                  </p>
                  <button
                    onClick={() => navigate(`/package-details/${pkg._id}`)}
                    className="mt-3 btn btn-outline btn-sm"
                  >
                    View Package
                  </button>
                </div>
              </div>
            ))}
          </div>
        </TabPanel>

        {/* Guides Tab */}
        <TabPanel>
          <div>
            <h1>tour Guide</h1>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-4">
            {guides.map((guide) => (
              <div
                key={guide._id}
                className="bg-white rounded-xl shadow-md p-4"
              >
                <img
                  src={guide.photo}
                  alt={guide.name}
                  className="rounded-md h-40 w-full object-cover"
                />
                <div className="mt-3">
                  <h3 className="text-lg font-bold">{guide.name}</h3>
                  <p className="text-gray-600">
                    {guide.experience} years experience
                  </p>
                  <button
                    onClick={() => navigate(`/guides/${guide._id}`)}
                    className="mt-3 btn btn-outline btn-sm"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default TourismGuideSection;
