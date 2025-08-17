import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Link } from "react-router";
import video from "../assets/overview/overview.mp4";

const OverviewSection = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
   <section className="py-16 px-4 bg-base-200">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Overview Section</h2>
      </div>
      <div className="max-w-[1440px] mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">
            Discover the Beauty of Bangladesh
          </h2>
          <p className="mb-6 leading-relaxed">
            GoBangla is your ultimate travel companion. Explore curated tour
            packages, connect with local guides, and experience unforgettable
            journeys across Bangladesh.
          </p>
          <Link to="/packages">
            <button className="btn btn-success text-white rounded-full px-6 py-3">
              Explore Packages
            </button>
          </Link>
        </motion.div>

        {/* Video Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative rounded-xl overflow-hidden shadow-xl"
        >
          <video
            ref={videoRef}
            className="w-full h-76 rounded-xl"
            src={video}
            autoPlay
            muted
            loop
            playsInline
          />

          {/* Controls */}
          <div className="absolute bottom-4 left-4 flex gap-3 bg-black/50 p-2 rounded-full">
            <button
              onClick={togglePlay}
              className="text-white hover:scale-110 transition"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button
              onClick={toggleMute}
              className="text-white hover:scale-110 transition"
            >
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OverviewSection;
