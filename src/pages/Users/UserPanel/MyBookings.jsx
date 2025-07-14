import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';

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
  } = useQuery({
    queryKey: ["pendingBookings", email], // refetches if email changes
    queryFn: fetchPendingBookings,
    enabled: !!email,                     // don't fire until email exists
  });

  if (isLoading) return <p>Loading…</p>;
  if (error)     return <p>Error: {error.message}</p>;
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Pending bookings</h2>
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
          {bookings.map((booking, index) => (
            <tr key={booking._id}>
              <td>{index + 1}</td>
              <td>{booking.packageName || "N/A"}</td>
              <td>{booking.email || "N/A"}</td>
              <td className="text-yellow-600 font-medium">
                {booking.status || "pending"}
              </td>
              <td>
                <button
              
                >
                  Approve
                </button>
                <button
                 
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