import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Trips = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const fetchPackages = async () => {
    const res = await axiosSecure.get("/api/packages");
    return res.data?.data || []; // returns the sorted list
  };

  const { data: packages = [], isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: fetchPackages,
  });

  //   Sort: Latest first (assuming packages have a createdAt or updatedAt field)
  //   const sortedPackages = [...packages].sort(
  //     (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  //   );

  return (
    <div className="p-6 bg-gray-50 rounded-xl shadow">
      <h2 className="text-3xl font-bold mb-4 text-center">
        Tourism & Travel Packages
      </h2>

      <div>
        <h1 className="text-xl font-semibold">Our Packages</h1>
      </div>

      {isLoading ? (
        <p className="text-center mt-10">Loading packages...</p>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 mt-4"
        >
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
                <p className="text-blue-600 font-semibold mt-1">${pkg.price}</p>
                <button
                  onClick={() => navigate(`/package-details/${pkg._id}`)}
                  className="mt-3 btn btn-outline btn-sm"
                >
                  View Package
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Trips;
