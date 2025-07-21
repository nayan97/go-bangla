import React from "react";
import { motion } from "framer-motion";

const tips = [
  {
    title: "Travel Safety in Bangladesh",
    image: "https://i.ibb.co/tPKhSs9w/unnamed.png",
    description:
      "Stay safe while exploring by avoiding late-night travel in unknown areas, using verified transport, and keeping your belongings secure.",
  },
  {
    title: "Budget Travel Tips",
    image: "https://i.ibb.co/xq7KWBXd/Imagepc39-1686153176702.jpg",
    description:
      "Use local buses, eat at local restaurants, and stay in guesthouses to enjoy Bangladesh on a budget without compromising the experience.",
  },
  {
    title: "Best Time to Visit",
    image: "https://i.ibb.co/Ld3PCVHW/images-3.jpg",
    description:
      "The ideal time to visit Bangladesh is between November and March when the weather is dry, cool, and comfortable for travel.",
  },
];

const TouristTips = () => {
  return (
    <section className="py-10 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">🧭 Tourist Tips</h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {tips.map((tip, idx) => (
            <div
              key={idx}
              className="card bg-base-200 shadow-md hover:shadow-lg transition"
            >
              <figure>
                <img
                  src={tip.image}
                  alt={tip.title}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title text-xl font-semibold">
                  {tip.title}
                </h3>
                <p className="text-sm text-gray-700">{tip.description}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TouristTips;
