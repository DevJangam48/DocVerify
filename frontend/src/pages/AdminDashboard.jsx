import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

// --- HELPER COMPONENTS (for better structure) ---

// Search Icon SVG
const SearchIcon = () => (
  <svg
    className="w-5 h-5 text-gray-400"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

// Logout Icon SVG
const LogoutIcon = () => (
  <svg
    className="w-5 h-5 mr-2"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
);

// Skeleton Loader for a better UX while fetching data
const StudentListSkeleton = () => (
  <div className="space-y-4">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="bg-white p-4 rounded-lg shadow-sm animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
        <div className="h-3 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    ))}
  </div>
);

// --- MAIN COMPONENT ---

export default function AdminDashboard({ token, adminID }) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!token || !adminID) {
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      try {
        const profileRes = await api.get(`/admins/${adminID}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(profileRes.data);

        const studentsRes = await api.get(`/admins/students`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudents(studentsRes.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        // Handle error appropriately, maybe navigate to login
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token, adminID]);

  const filteredStudents = students.filter((student) => {
    const name = student.name || "";
    const email = student.email || "";
    const prnNo = student.prnNo || "";
    const term = searchTerm.toLowerCase();

    return (
      name.toLowerCase().includes(term) ||
      email.toLowerCase().includes(term) ||
      prnNo.toLowerCase().includes(term)
    );
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminID");
    navigate("/");
  };

  const openStudentDetails = (userID) => {
    navigate(`/admin/student/${userID}`);
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-10 animate-pulse"></div>
          <StudentListSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* -- Header -- */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome, {profile?.name.split(" ")[0]}!
            </h1>
            <p className="text-md text-gray-500 mt-1">{profile?.collegeName}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors duration-200 shadow-sm"
          >
            <LogoutIcon />
            Logout
          </button>
        </header>

        {/* -- Search & Content Area -- */}
        <main className="bg-white p-6 md:p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Student Verification Queue
          </h2>
          <p className="text-gray-500 mb-6">
            Select a student to view and verify their documents.
          </p>

          <div className="relative mb-6">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <SearchIcon />
            </span>
            <input
              type="text"
              className="border border-gray-300 rounded-lg p-3 pl-10 w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
              placeholder="Search students by name, email, or PRN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* -- Student List -- */}
          <div className="space-y-4">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <div
                  key={student.userID}
                  className="grid grid-cols-2 md:grid-cols-4 items-center gap-4 p-4 rounded-lg border border-transparent hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 cursor-pointer"
                  onClick={() => openStudentDetails(student.userID)}
                >
                  {/* Student Info */}
                  <div className="col-span-2 md:col-span-1">
                    <p className="font-semibold text-gray-800">
                      {student.name}
                    </p>
                    <p className="text-sm text-gray-500">{student.email}</p>
                  </div>

                  {/* PRN */}
                  <div className="text-gray-600">
                    <span className="md:hidden font-medium text-xs">PRN: </span>
                    {student.prnNo}
                  </div>

                  {/* Document Count */}
                  <div className="text-gray-600">
                    <span className="font-bold">{student.documentCount}</span>{" "}
                    document(s)
                  </div>

                  {/* Status */}
                  <div className="text-right">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800">
                      Pending Review
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500">No students found.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
