import React, { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        Swal.fire({
          icon: "success",
          title: "Subscribed!",
          text: "You have been added to our newsletter 🎉",
          confirmButtonColor: "#22c55e",
        });
        setEmail("");
      } else {
        Swal.fire({
          icon: "warning",
          title: "Oops!",
          text: data.error || "Something went wrong",
          confirmButtonColor: "#facc15",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Server not responding. Try again later.",
        confirmButtonColor: "#ef4444",
      });
    }
  };

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

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="input input-bordered w-full sm:w-80 rounded-xl px-4 py-3 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="btn btn-success text-white rounded-xl px-6 py-3"
          >
            Subscribe
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Newsletter;
