import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import Spinner from '../components/Spinner';

const AdminRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const { role, isLoading: roleLoading } = useUserRole();
  const location = useLocation();

  if (authLoading || roleLoading) {
    return <Spinner></Spinner>;
  }

  if (!user || role !== 'admin') {
    return <Navigate to="/unauthorized" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default AdminRoute;
