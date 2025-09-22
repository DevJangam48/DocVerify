import React, { useState } from "react";
import { auth } from "../../assets/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup({ switchToLogin }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // --- Client-side validation ---
    if (pass !== confirmPass) {
      setError("Passwords do not match. Please try again.");
      return;
    }
    if (pass.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, pass);
      setSuccess(true);
      setError("");
      // Switch to login form after a short delay to show the success message
      setTimeout(() => {
        switchToLogin();
      }, 2000);
    } catch (e) {
      if (e.code === "auth/email-already-in-use") {
        setError("This email address is already registered. Please login.");
      } else {
        setError("Failed to create an account. Please try again later.");
      }
      console.error("Firebase signup error:", e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Header with Icon */}
      <div className="text-center mb-6">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 mb-4">
          <svg
            className="h-6 w-6 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.5 21c-2.305 0-4.47-.612-6.375-1.666z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">
          Create Student Account
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Get started with DocuVerify
        </p>
      </div>

      <form onSubmit={handleSignup} className="w-full space-y-4">
        {/* Email Input */}
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
            className="w-full rounded-md border-slate-300 py-3 pl-10 pr-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Input */}
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
            placeholder="Password (min. 6 characters)"
            className="w-full rounded-md border-slate-300 py-3 pl-10 pr-4"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
        </div>

        {/* Confirm Password Input */}
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
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full rounded-md border-slate-300 py-3 pl-10 pr-4"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            required
          />
        </div>

        {/* Feedback Messages */}
        {error && (
          <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md text-center">
            {error}
          </p>
        )}
        {success && (
          <p className="text-sm text-green-600 bg-green-50 p-3 rounded-md text-center">
            ✅ Account created! Redirecting to login...
          </p>
        )}

        {/* Signup Button */}
        <button
          type="submit"
          disabled={loading || success}
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
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      {/* Switch to Login */}
      <p className="text-center text-sm text-slate-600 mt-6">
        Already have an account?{" "}
        <button
          onClick={switchToLogin}
          className="text-indigo-600 hover:text-indigo-800 font-semibold focus:outline-none focus:underline"
        >
          Login
        </button>
      </p>
    </div>
  );
}
