import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const AboutUs = () => {
  return (
    <motion.div
      className="max-w-3xl mx-auto py-6 px-3"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-4xl font-bold mb-6 text-center">About the Developer</h2>

      {/* Developer Bio */}
      <div className="bg-base-100 shadow-lg p-6 rounded-2xl mb-6">
        <p className="text-lg">
          👋 Hi, I'm <strong>Nayan Islam</strong>, a passionate full-stack web developer based in Bangladesh. I love building modern, responsive, and engaging web apps. My goal is to create meaningful experiences through clean and maintainable code.
        </p>
      </div>

      {/* Skills Section */}
      <div className="bg-base-200 shadow-md p-4 rounded-xl mb-6">
        <h3 className="text-2xl font-semibold mb-2">🛠️ Technologies & Skills</h3>
        <p>
          React, Tailwind CSS, Node.js, Express, MongoDB, Firebase Auth, React Router, DaisyUI, Framer Motion, REST API, and more.
        </p>
      </div>

      {/* Projects Section */}
      <div className="bg-base-100 shadow-md p-4 rounded-xl mb-6">
        <h3 className="text-2xl font-semibold mb-2">📁 Projects</h3>
        <p>I have built over <strong>10+ full-stack projects</strong>, ranging from tourism platforms to admin dashboards.</p>
        <ul className="list-disc pl-5 mt-3 space-y-2">
          <li>
            <a
              href="https://gobangla-fc335.web.app/"
              className="text-blue-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GoBangla - Tour Booking App
            </a>{" "}
            (React + MongoDB + Firebase Auth)
          </li>
          <li>
            <a
              href="https://github.com/nayan97"
              className="text-blue-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Developer Portfolio Site
            </a>{" "}
            (Responsive with dark mode and animations)
          </li>
        </ul>
      </div>

      {/* Social Links */}
      <div className="text-center mt-6 space-x-4">
        <a
          href="https://github.com/nayan97"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-xl"
        >
          <FaGithub className="inline mr-1" /> GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/nayan-islam-91724a196/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-xl"
        >
          <FaLinkedin className="inline ml-4 mr-1" /> LinkedIn
        </a>
      </div>
    </motion.div>
  );
};

export default AboutUs;
