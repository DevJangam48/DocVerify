import React, { useState } from "react";
import { auth } from "../../assets/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function Login({ setToken, setUserID, switchToSignup }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    if (!email || !pass) {
      setError("Please fill in both fields.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, pass);

      // Wait a moment for the token to be properly generated
      await new Promise((resolve) => setTimeout(resolve, 100));

      const token = await userCred.user.getIdToken(true); // Force refresh
      setToken(token);
      localStorage.setItem("token", token);

      const userID = userCred.user.uid;
      setUserID(userID);
      localStorage.setItem("userID", userID);
      // Check if registered - with error handling for backend issues
      try {
        const res = await api.get(`/students/${userID}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data && Object.keys(res.data).length > 0) {
          navigate("/student/dashboard");
        } else {
          navigate("/student/register");
        }
      } catch (apiError) {
        console.warn(
          "Backend API not available, proceeding to registration:",
          apiError.message
        );
        // If backend is not available, proceed to registration
        navigate("/student/register");
      }
    } catch (e) {
      // Provide a user-friendly error instead of the raw Firebase message
      setError("Invalid email or password. Please try again.");
      console.error("Firebase login error:", e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Header with a student-focused icon */}
      <div className="text-center mb-6">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 mb-4">
          <svg
            className="h-6 w-6 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Student Login</h2>
        <p className="text-sm text-slate-500 mt-1">
          Welcome back! Access your documents.
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
            className="w-full rounded-md border-slate-300 py-3 pl-10 pr-4 text-slate-800 shadow-sm transition-colors duration-300 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-indigo-500"
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
            className="w-full rounded-md border-slate-300 py-3 pl-10 pr-4 text-slate-800 shadow-sm transition-colors duration-300 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-indigo-500"
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
          className="w-full flex justify-center items-center bg-indigo-600 text-white p-3 rounded-md font-semibold shadow-md transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg disabled:cursor-not-allowed disabled:bg-indigo-400"
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
              Logging In...
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>

      {/* Switch to Signup */}
      <p className="text-center text-sm text-slate-600 mt-6">
        Don't have an account?{" "}
        <button
          onClick={switchToSignup}
          className="text-indigo-600 hover:text-indigo-800 font-semibold focus:outline-none focus:underline"
        >
          Sign Up
        </button>
      </p>
    </div>
  );
}
