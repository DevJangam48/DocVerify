import React, { useState } from "react";
import api from "../api/axios"; // Adjust this import path to your axios instance
import { useNavigate } from "react-router-dom";

export default function AdminRegistration() {
  const navigate = useNavigate();

  // ✅ 1. REMOVED 'email' from the form state
  const [form, setForm] = useState({
    name: "",
    prn: "",
    collegeName: "",
    collegeId: "",
    additionalInfo: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ 2. REMOVED 'email' from validation
    if (!form.name || !form.prn || !form.collegeName || !form.collegeId) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);

    try {
      // ✅ 3. REMOVED 'email' and 'userId' from payload and simplified API call
      // The backend now gets the userID and email securely from the token.
      await api.post(`/admins/`, form);

      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Admin registration error:", err);
      setError("Failed to register. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Admin Registration</h2>
      {error && (
        <div className="mb-4 p-3 text-red-700 bg-red-100 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Full Name *</span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </label>

        {/* ✅ 4. REMOVED the Email input field from the form */}

        <label className="block">
          <span className="text-gray-700">PRN *</span>
          <input
            type="text"
            name="prn"
            value={form.prn}
            onChange={handleChange}
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </label>

        <label className="block">
          <span className="text-gray-700">College Name *</span>
          <input
            type="text"
            name="collegeName"
            value={form.collegeName}
            onChange={handleChange}
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </label>

        <label className="block">
          <span className="text-gray-700">College ID *</span>
          <input
            type="text"
            name="collegeId"
            value={form.collegeId}
            onChange={handleChange}
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Additional Info (Optional)</span>
          <textarea
            name="additionalInfo"
            value={form.additionalInfo}
            onChange={handleChange}
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:bg-indigo-400"
        >
          {loading ? "Registering..." : "Submit Registration"}
        </button>
      </form>
    </div>
  );
}
