import React from "react";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";

// Properties
import properties from "properties.json";

const Layout = ({ children, customClasses }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    Cookies.remove(properties.AUTH_COOKIE_NAME);
    navigate("/");
  };

  return (
    <div className={`bg-[#f3f3f3] min-h-screen flow-root ${customClasses}`}>
      {location.pathname !== "/" && (
        <button
          className="text-sm bg-gray-600 text-white px-5 py-3 rounded-lg hover:bg-gray-500"
          onClick={handleLogout}
        >
          Logout
        </button>
      )}
      
      {children}
    </div>
  );
};

export default Layout;
