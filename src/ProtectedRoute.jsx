import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStateProvider } from './utils/StateProvider';

const ProtectedRoute = ({ children }) => {
  const [{ token }] = useStateProvider();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
