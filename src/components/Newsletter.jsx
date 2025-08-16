import React from "react";
import { motion } from "framer-motion";

const Newsletter = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-base-300 to-base-200">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-4"
        >
          📩 Subscribe to Our Newsletter
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-gray-700 mb-8"
        >
          Get the latest travel updates, safety tips, and exclusive offers 
          delivered straight to your inbox.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full sm:w-80 rounded-xl px-4 py-3 focus:outline-none"
          />
          <button
            type="submit"
            className="btn bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-6 py-3"
          >
            Subscribe
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Newsletter;
