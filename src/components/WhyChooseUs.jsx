import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Expert Tour Guides",
    description:
      "Our experienced and friendly guides ensure you get the most authentic travel experience.",
    icon: "🌍",
  },
  {
    title: "Affordable Packages",
    description:
      "We offer budget-friendly packages without compromising on quality and comfort.",
    icon: "💰",
  },
  {
    title: "24/7 Support",
    description:
      "Travel with peace of mind knowing we’re always here to assist you anytime.",
    icon: "📞",
  },
];

const WhyChooseUs = () => {
  return (
    <section
      className="relative w-full bg-fixed bg-cover bg-center py-20"
      style={{
        backgroundImage:
          "url('https://i.ibb.co.com/fdYs73Qp/premium-photo-1742493723997-e7a6dfc4952c.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12"
        >
          ⭐ Why Choose Us
        </motion.h2>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white text-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
