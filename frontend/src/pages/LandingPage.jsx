import React, { useState } from "react";
import Login from "./login_signup/Login";
import Signup from "./login_signup/Signup";
import AdminLogin from "./login_signup/AdminLogin";
import AdminSignup from "./login_signup/adminSignup";

export default function LandingPage({ setToken, setUserID, setAdminID }) {
  const [modalType, setModalType] = useState(null);

  const openStudentLogin = () => setModalType("studentLogin");
  const openStudentSignup = () => setModalType("studentSignup");
  const openAdminLogin = () => setModalType("adminLogin");
  const openAdminSignup = () => setModalType("adminSignup");
  const closeModal = () => setModalType(null);

  return (
    <div className="font-sans antialiased bg-slate-50 text-slate-800">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-300">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="https://s2.svgbox.net/materialui.svg?ic=cloud_done&color=4f46e5"
              alt="logo"
              className="h-10 w-10"
            />
            <span className="text-2xl text-slate-900 font-bold tracking-widest">
              DocuVerify
              <span className="font-normal text-indigo-500">.edu</span>
            </span>
          </div>
          {/* Enhanced Navigation */}
          <nav className="hidden md:flex gap-1">
            <a
              href="#"
              className="text-slate-600 text-base font-medium px-4 py-2 rounded-lg hover:bg-slate-100 hover:text-indigo-600 transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="text-slate-600 text-base font-medium px-4 py-2 rounded-lg hover:bg-slate-100 hover:text-indigo-600 transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-slate-600 text-base font-medium px-4 py-2 rounded-lg hover:bg-slate-100 hover:text-indigo-600 transition-colors"
            >
              Explore
            </a>
            <a
              href="#"
              className="text-slate-600 text-base font-medium px-4 py-2 rounded-lg hover:bg-slate-100 hover:text-indigo-600 transition-colors"
            >
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <button
              onClick={openStudentLogin}
              className="bg-indigo-50 text-indigo-700 px-5 py-2.5 rounded-lg font-semibold shadow-sm hover:bg-indigo-100 transition-all duration-200 ring-1 ring-inset ring-indigo-200"
            >
              Student Login
            </button>
            <button
              onClick={openAdminLogin}
              className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition-all duration-200 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Admin Login
            </button>
          </div>
        </div>
      </header>

      {/* Enhanced Hero Banner */}
      <section className="bg-white pt-20 pb-24 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Hero text block with animation */}
          <div className="flex-1 space-y-8 animate-[fadeInUp_1s_ease-out_both]">
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Secure College Document Verification Panel
            </h1>
            <p className="text-lg text-slate-600 max-w-xl">
              Instantly verify, store, and access educational documents. Powered
              by modern cloud security for seamless and trustworthy
              authentication.
            </p>
            <div className="flex gap-4 mt-6">
              <button
                onClick={openStudentSignup}
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-indigo-700 transition-transform hover:scale-105"
              >
                Get Started
              </button>
              <button
                onClick={openAdminLogin}
                className="bg-slate-100 text-indigo-700 px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-indigo-100 transition-transform hover:scale-105"
              >
                Admin Access
              </button>
            </div>
          </div>
          {/* Hero image with animation */}
          <div className="flex-1 w-full flex justify-center animate-[fadeInRight_1s_ease-out_0.2s_both]"></div>
        </div>
      </section>

      {/* Enhanced Highlights Section */}
      <section className="bg-slate-50 border-y py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Powerful Features, Simplified
          </h2>
          <p className="text-slate-600 mb-12 max-w-2xl mx-auto">
            Discover the tools that make document management effortless for
            students and administrators alike.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {/* Enhanced highlight card */}
            <div className="bg-white border rounded-xl shadow-lg p-6 flex flex-col items-start transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              <div className="bg-indigo-100 text-indigo-600 rounded-full p-3 mb-4 ring-8 ring-indigo-50">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2 text-slate-900">
                Easy Marksheet Verification
              </h3>
              <p className="text-slate-500 mb-4 text-sm">
                Verify documents from multiple boards and colleges with a single
                click.
              </p>
              <a
                href="#"
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
              >
                Learn More →
              </a>
            </div>
            {/* Enhanced highlight card */}
            <div className="bg-white border rounded-xl shadow-lg p-6 flex flex-col items-start transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              <div className="bg-purple-100 text-purple-600 rounded-full p-3 mb-4 ring-8 ring-purple-50">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                  ></path>
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2 text-slate-900">
                One-Tap Document Sharing
              </h3>
              <p className="text-slate-500 mb-4 text-sm">
                Securely share your verified documents with institutions or
                employers via a protected link.
              </p>
              <a
                href="#"
                className="text-sm font-semibold text-purple-600 hover:text-purple-800"
              >
                See Demo →
              </a>
            </div>
            {/* Enhanced highlight card */}
            <div className="bg-white border rounded-xl shadow-lg p-6 flex flex-col items-start transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              <div className="bg-emerald-100 text-emerald-600 rounded-full p-3 mb-4 ring-8 ring-emerald-50">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  ></path>
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2 text-slate-900">
                Bank-Grade Security
              </h3>
              <p className="text-slate-500 mb-4 text-sm">
                Your data is encrypted and stored using industry-leading
                security standards.
              </p>
              <a
                href="#"
                className="text-sm font-semibold text-emerald-600 hover:text-emerald-800"
              >
                Our Promise →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced "How it Works" Section */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">
            Get Started in 3 Simple Steps
          </h2>
          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-12 sm:gap-0">
            {/* Dashed line connector for desktop view */}
            <div className="hidden sm:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 -z-10">
              <div className="absolute top-0 left-0 w-full h-full border-t-2 border-dashed border-slate-300"></div>
            </div>
            {/* Step 1 */}
            <div className="flex flex-col items-center space-y-3">
              <div className="bg-indigo-600 text-white rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold ring-8 ring-indigo-100">
                1
              </div>
              <h3 className="font-semibold text-lg">Register/Login</h3>
              <p className="text-slate-500 text-sm max-w-xs">
                Create your secure account in seconds.
              </p>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center space-y-3">
              <div className="bg-indigo-600 text-white rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold ring-8 ring-indigo-100">
                2
              </div>
              <h3 className="font-semibold text-lg">Upload & Verify</h3>
              <p className="text-slate-500 text-sm max-w-xs">
                Submit documents for quick verification.
              </p>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center space-y-3">
              <div className="bg-indigo-600 text-white rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold ring-8 ring-indigo-100">
                3
              </div>
              <h3 className="font-semibold text-lg">Share & Store</h3>
              <p className="text-slate-500 text-sm max-w-xs">
                Access and share them anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4">
          <div className="flex items-center gap-3 mb-6 md:mb-0">
            <img
              src="https://s2.svgbox.net/materialui.svg?ic=cloud_done&color=fff"
              alt="logo"
              className="h-8 w-8"
            />
            <span className="text-xl font-semibold">
              DocuVerify
              <span className="font-normal text-indigo-300">.edu</span>
            </span>
          </div>
          <nav className="flex gap-6">
            <a
              href="#"
              className="text-slate-300 hover:text-white transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Contact
            </a>
            <a
              href="#"
              className="text-slate-300 hover:text-white transition-colors"
            >
              FAQ
            </a>
          </nav>
          <div className="flex items-center gap-5 mt-6 md:mt-0">
            <a
              href="#"
              className="text-slate-400 hover:text-white transition-transform hover:scale-110"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.23 5.924c-.793.353-1.64.592-2.53.7a4.48 4.48 0 001.958-2.482 8.936 8.936 0 01-2.828 1.051A4.482 4.482 0 0012 9.036a12.714 12.714 0 01-9.229-4.682 4.481 4.481 0 003.73 6.906A4.47 4.47 0 012 10.151v.045a4.486 4.486 0 003.604 4.399c-.45.122-.922.187-1.412.187-.343 0-.678-.033-.999-.094.68 2.122 2.656 3.668 4.994 3.708A8.978 8.978 0 012 19.46a12.624 12.624 0 006.84 2.001c8.205 0 12.719-6.8 12.719-12.719 0-.194-.004-.388-.013-.58a9.073 9.073 0 002.223-2.308z" />
              </svg>
            </a>
            {/* Add more social icons here */}
          </div>
        </div>
        <div className="text-center text-slate-400 text-sm mt-8 border-t border-slate-700 pt-8 mx-auto max-w-6xl">
          © 2025 DocuVerify.edu | All rights reserved.
        </div>
      </footer>

      {/* Enhanced Modal */}
      {modalType && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-center justify-center transition-opacity duration-300 animate-[fadeIn_0.3s_ease-out_both]"
          onClick={closeModal}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 transition-transform duration-300 animate-[modalPop_0.4s_cubic-bezier(0.25,1.5,0.5,1)_both]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 text-2xl font-bold transition-colors"
              onClick={closeModal}
              aria-label="Close modal"
            >
              &times;
            </button>
            {modalType.startsWith("student") && (
              <>
                {modalType === "studentLogin" && (
                  <Login
                    setToken={setToken}
                    setUserID={setUserID}
                    switchToSignup={openStudentSignup}
                  />
                )}
                {modalType === "studentSignup" && (
                  <Signup switchToLogin={openStudentLogin} />
                )}
              </>
            )}
            {modalType.startsWith("admin") && (
              <>
                {modalType === "adminLogin" && (
                  <AdminLogin
                    setToken={setToken}
                    setAdminID={setAdminID}
                    switchToSignup={openAdminSignup}
                  />
                )}
                {modalType === "adminSignup" && (
                  <AdminSignup switchToLogin={openAdminLogin} />
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Animation Keyframes */}
      <style>{`
        @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes fadeInUp { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInRight { 0% { opacity: 0; transform: translateX(30px); } 100% { opacity: 1; transform: translateX(0); } }
        @keyframes modalPop {
          0% { opacity: 0; transform: scale(0.85) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
