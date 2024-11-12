import React from 'react';
import { Navigate } from 'react-router-dom';  // Import Navigate component for redirecting

function SecureRoute({ children }) {
  // Retrieve the token from localStorage to check if the user is authenticated
  const token = localStorage.getItem('token'); 

  // If the token exists (meaning the user is logged in), render the children components
  // If not, redirect the user to the login page using Navigate
  return token ? children : <Navigate to="/login" />;  
}

export default SecureRoute;
