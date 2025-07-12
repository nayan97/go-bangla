import { useQuery } from "@tanstack/react-query";

import useAuth from "../hooks/useAuth";
import axiosUserSecure from "../hooks/useAxios";



const useUserRole = () => {
    const { user, loading: authLoading } = useAuth();
    const axios = axiosUserSecure();
    const fetchUserRole = async (email) => {
  const res = await axios.get(`/users/${email}/role`);
  return res.data?.role;
};

  const {
    data: role,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: () => fetchUserRole(user.email),
    enabled: !!user?.email && !authLoading, // Wait until auth is ready
  });

  return { role, isLoading, isError, error, refetch};
};

export default useUserRole;
