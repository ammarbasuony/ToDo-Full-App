import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Pages
import Login from "./pages/Login/login.page";
import UserHome from "pages/Home/home-user.admin";
import AdminHome from "pages/Home/home-admin.page";

const App = () => {
  return (
    <div className="ToDo">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/user" element={<UserHome />} />
          <Route path="/admin" element={<AdminHome />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
