import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const ManageStory = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // 2️⃣  Current user’s e‑mail
  const email = user?.email;

  // 3️⃣  Fetch stories that belong to this e‑mail
  const fetchStories = async () => {
    const { data } = await axiosSecure.get("/api/stories",{ params: { email } } );
    return data.data; // your backend returns { success, data }
  };

  const {
    data: stories = [], // default empty array
    isLoading,
  } = useQuery({
    queryKey: ["stories", email], // 🗝 Unique cache per e‑mail
    queryFn: fetchStories,
    enabled: !!email && !authLoading, // wait until we actually know the user
  });

  const deleteStory = async (id) => {
    return await axiosSecure.delete(`/api/stories/${id}`);
  };
  const mutation = useMutation({
    mutationFn: deleteStory,
    onSuccess: () => {
      queryClient.invalidateQueries(["stories"]);
      Swal.fire("Deleted!", "Story has been deleted.", "success");
    },
    onError: () => {
      Swal.fire("Failed!", "Story could not be deleted.", "error");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this story!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(id);
      }
    });
  };

  if (isLoading) {
    return <p className="text-center text-xl mt-10">Loading stories...</p>;
  }

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Manage Your Stories</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div key={story._id} className="card bg-base-100 shadow-xl">
            {story.imageUrls?.[0] && (
              <figure>
                <img
                  src={story.imageUrls[0]}
                  alt="Story Cover"
                  className="h-48 w-full object-cover"
                />
              </figure>
            )}
            <div className="card-body">
              <h3 className="card-title">{story.title}</h3>
              <p className="line-clamp-3 text-sm text-gray-600">
                {story.content}
              </p>

              <div className="card-actions justify-end mt-4">
                <Link
                  to={`/dashboard/edit-story/${story._id}`}
                  className="btn btn-outline btn-sm"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(story._id)}
                  className="btn btn-error btn-sm text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageStory;
