import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Spinner from "../../components/Spinner";
import useAxios from "../../hooks/useAxios";

const CommunityPage = () => {
  const axiosSecure = useAxios();


  const fetchStories = async () => {
    const res = await axiosSecure.get("/api/stories");
    return res.data?.data || [];
  };

  const { data: stories = [], isLoading } = useQuery({
    queryKey: ["stories"],
    queryFn: fetchStories,
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
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
            <Link
              to={`/community/story/${story._id}`}
              className="text-xl font-semibold text-blue-600 hover:underline"
            >
              {story.title}
            </Link>
            {story.imageUrls?.[0] && (
              <img
                src={story.imageUrls[0]}
                alt="Story"
                className="mt-4 rounded-lg max-h-96 object-cover w-full"
              />
            )}
            <p className="text-gray-800 whitespace-pre-line py-6 line-clamp-4">
              {story.content}
            </p>
            <Link
              to={`/community/story/${story._id}`}
              className="text-blue-500 font-medium hover:underline"
            >
              Read More →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommunityPage;
