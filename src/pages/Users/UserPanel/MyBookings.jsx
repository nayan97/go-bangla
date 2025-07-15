import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const MyBookings = () => {
      const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
    const { user } = useAuth();
   const email = user?.email;  

  const fetchPendingBookings = async () => {
    const res = await axiosSecure.get(`/api/bookings/user/${email}`);
    // server returns { success:true, data:[...] }
    return res.data?.data ?? [];
  };

  const {
    data: bookings = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["pendingBookings", email], // refetches if email changes
    queryFn: fetchPendingBookings,
    enabled: !!email,                     // don't fire until email exists
  });

  if (isLoading) return <p>Loading…</p>;
  if (error)     return <p>Error: {error.message}</p>;

    const handleDelete = (id) => {
    // console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/api/booking/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Parcel has been deleted.",
                icon: "success",
              });
            }
            refetch();
          })

          .catch((err) => {
            console.error(err);
            Swal.fire("Error!", "Failed to delete parcel.", "error");
          });
      }
    });
  };
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Pending bookings</h2>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Package</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={booking._id}>
              <td>{index + 1}</td>
              <td>{booking.packageName || "N/A"}</td>
              <td>{booking.price || "N/A"}</td>
              <td className="text-yellow-600 font-medium">
                {booking.status || "pending"}
              </td>
              <td>
                <button
              
                >
                  Approve
                </button>
               <button
                    onClick={() => handleDelete(booking._id)}
                    className="btn btn-error btn-sm mx-1"
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

export default MyBookings;