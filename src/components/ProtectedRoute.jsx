import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useStateProvider } from '../utils/StateProvider';

const ProtectedRoute = ({ element: Component }) => {
  const [{ token }] = useStateProvider();
  const location = useLocation();

  if (!token) {
    // Redirect to the login page, keeping the current location so we can redirect back
    return <Navigate to="/home" state={{ from: location }} replace />;
  }

  return Component;
};

export default ProtectedRoute;
