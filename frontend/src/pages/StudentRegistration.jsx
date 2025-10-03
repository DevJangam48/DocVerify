import React, { useState } from "react";
import api from "../api/axios"; // Corrected the import path
import { useNavigate } from "react-router-dom";

export default function StudentRegistration({ onRegistered }) {
  // ✅ 1. REMOVED 'email' from the form state
  const [form, setForm] = useState({
    name: "",
    prn: "",
    phone: "",
    collegeId: "",
    collegeName: "",
    currentAddress: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback("");
    try {
      // ✅ 2. SIMPLIFIED API call (interceptor handles token)
      // The backend now gets the email automatically from the token.
      await api.post("/students/", form);

      setFeedback("Profile saved! Redirecting...");
      if (onRegistered) onRegistered();
      navigate("/student/dashboard");
    } catch (err) {
      setFeedback("Could not save. Check fields and try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-lg space-y-6">
        <h2 className="text-3xl font-bold text-slate-900 text-center">
          Complete Your Profile
        </h2>
        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={form.name}
            onChange={onChange}
            className="md:col-span-2 w-full px-4 py-2 border border-slate-300 rounded-md"
          />
          <input
            type="text"
            name="prn"
            placeholder="PRN"
            required
            value={form.prn}
            onChange={onChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-md"
          />

          {/* ✅ 3. REMOVED the Email input field */}

          <input
            type="text"
            name="collegeName"
            placeholder="College Name"
            required
            value={form.collegeName}
            onChange={onChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-md"
          />
          <input
            type="text"
            name="collegeId"
            placeholder="College ID"
            required
            value={form.collegeId}
            onChange={onChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-md"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            required
            value={form.phone}
            onChange={onChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-md"
          />
          <input
            type="text"
            name="currentAddress"
            placeholder="Current Address"
            required
            value={form.currentAddress}
            onChange={onChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-md"
          />

          {/* This input field was not in the original state, adding it to match the UI */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700 transition"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Profile & Continue"}
            </button>
            {feedback && (
              <div className="text-center text-sm mt-2 text-indigo-600">
                {feedback}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
