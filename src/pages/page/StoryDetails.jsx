import React from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import Spinner from "../../components/Spinner";

const StoryDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchStory = async () => {
    const res = await axiosSecure.get(`/api/stories/id/${id}`);
    return res.data;
  };

  const {
    data: story,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["story", id],
    queryFn: fetchStory,
    enabled: !!id,
  });

  const handleShareClick = (e) => {
    if (!user) {
      e.preventDefault();
      navigate("/login");
    }
  };

  if (isLoading) return <Spinner />;
  if (isError) return <p className="text-red-500 text-center">{error.message}</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-base-200 rounded-2xl shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">{story.title}</h1>
        <p className="text-sm mb-2">
          Posted by <strong>{story.username || story.email}</strong> on{" "}
          {new Date(story.createdAt).toLocaleString()}
        </p>

        {story.imageUrls?.[0] && (
          <img
            src={story.imageUrls[0]}
            alt="Story"
            className="mb-6 rounded-lg max-h-96 object-cover w-full"
          />
        )}

        <p className="whitespace-pre-line mb-6">{story.content}</p>

        {story.imageUrls?.[1] && (
          <img
            src={story.imageUrls[1]}
            alt="Story"
            className="mt-4 rounded-lg max-h-96 object-cover w-full"
          />
        )}

        <div className="flex gap-2 pt-6 border-t mt-8">
          <FacebookShareButton
            url={window.location.href}
            quote={story.content}
            onClick={handleShareClick}
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>

          <TwitterShareButton
            url={window.location.href}
            title={story.content}
            onClick={handleShareClick}
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>

          <WhatsappShareButton
            url={window.location.href}
            title={story.content}
            onClick={handleShareClick}
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </div>
      </div>
    </div>
  );
};

export default StoryDetails;
