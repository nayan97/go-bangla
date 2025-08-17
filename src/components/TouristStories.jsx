import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import useAxios from "../hooks/useAxios";
import Spinner from "./Spinner";

const TouristStories = () => {
  const axiosSecure = useAxios();
  const navigate = useNavigate();


  const { data: stories = [], isLoading } = useQuery({
    queryKey: ["randomStories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/stories/random");
      return res.data?.data || [];
    },
  });



  return (
    <div className="p-6 bg-base-100 rounded-xl shadow mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className=" text-end text-2xl font-bold ">Tourist Stories</h2>
        <button
          className="btn btn-outline btn-sm"
          onClick={() => navigate("/community")}
        >
          All Stories
        </button>
      </div>

      {isLoading ? (
     <Spinner></Spinner>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stories.map((story) => (
            <div
              key={story._id}
              className="bg-base-200 rounded-xl shadow p-4 flex flex-col"
            >
              <img
                src={story.imageUrls[0] || "/placeholder.jpg"}
                alt={story.title}
                className="rounded-md h-40 w-full object-cover"
              />
              <div className="mt-3 flex-1">
                <h3 className="text-lg font-bold">{story.title}</h3>
                <p className="text-sm mt-1 line-clamp-3">
                  {story.content}
                </p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <p className="text-sm">
                  by <span className="font-semibold">{story.email}</span>
                </p>
       
              </div>
                       <Link
                  to={`/community/story/${story._id}`}
                  className="text-blue-500 font-medium hover:underline items-end mt-3"
                >
                  Read More →
                </Link>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default TouristStories;
