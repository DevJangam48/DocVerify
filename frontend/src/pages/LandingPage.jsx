import React, { useState } from "react";
import Login from "./login_signup/Login";
import Signup from "./login_signup/Signup";
import AdminLogin from "./login_signup/AdminLogin";
import AdminSignup from "./login_signup/AdminSignup";

export default function LandingPage({ setToken, setUserID, setAdminID }) {
  const [modalType, setModalType] = useState(null);
  // State for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openStudentLogin = () => setModalType("studentLogin");
  const openStudentSignup = () => setModalType("studentSignup");
  const openAdminLogin = () => setModalType("adminLogin");
  const openAdminSignup = () => setModalType("adminSignup");
  const closeModal = () => setModalType(null);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "About", href: "#" },
    { name: "Explore", href: "#" },
    { name: "Contact", href: "#" },
  ];

  return (
    <div className="font-sans antialiased bg-slate-50 text-slate-800">
      {/* --- Enhanced Header with Mobile Nav --- */}
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
              DocVerify
              <span className="font-normal text-indigo-500">.edu</span>
            </span>
          </div>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden md:flex gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-600 text-base font-medium px-4 py-2 rounded-lg hover:bg-slate-100 hover:text-indigo-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Login Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={openStudentLogin}
              className="bg-indigo-50 text-indigo-700 px-5 py-2.5 rounded-lg font-semibold shadow-sm hover:bg-indigo-100 transition-all duration-200 ring-1 ring-inset ring-indigo-200"
            >
              Student Login
            </button>
            <button
              onClick={openAdminLogin}
              className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition-all duration-200 hover:shadow-lg focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Admin Login
            </button>
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-slate-600 hover:bg-slate-100"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                // Close Icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Hamburger Icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg absolute top-full left-0 w-full animate-[fadeIn_0.3s_ease-out]">
            <nav className="flex flex-col p-4 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-slate-700 text-lg font-medium px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-indigo-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
                >
                  {link.name}
                </a>
              ))}
              <hr className="my-2" />
              <button
                onClick={openStudentLogin}
                className="w-full text-left bg-indigo-50 text-indigo-700 px-4 py-3 rounded-lg font-semibold transition-all duration-200"
              >
                Student Login
              </button>
              <button
                onClick={openAdminLogin}
                className="w-full text-left bg-indigo-600 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-200"
              >
                Admin Login
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* --- Enhanced Hero Banner with Image --- */}
      <section className="bg-white pt-20 pb-24 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Hero text block */}
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
          <div className="flex-1 w-full flex justify-center animate-[fadeInRight_1s_ease-out_0.2s_both]">
            {/*  */}
            <img
              src="https://media.istockphoto.com/id/1125504678/photo/university-application-acceptance-letter-still-life-with-rubber-stamp-of-accepted.jpg?s=612x612&w=0&k=20&c=G7Ygp2xs6jiArByWOinc47NikHQGQxnJjosZ5okGMNg="
              alt="Secure Document Verification"
              className="rounded-2xl shadow-2xl w-full max-w-lg object-cover"
              style={{ aspectRatio: "4/3" }}
            />
          </div>
        </div>
      </section>

      {/* --- Enhanced Highlights Section --- */}
      <section className="bg-slate-50 border-y py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2
            className="text-3xl font-bold text-slate-900 mb-4 animate-[fadeInUp_1s_ease-out_both]"
            style={{ animationDelay: "100ms" }}
          >
            Powerful Features, Simplified
          </h2>
          <p
            className="text-slate-600 mb-12 max-w-2xl mx-auto animate-[fadeInUp_1s_ease-out_both]"
            style={{ animationDelay: "200ms" }}
          >
            Discover the tools that make document management effortless for
            students and administrators alike.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {/* Enhanced highlight card 1 */}
            <div
              className="bg-white border rounded-xl shadow-lg p-6 flex flex-col items-start transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group animate-[fadeInUp_1s_ease-out_both]"
              style={{ animationDelay: "300ms" }}
            >
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
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-all"
              >
                Learn More
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
            {/* Enhanced highlight card 2 */}
            <div
              className="bg-white border rounded-xl shadow-lg p-6 flex flex-col items-start transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group animate-[fadeInUp_1s_ease-out_both]"
              style={{ animationDelay: "400ms" }}
            >
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
                className="text-sm font-semibold text-purple-600 hover:text-purple-800 flex items-center gap-1 transition-all"
              >
                See Demo
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
            {/* Enhanced highlight card 3 */}
            <div
              className="bg-white border rounded-xl shadow-lg p-6 flex flex-col items-start transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group animate-[fadeInUp_1s_ease-out_both]"
              style={{ animationDelay: "500ms" }}
            >
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
                className="text-sm font-semibold text-emerald-600 hover:text-emerald-800 flex items-center gap-1 transition-all"
              >
                Our Promise
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- Enhanced "How it Works" Section with Icons --- */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">
            Get Started in 3 Simple Steps
          </h2>
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-12 sm:gap-0">
            {/* Dashed line connector for desktop view */}
            <div className="hidden sm:block absolute top-10 left-0 w-full h-0.5 bg-slate-200 -z-10">
              <div className="absolute top-0 left-0 w-full h-full border-t-2 border-dashed border-slate-300"></div>
            </div>
            {/* Step 1 */}
            <div className="flex flex-col items-center space-y-3">
              <div className="bg-indigo-600 text-white rounded-full h-20 w-20 flex items-center justify-center text-2xl font-bold ring-8 ring-indigo-100 relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                <span className="absolute -top-2 -right-2 bg-white text-indigo-600 rounded-full h-8 w-8 flex items-center justify-center text-sm font-bold shadow-md">
                  1
                </span>
              </div>
              <h3 className="font-semibold text-lg pt-2">Register/Login</h3>
              <p className="text-slate-500 text-sm max-w-xs">
                Create your secure account in seconds.
              </p>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center space-y-3">
              <div className="bg-indigo-600 text-white rounded-full h-20 w-20 flex items-center justify-center text-2xl font-bold ring-8 ring-indigo-100 relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                <span className="absolute -top-2 -right-2 bg-white text-indigo-600 rounded-full h-8 w-8 flex items-center justify-center text-sm font-bold shadow-md">
                  2
                </span>
              </div>
              <h3 className="font-semibold text-lg pt-2">Upload & Verify</h3>
              <p className="text-slate-500 text-sm max-w-xs">
                Submit documents for quick verification.
              </p>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center space-y-3">
              <div className="bg-indigo-600 text-white rounded-full h-20 w-20 flex items-center justify-center text-2xl font-bold ring-8 ring-indigo-100 relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684C9.114 13.062 10 12.482 10 12c0-.482-.886-1.062-1.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                  />
                </svg>
                <span className="absolute -top-2 -right-2 bg-white text-indigo-600 rounded-full h-8 w-8 flex items-center justify-center text-sm font-bold shadow-md">
                  3
                </span>
              </div>
              <h3 className="font-semibold text-lg pt-2">Share & Store</h3>
              <p className="text-slate-500 text-sm max-w-xs">
                Access and share them anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- NEW Section: Testimonials --- */}
      <section className="bg-slate-50 py-20 px-4 border-t">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-3xl font-bold text-slate-900 text-center mb-12 animate-[fadeInUp_1s_ease-out_both]"
            style={{ animationDelay: "200ms" }}
          >
            Trusted by Students and Staff
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial Card 1 */}
            <div
              className="bg-white p-8 rounded-xl shadow-lg animate-[fadeInUp_1s_ease-out_both]"
              style={{ animationDelay: "400ms" }}
            >
              <p className="text-slate-600 italic mb-6">
                "DocuVerify saved me so much time during my application process.
                Having all my verified documents in one place was a lifesaver!"
              </p>
              <div className="flex items-center">
                <img
                  className="w-12 h-12 rounded-full mr-4"
                  src="https://randomuser.me/api/portraits/women/68.jpg"
                  alt="Priya Sharma"
                />
                <div>
                  <h4 className="font-bold text-slate-900">Priya Sharma</h4>
                  <p className="text-sm text-indigo-600">B.Tech Student</p>
                </div>
              </div>
            </div>
            {/* Testimonial Card 2 */}
            <div
              className="bg-white p-8 rounded-xl shadow-lg animate-[fadeInUp_1s_ease-out_both]"
              style={{ animationDelay: "500ms" }}
            >
              <p className="text-slate-600 italic mb-6">
                "As an administrator, verifying hundreds of documents is
                tedious. This platform streamlined our entire workflow. Highly
                recommend."
              </p>
              <div className="flex items-center">
                <img
                  className="w-12 h-12 rounded-full mr-4"
                  src="https://randomuser.me/api/portraits/men/46.jpg"
                  alt="Mr. Rajesh Gupta"
                />
                <div>
                  <h4 className="font-bold text-slate-900">Mr. Rajesh Gupta</h4>
                  <p className="text-sm text-indigo-600">Admissions Head</p>
                </div>
              </div>
            </div>
            {/* Testimonial Card 3 */}
            <div
              className="bg-white p-8 rounded-xl shadow-lg animate-[fadeInUp_1s_ease-out_both]"
              style={{ animationDelay: "600ms" }}
            >
              <p className="text-slate-600 italic mb-6">
                "The security is top-notch. I feel confident that my personal
                documents are safe and can only be shared when I allow it."
              </p>
              <div className="flex items-center">
                <img
                  className="w-12 h-12 rounded-full mr-4"
                  src="https://randomuser.me/api/portraits/men/78.jpg"
                  alt="Arjun Singh"
                />
                <div>
                  <h4 className="font-bold text-slate-900">Arjun Singh</h4>
                  <p className="text-sm text-indigo-600">M.Sc. Graduate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- NEW Section: FAQ (Accordion) --- */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-3xl font-bold text-slate-900 text-center mb-12 animate-[fadeInUp_1s_ease-out_both]"
            style={{ animationDelay: "200ms" }}
          >
            Frequently Asked Questions
          </h2>
          <div
            className="space-y-4 animate-[fadeInUp_1s_ease-out_both]"
            style={{ animationDelay: "400ms" }}
          >
            {/* FAQ Item 1 */}
            <details
              className="p-6 border rounded-lg shadow-sm bg-slate-50 group"
              open
            >
              <summary className="font-semibold text-lg text-slate-800 cursor-pointer list-none flex justify-between items-center">
                How long does verification take?
                <span className="text-indigo-600 transition-transform duration-300 group-open:rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>
              <p className="text-slate-600 mt-4">
                Verification times can vary, but most documents are verified by
                the college administration within 3-5 business days. You will
                receive an email notification once the status is updated.
              </p>
            </details>
            {/* FAQ Item 2 */}
            <details className="p-6 border rounded-lg shadow-sm bg-slate-50 group">
              <summary className="font-semibold text-lg text-slate-800 cursor-pointer list-none flex justify-between items-center">
                Is my data secure?
                <span className="text-indigo-600 transition-transform duration-300 group-open:rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>
              <p className="text-slate-600 mt-4">
                Absolutely. We use bank-grade AES-256 encryption for your
                documents at rest and in transit. Only you and the
                administrators you grant access to can view your documents.
              </p>
            </details>
            {/* FAQ Item 3 */}
            <details className="p-6 border rounded-lg shadow-sm bg-slate-50 group">
              <summary className="font-semibold text-lg text-slate-800 cursor-pointer list-none flex justify-between items-center">
                What kind of documents can I upload?
                <span className="text-indigo-600 transition-transform duration-300 group-open:rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>
              <p className="text-slate-600 mt-4">
                You can upload all official educational documents, including
                10th and 12th-grade marksheets, semester-wise marksheets, degree
                certificates, and transfer certificates.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* --- Enhanced Footer --- */}
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

      {/* --- Enhanced Modal --- */}
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
              className="absolute top-3 right-3 text-slate-500 hover:text-slate-800 transition-colors w-10 h-10 flex items-center justify-center hover:bg-slate-100 rounded-full"
              onClick={closeModal}
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
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

      {/* --- Animation Keyframes (Unchanged) --- */}
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
