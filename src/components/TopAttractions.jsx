import React from "react";
import { motion } from "framer-motion";

const attractions = [
  {
    name: "Cox's Bazar",
    image:
      "https://i.ibb.co/hx6fTDvR/what-is-the-tourist-attraction-of-coxs-bazar.jpg",
    description:
      "The longest natural sea beach in the world with serene beauty.",
  },
  {
    name: "Saint Martin's Island",
    image:
      "https://i.ibb.co/3YQmJVXH/premium-photo-1691675467788-02ccb60956cb.jpg",
    description:
      "A tropical island paradise with crystal clear water and coral reefs.",
  },
  {
    name: "Sylhet Tea Gardens",
    image: "https://i.ibb.co/7xSrttTR/istockphoto-1550261852-612x612.jpg",
    description: "Lush green hills covered with endless tea plantations.",
  },
  {
    name: "Sundarbans",
    image: "https://i.ibb.co/6Rvp6Lvs/sun-banner-3.webp",
    description:
      "The largest mangrove forest in the world, home to the Royal Bengal Tiger.",
  },
];

const TopAttractions = () => {
  return (
    <section className="py-10 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Top Attractions in Bangladesh
        </h2>
         <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {attractions.map((attraction, index) => (
            <div key={index} className="card bg-base-200 shadow-xl">
              <figure>
                <img
                  src={attraction.image}
                  alt={attraction.name}
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title text-xl font-semibold">
                  {attraction.name}
                </h3>
                <p>{attraction.description}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TopAttractions;
