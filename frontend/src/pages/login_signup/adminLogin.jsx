import React, { useState } from "react";
import { auth } from "../../assets/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function AdminLogin({ setToken, setAdminID, switchToSignup }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    if (!email || !pass) {
      setError("Please enter both email and password.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, pass);

      // Wait a moment for the token to be properly generated
      await new Promise((resolve) => setTimeout(resolve, 100));

      const token = await userCred.user.getIdToken(true);
      setToken(token);
      localStorage.setItem("token", token);

      const adminId = userCred.user.uid;
      setAdminID(adminId);
      localStorage.setItem("adminID", adminId);

      try {
        const res = await api.get(`/admins/${adminId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data && Object.keys(res.data).length > 0) {
          navigate("/admin/dashboard");
        } else {
          navigate("/admin/register");
        }
      } catch (apiError) {
        console.warn(
          "Backend API not available, redirecting to admin registration page: ",
          apiError.message
        );
      }
      navigate("/admin/dashboard");

      console.log("Admin Auth Token:", token);
    } catch (e) {
      // Provide a user-friendly error message
      setError("Invalid credentials. Please check your email and password.");
      console.error("Firebase login error:", e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Header with Icon */}
      <div className="text-center mb-6">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 mb-4">
          <svg
            className="h-6 w-6 text-purple-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Admin Login</h2>
        <p className="text-sm text-slate-500 mt-1">
          Access the verification panel
        </p>
      </div>

      <form onSubmit={handleLogin} className="w-full space-y-4">
        {/* Email Input with Icon */}
        <div className="relative">
          <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400">
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
          </span>
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-md border-slate-300 py-3 pl-10 pr-4 text-slate-800 shadow-sm transition-colors duration-300 placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Input with Icon */}
        <div className="relative">
          <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400">
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </span>
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-md border-slate-300 py-3 pl-10 pr-4 text-slate-800 shadow-sm transition-colors duration-300 placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
        </div>

        {/* Error Message Display */}
        {error && (
          <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md text-center">
            {error}
          </p>
        )}

        {/* Login Button with Loading State */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center bg-purple-600 text-white p-3 rounded-md font-semibold shadow-md transition-all duration-300 hover:bg-purple-700 hover:shadow-lg disabled:cursor-not-allowed disabled:bg-purple-400"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Signing In...
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>

      {/* Switch to Signup */}
      <p className="text-center text-sm text-slate-600 mt-6">
        Don't have an admin account?{" "}
        <button
          onClick={switchToSignup}
          className="text-purple-600 hover:text-purple-800 font-semibold focus:outline-none focus:underline"
        >
          Sign Up
        </button>
      </p>
    </div>
  );
}
