import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { useNavigate } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth"; // <-- Assumes you have an auth context

const TouristStories = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth(); 

  const { data: stories = [], isLoading } = useQuery({
    queryKey: ["randomStories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/stories/random");
      return res.data?.data || [];
    },
  });

  const handleShareClick = (e, storyId) => {
    if (!user) {
      e.preventDefault();
      navigate("/login");
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Tourist Stories</h2>
        <button
          className="btn btn-outline btn-sm"
          onClick={() => navigate("/community")}
        >
          All Stories
        </button>
      </div>

      {isLoading ? (
        <p>Loading stories...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stories.map((story) => (
            <div
              key={story._id}
              className="bg-gray-50 rounded-xl shadow p-4 flex flex-col"
            >
              <img
                src={story.imageUrls [0] || "/placeholder.jpg"}
                alt={story.title}
                className="rounded-md h-40 w-full object-cover"
              />
              <div className="mt-3 flex-1">
                <h3 className="text-lg font-bold">{story.title}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                  {story.content}
                </p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  by <span className="font-semibold">{story.email}</span>
                </p>
                <FacebookShareButton
                  url={`${window.location.origin}/story/${story._id}`}
                  quote={story.title}
                  onClick={(e) => handleShareClick(e, story._id)}
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TouristStories;
