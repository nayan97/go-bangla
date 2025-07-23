import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { useMemo } from "react";

const AssignedTours = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 10;
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth(); // Make sure it returns user.email
  const guideEmail = user?.email;

  // ✅ Fetch assigned tours
  const { data: tours = [], isLoading } = useQuery({
    queryKey: ["assignedTours", guideEmail],
    queryFn: () =>
      axiosSecure
        .get(`/api/assigned-tours/${guideEmail}`)
        .then((res) => res.data),
    enabled: !!guideEmail,
  });

  // ✅ Calculate pagination info
  const totalPages = Math.ceil(tours.length / dataPerPage);
  const startIdx = (currentPage - 1) * dataPerPage;
  const currentData = useMemo(() => {
    return tours.slice(startIdx, startIdx + dataPerPage);
  }, [tours, startIdx]);

  // ✅ Accept tour
  const acceptMutation = useMutation({
    mutationFn: (tourId) =>
      axiosSecure.patch(`/api/assigned-tours/${tourId}/accept`),
    onSuccess: () => {
      queryClient.invalidateQueries(["assignedTours", guideEmail]);
    },
  });

  // ✅ Reject tour
  const rejectMutation = useMutation({
    mutationFn: (tourId) =>
      axiosSecure.patch(`/api/assigned-tours/${tourId}/reject`),
    onSuccess: () => {
      queryClient.invalidateQueries(["assignedTours", guideEmail]);
      Swal.fire("Rejected", "The tour has been rejected.", "success");
    },
  });

  // ✅ Confirm before reject
  const handleReject = async (tourId) => {
    const result = await Swal.fire({
      title: "Reject this tour?",
      text: "Are you sure you want to reject?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject it",
    });

    if (result.isConfirmed) {
      rejectMutation.mutate(tourId);
    }
  };

  if (isLoading) return <p>Loading assigned tours...</p>;

  return (
    <div className="overflow-x-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">My Assigned Tours</h2>
      {tours.length === 0 ? (
        <p>No assigned tours.</p>
      ) : (
        <table className="table w-full">
          <thead>
            <tr>
              <th>Package</th>
              <th>Tourist</th>
              <th>Date</th>
              <th>Price</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((tour) => (
              <tr key={tour._id}>
                <td>{tour.packageName}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <img
                      src={tour.touristImage}
                      alt={tour.touristName}
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{tour.touristName}</span>
                  </div>
                </td>
                <td>{new Date(tour.tourDate).toLocaleDateString()}</td>
                <td>${tour.price}</td>
                <td>{tour.status}</td>
                <td className="flex gap-2 justify-center">
                  <button
                    className="btn btn-success btn-sm"
                    disabled={tour.status !== "in-review"}
                    onClick={() => acceptMutation.mutate(tour._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => handleReject(tour._id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ✅ Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-600">
          Showing {startIdx + 1} -{" "}
          {Math.min(startIdx + dataPerPage, tours.length)} of {tours.length}
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

export default AssignedTours;
