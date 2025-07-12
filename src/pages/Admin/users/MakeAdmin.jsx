import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';




const MakeAdmin = () => {
  const [searchText, setSearchText] = useState('');
  const [debouncedText, setDebouncedText] = useState('');
  const queryClient = useQueryClient();

    const axiosdata = useAxiosSecure();

    const fetchUsers = async (searchText) => {
  if (!searchText) return [];
  const res = await axiosdata.get(`/users/search?email=${searchText}`);
  console.log("fetched users:", res.data);
  return res.data;
};
  // Debounce input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedText(searchText), 400);
    return () => clearTimeout(timer);
  }, [searchText]);

  // Query: fetch users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['search-users', debouncedText],
    queryFn: () => fetchUsers(debouncedText),
    enabled: !!debouncedText,
  });

  // Mutation: make admin
  const makeAdminMutation = useMutation({
    mutationFn: (email) => axiosdata .patch(`/users/make-admin/${email}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['search-users', debouncedText]);
      Swal.fire('Success', 'User promoted to admin.', 'success');
    },
  });

  // Mutation: remove admin
  const removeAdminMutation = useMutation({
    mutationFn: (email) => axiosdata .patch(`/users/remove-admin/${email}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['search-users', debouncedText]);
      Swal.fire('Success', 'Admin role removed.', 'success');
    },
  });

  const handleMakeAdmin = async (email) => {
    const confirm = await Swal.fire({
      title: 'Make Admin?',
      text: `Are you sure you want to make ${email} an admin?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    });

    if (confirm.isConfirmed) {
      makeAdminMutation.mutate(email);
    }
  };

  const handleRemoveAdmin = async (email) => {
    const confirm = await Swal.fire({
      title: 'Remove Admin?',
      text: `Are you sure you want to remove admin role from ${email}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    });

    if (confirm.isConfirmed) {
      removeAdminMutation.mutate(email);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-xl space-y-4">
      <h2 className="text-2xl font-bold text-center">Admin Role Manager</h2>

      <input
        type="text"
        placeholder="Search by email..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-full border px-4 py-2 rounded"
      />

      {isLoading ? (
        <p className="text-center mt-4 text-gray-500">Loading...</p>
      ) : users?.length > 0 ? (
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">Email</th>
                <th className="border px-4 py-2">Created At</th>
                <th className="border px-4 py-2">Role</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{new Date(user.created_at).toLocaleString()}</td>

                  <td className="border px-4 py-2 capitalize">{user.role || 'user'}</td>
                  <td className="border px-4 py-2 text-center space-x-2">
                    {user.role === 'admin' ? (
                      <button
                        onClick={() => handleRemoveAdmin(user.email)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Remove Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user.email)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : debouncedText ? (
        <p className="text-center mt-4 text-gray-500">No matching users found.</p>
      ) : null}
    </div>
  );
};

export default MakeAdmin;
