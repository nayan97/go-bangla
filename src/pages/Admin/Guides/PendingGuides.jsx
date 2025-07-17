import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Spinner from "../../../components/Spinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState, useMemo } from "react";

const PendingGuides = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const guidePerPage = 10;

  const axiosdata = useAxiosSecure();
  const queryClient = useQueryClient();

  // ✅ Fetch all pending guides once
  const { data: allGuides = [], isLoading } = useQuery({
    queryKey: ["pending"],
    queryFn: async () => {
      const res = await axiosdata.get("/api/guides/pending");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  // ✅ Calculate pagination info
  const totalPages = Math.ceil(allGuides.length / guidePerPage);
  const startIdx = (currentPage - 1) * guidePerPage;

  const currentData = useMemo(() => {
    return allGuides.slice(startIdx, startIdx + guidePerPage);
  }, [allGuides, startIdx]);

  // ✅ Mutation: Approve
  const approveMutation = useMutation({
    mutationFn: (id) => axiosdata.patch(`/api/guides/${id}/approve`),
    onSuccess: () => queryClient.invalidateQueries(["pending"]),
  });

  const handleApprove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will approve the guide and promote the user to guide role.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        approveMutation.mutate(id, {
          onSuccess: () => {
            Swal.fire("Approved!", "Guide has been activated.", "success");
          },
          onError: () => {
            Swal.fire("Error", "Approval failed.", "error");
          },
        });
      }
    });
  };

  // ✅ Mutation: Delete
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosdata.delete(`/api/guides/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["pending"]),
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the guide!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id, {
          onSuccess: () => {
            Swal.fire("Deleted!", "Guide has been removed.", "success");
          },
          onError: () => {
            Swal.fire("Error", "Failed to delete guide.", "error");
          },
        });
      }
    });
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Pending Guides</h2>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((guide, index) => (
            <tr key={guide._id}>
              <td>{startIdx + index + 1}</td>
              <td>{guide.name || "N/A"}</td>
              <td>{guide.email || "N/A"}</td>
              <td className="text-yellow-600 font-medium">
                {guide.status || "pending"}
              </td>
              <td>
                <button
                  onClick={() => handleApprove(guide._id)}
                  className="btn btn-warning btn-sm mx-1"
                  disabled={approveMutation.isPending}
                >
                  Accept
                </button>
                <button
                  onClick={() => handleDelete(guide._id)}
                  className="btn btn-error btn-sm mx-1"
                  disabled={deleteMutation.isPending}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-600">
          Showing {startIdx + 1} -{" "}
          {Math.min(startIdx + guidePerPage, allGuides.length)} of{" "}
          {allGuides.length}
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

export default PendingGuides;
