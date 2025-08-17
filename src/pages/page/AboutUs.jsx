import React from "react";
import { motion } from "framer-motion";
import About from "../../components/About";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="bg-base-200">
      <motion.div
        className="pb-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <About></About>

        <div className="mx-auto">
          <section className="px-8 py-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8">
                A quick peek into my journey, passions, and quirks.
              </h2>
            </div>

            <div className="bg-base-100 shadow-lg rounded-2xl p-6 md:p-6 leading-relaxed">
              <p className="mb-4">
                <span className="text-green-400 text-2xl font-semibold mr-2">
                  My programming journey:
                </span>
                Over the years, I've explored various technologies, from{" "}
                <span className="font-semibold">Laravel</span> and{" "}
                <span className="font-semibold">MySQL</span> to{" "}
                <span className="font-semibold">React</span>,{" "}
                <span className="font-semibold">Tailwind CSS</span>, and{" "}
                <span className="font-semibold">MongoDB</span>. I enjoy building
                both backend systems and user-friendly frontends—whether that's
                a tourism guide app, a learning management platform, or a slick
                admin dashboard. My favorite moments are when design and logic
                come together in perfect harmony.
              </p>

              <p className="mb-4">
                <span className="text-green-400 text-2xl font-semibold mr-2">
                The type of work I enjoy most?
                </span>
                 Problem-solving. I love tackling
                challenging features, optimizing performance, and designing
                intuitive user experiences. I believe in writing code that not
                only works but is maintainable and scalable.
              </p>

              <p className="mb-4">
                  <span className="text-green-400 text-2xl font-semibold mr-2">My hobbies and interests: </span>
                Outside of programming, you'll often find me exploring new
                places, enjoying photography, or catching up on tech news. I'm
                also a fan of badminton and a bit of a foodie—always on the hunt
                for the next delicious street snack.
              </p>

              <p>
                At my core, I'm curious, detail-oriented, and a firm believer
                that learning never stops. Every project is an opportunity to
                grow, and I'm excited for the challenges and adventures yet to
                come.
              </p>
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUs;
