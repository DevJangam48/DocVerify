import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

// A simple spinner component for the button
const Spinner = () => (
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
);
// Helper function to create an input field with an icon
const IconInput = ({ icon, ...props }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      {icon}
    </div>
    <input
      {...props}
      className="w-full pl-10 px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-200"
    />
  </div>
);
export default function StudentRegistration({ onRegistered }) {
  const [form, setForm] = useState({
    name: "",
    prn: "",
    phone: "",
    collegeId: "",
    collegeName: "",
    currentAddress: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Enhanced feedback to include type (success/error)
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback({ type: "", message: "" }); // Reset feedback
    try {
      await api.post("/students/", form);

      setFeedback({
        type: "success",
        message: "Profile saved! Redirecting to your dashboard...",
      });

      // Delay navigation slightly to let user read success message
      setTimeout(() => {
        if (onRegistered) onRegistered();
        navigate("/student/dashboard");
      }, 2000);
    } catch (err) {
      // Provide more specific feedback if available
      const errorMsg =
        err.response?.data?.message ||
        "Could not save. Please check your details and try again.";
      setFeedback({ type: "error", message: errorMsg });
      setIsSubmitting(false);
    }
    // Don't setIsSubmitting(false) on success, as we are navigating away
  };

  return (
    <div className="bg-slate-50 min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full mx-auto p-8 md:p-10 bg-white rounded-2xl shadow-xl space-y-6 animate-[fadeInUp_0.8s_ease-out_both]">
        {/* --- 1. Visual Branding (Logo) --- */}
        <div className="flex items-center justify-center gap-2">
          <img
            src="https://s2.svgbox.net/materialui.svg?ic=cloud_done&color=4f46e5"
            alt="logo"
            className="h-8 w-8"
          />
          <span className="text-xl text-slate-800 font-bold tracking-widest">
            DocuVerify
            <span className="font-normal text-indigo-500">.edu</span>
          </span>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            Complete Your Profile
          </h2>
          <p className="text-slate-600 mt-2">
            Just a few more details to get you started.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* --- 2. Form Grouping (Fieldset) --- */}
          <fieldset className="space-y-4">
            <legend className="text-lg font-semibold text-slate-700 pb-2 border-b border-slate-200 w-full">
              Personal Information
            </legend>
            <IconInput
              icon={<UserIcon />}
              type="text"
              name="name"
              placeholder="Full Name"
              required
              value={form.name}
              onChange={onChange}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <IconInput
                icon={<PrnIcon />}
                type="text"
                name="prn"
                placeholder="PRN (e.g., 2021B00123)"
                required
                value={form.prn}
                onChange={onChange}
              />
              <IconInput
                icon={<PhoneIcon />}
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                value={form.phone}
                onChange={onChange}
              />
            </div>
          </fieldset>

          {/* --- 2. Form Grouping (Fieldset) --- */}
          <fieldset className="space-y-4">
            <legend className="text-lg font-semibold text-slate-700 pb-2 border-b border-slate-200 w-full">
              Academic Details
            </legend>
            <IconInput
              icon={<CollegeIcon />}
              type="text"
              name="collegeName"
              placeholder="College Name"
              required
              value={form.collegeName}
              onChange={onChange}
            />
            <IconInput
              icon={<IdCardIcon />}
              type="text"
              name="collegeId"
              placeholder="College ID"
              required
              value={form.collegeId}
              onChange={onChange}
            />
          </fieldset>

          {/* --- 2. Form Grouping (Fieldset) --- */}
          <fieldset className="space-y-4">
            <legend className="text-lg font-semibold text-slate-700 pb-2 border-b border-slate-200 w-full">
              Contact
            </legend>
            <IconInput
              icon={<AddressIcon />}
              type="text"
              name="currentAddress"
              placeholder="Current Address"
              required
              value={form.currentAddress}
              onChange={onChange}
            />
          </fieldset>

          {/* --- 3. Enhanced Button & Feedback --- */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex items-center justify-center bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting && <Spinner />}
              {isSubmitting ? "Saving Profile..." : "Save Profile & Continue"}
            </button>

            {/* 4. Typed Feedback Message */}
            {feedback.message && (
              <div
                className={`text-center text-sm mt-4 font-medium ${
                  feedback.type === "success"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {feedback.message}
              </div>
            )}
          </div>
        </form>
      </div>

      {/* --- Animation Keyframes --- */}
      <style>{`
        @keyframes fadeInUp { 
          0% { opacity: 0; transform: translateY(20px); } 
          100% { opacity: 1; transform: translateY(0); } 
        }
      `}</style>
    </div>
  );
}

// --- SVG Icons for Inputs ---
const iconClass = "w-5 h-5 text-slate-400";
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={iconClass}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
      clipRule="evenodd"
    />
  </svg>
);
const PrnIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={iconClass}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 20l4-16m2 16l4-16M5.5 9h13m-13 6h13"
    />
  </svg>
);
const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={iconClass}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2.153a1 1 0 01-.986-.836l-.74-4.435a1 1 0 01.54-1.06l1.548-.773a11.037 11.037 0 00-6.105-6.105l-.774 1.548a1 1 0 01-1.06.54l-4.435-.74A1 1 0 012 3z" />
  </svg>
);
const CollegeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={iconClass}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 9.414V17a1 1 0 001 1h2a1 1 0 001-1v-2.5a.5.5 0 01.5-.5h3a.5.5 0 01.5.5V17a1 1 0 001 1h2a1 1 0 001-1v-7.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
  </svg>
);
const IdCardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={iconClass}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V4a1 1 0 00-1-1H3zm5 2a1 1 0 100 2h6a1 1 0 100-2H8zM8 9a1 1 0 100 2h2a1 1 0 100-2H8zM8 13a1 1 0 100 2h4a1 1 0 100-2H8z"
      clipRule="evendodd"
    />
  </svg>
);
const AddressIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={iconClass}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
      clipRule="evenodd"
    />
  </svg>
);
