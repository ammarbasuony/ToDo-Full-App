import React from "react";
import { Navigate } from "react-router-dom";
import cookies from "js-cookie";

// Properties
import properties from "properties.json";

const ProtectedRoute = ({ children }) => {
  const token = cookies.get(properties.AUTH_COOKIE_NAME);

  return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
