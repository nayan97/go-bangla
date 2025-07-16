
 import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";


const AssignedTours = () => {
     const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth(); // Make sure it returns user.email
  const guideEmail = user?.email;

  // ✅ Fetch assigned tours
  const { data: tours = [], isLoading } = useQuery({
    queryKey: ["assignedTours", guideEmail],
    queryFn: () => axiosSecure.get(`/api/assigned-tours/${guideEmail}`).then(res => res.data),
    enabled: !!guideEmail,
  });

  // ✅ Accept tour
  const acceptMutation = useMutation({
    mutationFn: (tourId) => axiosSecure.patch(`/api/assigned-tours/${tourId}/accept`),
    onSuccess: () => {
      queryClient.invalidateQueries(["assignedTours", guideEmail]);
    },
  });

  // ✅ Reject tour
  const rejectMutation = useMutation({
    mutationFn: (tourId) => axiosSecure.patch(`/api/assigned-tours/${tourId}/reject`),
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
            {tours.map((tour) => (
              <tr key={tour._id}>
                <td>{tour.packageName}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <img src={tour.touristImage} alt={tour.touristName} className="w-8 h-8 rounded-full" />
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
    </div>
  );
};

export default AssignedTours;
