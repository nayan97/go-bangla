import React from "react";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/Spinner";

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";

const CommunityPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchStories = async () => {
    const res = await axiosSecure.get("/api/stories");
    return res.data?.data || [];
  };
  const { data: stories = [], isLoading } = useQuery({
    queryKey: ["stories"],
    queryFn: fetchStories,
  });

  console.log(stories.imageUrls);

  if (isLoading) return <Spinner></Spinner>;

  const handleShareClick = (e, storyId) => {
    if (!user) {
      e.preventDefault();
      navigate("/login");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {stories.map((story) => (
        <div
          key={story._id}
          className="bg-white rounded-2xl shadow-md p-5 border border-gray-200"
        >
          <div className="flex items-center mb-3">
            <div className="bg-gray-300 h-10 w-10 rounded-full mr-3" />
            <div>
              <h2 className="text-lg font-semibold">
                {story.username || story.email}
              </h2>
              <p className="text-sm text-gray-500">
                {new Date(story.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold pb-4">{story.title}</h2>
            {story.imageUrls && (
              <img
                src={story.imageUrls[0]}
                alt="Story"
                className="mt-4 rounded-lg max-h-96 object-cover w-full"
              />
            )}
            <p className="text-gray-800 whitespace-pre-line py-12">
              {story.content}
            </p>
            {story.imageUrls && (
              <img
                src={story.imageUrls[1]}
                alt="Story"
                className="mt-4 rounded-lg max-h-96 object-cover w-full"
              />
            )}
          </div>
          <div className="flex gap-2 pt-6">
            <FacebookShareButton
              url={window.location.href}
              quote={story.content}
              onClick={(e) => handleShareClick(e, story._id)}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton
              url={window.location.href}
              title={story.content}
              onClick={(e) => handleShareClick(e, story._id)}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <WhatsappShareButton
              url={window.location.href}
              title={story.content}
              onClick={(e) => handleShareClick(e, story._id)}
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommunityPage;
