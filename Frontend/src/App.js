import React from "react";
import { Route, Routes } from "react-router-dom";

// Helper
import ProtectedRoute from "helper/routes/ProtectedRoute";
import GuestRoute from "helper/routes/GuestRoute";

// Hooks
import useGetLoggedInUser from "hooks/useGetLoggedInUser.hook";

// Pages
import Login from "pages/Login/login.page";
import UserHome from "pages/Home/home-user.page";
import AdminHome from "pages/Home/home-admin.page";

const App = () => {
  useGetLoggedInUser();

  return (
    <div className="ToDo">
      <Routes>
        <Route
          path="/"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <UserHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminHome />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
