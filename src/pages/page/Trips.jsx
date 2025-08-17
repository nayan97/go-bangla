import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAxios from "../../hooks/useAxios";
import Spinner from "../../components/Spinner";

const Trips = () => {
  const axiosSecure = useAxios();
  const navigate = useNavigate();

  const [sortOrder, setSortOrder] = useState(""); // "asc" | "desc"
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

  const fetchPackages = async () => {
    const res = await axiosSecure.get("/api/packages");
    return res.data?.data || [];
  };

  const { data: packages = [], isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: fetchPackages,
  });

  // Filtering + Sorting
  const filteredPackages = useMemo(() => {
    let result = [...packages];

    // Search filter
    if (searchTerm) {
      result = result.filter(
        (pkg) =>
          pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pkg.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Price filter
    result = result.filter(
      (pkg) => pkg.price >= priceRange.min && pkg.price <= priceRange.max
    );

    // Sorting
    if (sortOrder === "asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [packages, sortOrder, searchTerm, priceRange]);

  return (
    <div className="p-6 bg-base-200 rounded-xl shadow">
      <h2 className="text-3xl font-bold mb-4 text-center">
        Tourism & Travel Packages
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left: Packages Grid (75%) */}
        <div className="md:w-3/4">
          {isLoading ? (
            <Spinner />
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredPackages.map((pkg) => (
                <div
                  key={pkg._id}
                  className="bg-base-100 rounded-xl shadow-md p-4"
                >
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
              {filteredPackages.length === 0 && (
                <p className="col-span-full text-center text-gray-500">
                  No packages found.
                </p>
              )}
            </motion.div>
          )}
        </div>

        {/* Right: Filter Sidebar (25%) */}
       <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
        className="md:w-1/4 bg-base-100 rounded-xl shadow p-4 h-fit">
          <h3 className="text-lg font-semibold mb-4">Filter & Sort</h3>

          {/* Search */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title or type"
              className="input input-bordered w-full"
            />
          </div>

          {/* Sort */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Sort by</label>
            <select
              className="select select-bordered w-full"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Default</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>

          {/* Price Range */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Price Range</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, min: Number(e.target.value) })
                }
                className="input input-bordered w-1/2"
                placeholder="Min"
              />
              <input
                type="number"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, max: Number(e.target.value) })
                }
                className="input input-bordered w-1/2"
                placeholder="Max"
              />
            </div>
          </div>

          <button
            onClick={() => {
              setSearchTerm("");
              setSortOrder("");
              setPriceRange({ min: 0, max: 10000 });
            }}
            className="btn btn-sm btn-outline w-full"
          >
            Reset Filters
          </button>
      </motion.div>

        //
      </div>
    </div>
  );
};

export default Trips;
