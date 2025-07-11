import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Spinner from "../../../components/Spinner";
import useAxiosSecure from '../../../hooks/useAxiosSecure';



const PendingGuides = () => {
      const axiosdata = useAxiosSecure();
  const queryClient = useQueryClient();

  const fetchPendingGuides = async () => {
  const res = await axiosdata.get('/api/guides/pending');
  return Array.isArray(res.data) ? res.data : res.data.guides || [];
};
  // ✅ Query to fetch pending guides
  const { data: guides = [], isLoading } = useQuery({
    queryKey: ['pending-guides'],
    queryFn: fetchPendingGuides,
  });

  // ✅ Mutation for approval
  const approveMutation = useMutation({
    mutationFn: (id) => axios.patch(`/api/guides/${id}`, { status: 'active' }),
    onSuccess: () => {
      queryClient.invalidateQueries(['pending-guides']);
    },
  });

  // ✅ Mutation for deletion
  const deleteMutation = useMutation({
    mutationFn: (id) => axios.delete(`/api/guides/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['pending-guides']);
    },
  });

  if (isLoading) return  <Spinner></Spinner>;

  return (
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
            <td>{guide.name || 'N/A'}</td>
            <td>{guide.email || 'N/A'}</td>
            <td className="text-yellow-600 font-medium">
              {guide.status || 'pending'}
            </td>
            <td>
              <button
                onClick={() => approveMutation.mutate(guide._id)}
                className="btn btn-warning btn-sm mx-1"
                disabled={approveMutation.isPending}
              >
                Approve
              </button>
              <button
                onClick={() => deleteMutation.mutate(guide._id)}
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
  );
};

export default PendingGuides;
