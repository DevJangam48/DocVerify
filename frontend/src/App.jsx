import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Signup from "./pages/login_signup/Signup";
import Login from "./pages/login_signup/Login";
import AdminLogin from "./pages/login_signup/adminLogin";
import AdminSignup from "./pages/login_signup/adminSignup";
import LandingPage from "./pages/LandingPage";
import StudentDashboard from "./pages/StudentDashboard";
import StudentRegistration from "./pages/StudentRegistration";

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [userID, setUserID] = useState(() => localStorage.getItem("userID"));

  const [isAdmin, setIsAdmin] = useState(false);

  // Protected route wrapper for students
  const PrivateStudentRoute = ({ children }) => {
    if (!token || isAdmin) {
      return <Navigate to="/" />;
    }
    return children;
  };

  // Similarly add admin protected route if needed

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LandingPage setToken={setToken} setUserID={setUserID} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={<Login setToken={setToken} setUserID={setUserID} />}
        />

        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route
          path="/admin/login"
          element={<AdminLogin setToken={setToken} setIsAdmin={setIsAdmin} />}
        />

        <Route
          path="/student/register"
          element={<StudentRegistration token={token} userID={userID} />}
        />

        <Route
          path="/student/dashboard"
          element={
            <PrivateStudentRoute>
              <StudentDashboard token={token} userID={userID} />
            </PrivateStudentRoute>
          }
        />
        {/* Add admin routes here if needed */}
      </Routes>
    </Router>
  );
}

export default App;
