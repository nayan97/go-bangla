import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Spinner from "../../../components/Spinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const PendingGuides = () => {
  const axiosdata = useAxiosSecure();
  const queryClient = useQueryClient();

  const fetchPendingGuides = async () => {
    const res = await axiosdata.get("/api/guides/pending");
    return Array.isArray(res.data) ? res.data : res.data.guides || [];
  };
  // ✅ Query to fetch pending guides
  const { data: guides = [], isLoading } = useQuery({
    queryKey: ["pending"],
    queryFn: fetchPendingGuides,
  });

  // ✅ Mutation for approval
  const approveMutation = useMutation({
    mutationFn: (id) => axiosdata.patch(`/api/guides/${id}/approve`),
    onSuccess: () => {
      queryClient.invalidateQueries(["pending"]);
    },
  });

  const handleApprove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will approve the guide and promote the user to guide role.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, approve it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        approveMutation.mutate(id, {
          onSuccess: () => {
            Swal.fire(
              "Approved!",
              "Guide has been activated and promoted.",
              "success"
            );
          },
          onError: () => {
            Swal.fire(
              "Error",
              "Something went wrong while approving.",
              "error"
            );
          },
        });
      }
    });
  };

  // ✅ Mutation for deletion
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosdata.delete(`/api/guides/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["pending"]);
    },
  });

    // Delete handler with Swal confirm
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the guide!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id, {
          onSuccess: () => {
            Swal.fire('Deleted!', 'Guide has been removed.', 'success');
          },
          onError: () => {
            Swal.fire('Error', 'Failed to delete guide.', 'error');
          },
        });
      }
    });
  };

  if (isLoading) return <Spinner></Spinner>;

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
          {guides.map((guide, index) => (
            <tr key={guide._id}>
              <td>{index + 1}</td>
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
                  Approve
                </button>
                <button
                  onClick={() =>  handleDelete(guide._id)}
                  className="btn btn-error btn-sm mx-1"
                  disabled={deleteMutation.isPending}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingGuides;
