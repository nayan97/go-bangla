import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Spinner from "../../components/Spinner";
import { useState } from "react";
import { useMemo } from "react";

const ManageStory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardPerPage = 6;

  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // 2️⃣  Current user’s e‑mail
  const email = user?.email;

  // 3️⃣  Fetch stories that belong to this e‑mail
  const fetchStories = async () => {
    const res = await axiosSecure.get(`/api/stories/by-email/${email}`);
    return res.data?.data ?? [];
  }; // your backend returns { success, data }

  const {
    data: stories = [], // default empty array
    isLoading,
  } = useQuery({
    queryKey: ["stories", email], // 🗝 Unique cache per e‑mail
    queryFn: fetchStories,
    enabled: !!email && !authLoading, // wait until we actually know the user
  });

    // ✅ Calculate pagination info
    const totalPages = Math.ceil(stories.length / cardPerPage);
    const startIdx = (currentPage - 1) * cardPerPage;
    const currentData = useMemo(() => {
      return stories.slice(startIdx, startIdx + cardPerPage);
    }, [stories, startIdx]);

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
    return <Spinner></Spinner>;
  }

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Manage Your Stories</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.length === 0 ? (
          <p>No Stories Found.</p>
        ) : (
          <>
            {currentData.map((story) => (
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
          </>
        )}
      </div>    
      
      {/* ✅ Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-600">
          Showing {startIdx + 1} -{" "}
          {Math.min(startIdx + cardPerPage, stories.length)} of{" "}
          {stories.length}
        </span>

        <div className="join">
          <button
            className="join-item btn btn-sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            &lt;
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`join-item btn btn-sm ${
                currentPage === i + 1 ? "btn-active" : ""
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="join-item btn btn-sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            &gt;
          </button>
        </div>
      </div>

    </div>
  );
};

export default ManageStory;
