import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import Spinner from "../../components/Spinner";

const GuideProfile = () => {
  const { email } = useParams();
  const axiosSecure = useAxios();

  // Fetch guide profile
  const { data: guide, isLoading: loadingGuide } = useQuery({
    queryKey: ["guide", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/guides/${email}`);
      return res.data;
    },
    enabled: !!email,
  });

  // Fetch guide's stories
  const { data: stories = [], isLoading: loadingStories } = useQuery({
    queryKey: ["stories", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/stories/by-email/${email}`);

      // console.log("Story fetch response:", res.data);
      return res.data.data;
    },
    enabled: !!email,
  });

  if (loadingGuide || loadingStories) return <Spinner></Spinner>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-base-200">
      {/* Guide Info */}
      <div className="bg-base-100 p-6 rounded-2xl shadow-md my-2">
        <h2>Guide Profile view</h2>
      </div>
      <div className="bg-base-100 p-6 rounded-2xl shadow-md mb-10">
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1">
            <img src={guide.profilePic} alt="" className="w-[150px] h-[150px] object-cover rounded-full mb-2" />
            <h2 className="text-3xl font-bold mb-2">{guide.name}</h2>
            <p className="text-lg font-medium">{guide.title}</p>
          </div>
          <div className="col-span-1 space-y-2">
            <p>
              <strong>Email:</strong> {guide.email}
            </p>
            <p>
              <strong>Experience:</strong> {guide.experience}
            </p>
            <p>
              <strong>Location:</strong> {guide.location}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span className="capitalize">{guide.status}</span>
            </p>
            <p>
              <strong>CV:</strong>{" "}
              <a
                href={guide.cvLink}
                className="text-green-400 underline"
                target="_blank"
              >
                View
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Guide Stories */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Stories by {guide.name}</h3>
        {stories.length > 0 ? (
          <div className="grid md:grid-cols-1 gap-6">
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
                  <h2 className="text-xl font-semibold pb-4">{story.title}</h2>
                  {story.imageUrls && (
                    <img
                      src={story.imageUrls[0]}
                      alt="Story"
                      className="mt-4 rounded-lg max-h-96 object-cover w-full"
                    />
                  )}
                  <p className="whitespace-pre-line py-12">
                    {story.content}
                  </p>
                  {story.imageUrls && (
                    <img
                      src={story?.imageUrls[1]}
                      alt="Story"
                      className="mt-4 rounded-lg max-h-96 object-cover w-full"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No stories added yet.</p>
        )}
      </div>
    </div>
  );
};

export default GuideProfile;
