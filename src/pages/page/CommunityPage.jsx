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
          className="bg-base-100 rounded-2xl shadow-md p-5"
        >
          <div className="flex items-center mb-3">
            <div className="bg-base-200 h-10 w-10 rounded-full mr-3" />
            <div>
              <h2 className="text-lg font-semibold">
                {story.username || story.email}
              </h2>
              <p className="text-sm">
                {new Date(story.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="mb-4">
            <Link
              to={`/community/story/${story._id}`}
              className="text-xl font-semibold hover:underline"
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
            <p className="whitespace-pre-line py-6 line-clamp-4">
              {story.content}
            </p>
            <Link
              to={`/community/story/${story._id}`}
              className="btn btn-success text-white rounded-full px-5 py-2 my-2"
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
