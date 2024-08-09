// src/components/NotFound.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(-1); 
  }, [navigate]);

  return null; 
};

export default NotFound;
