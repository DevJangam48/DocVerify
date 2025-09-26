import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Icon = ({ type }) => {
  const icons = {
    pdf: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-red-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    image: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-sky-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    default: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-slate-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0011.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    ),
  };
  const ext = type.split(".").pop().toLowerCase();
  if (["jpg", "jpeg", "png", "gif"].includes(ext)) return icons.image;
  if (ext === "pdf") return icons.pdf;
  return icons.default;
};

const StatusBadge = ({ status }) => {
  const styles = {
    verified: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    pending: "bg-yellow-100 text-yellow-800",
  };
  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full ${
        styles[status] || styles.pending
      }`}
    >
      {status}
    </span>
  );
};

export default function AdminDashboard({ token, adminID }) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [students, setStudents] = useState([]);
  const [feedback, setFeedback] = useState({ message: "", type: "" });
  const [actionLoading, setActionLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const showFeedback = (message, type) => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback({ message: "", type: "" }), 4000);
  };

  useEffect(() => {
    if (!token || !adminID) return;
    api
      .get(`/admins/${adminID}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProfile(res.data);
        return api.get(`/admins/students`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
      .then((res) => setStudents(res.data))
      .catch(() => {
        setProfile(null);
        setStudents([]);
      });
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

  if (!profile)
    return (
      <div className="p-12 text-lg text-indigo-700">Loading Dashboard...</div>
    );

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Welcome, {profile.name.split(" ")[0]} (Admin)!
            </h1>
            <p className="text-slate-500">College: {profile.collegeName}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition shadow"
          >
            Logout
          </button>
        </div>

        <input
          type="text"
          className="border border-gray-300 rounded p-2 w-full mb-4"
          placeholder="Search students by name, email, or PRN..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {filteredStudents.length === 0 ? (
          <p className="text-center text-slate-500 py-10">
            No students available for verification.
          </p>
        ) : (
          <div className="space-y-4">
            {filteredStudents.map(
              ({ userID, name, email, prnNo, documentCount }) => (
                <div
                  key={userID}
                  className="cursor-pointer rounded-md p-4 bg-white shadow-md hover:bg-gray-50"
                  onClick={() => openStudentDetails(userID)}
                >
                  <h2 className="text-lg font-semibold text-slate-800">
                    {name}
                  </h2>
                  <p className="text-sm text-slate-500">Email: {email}</p>
                  <p className="text-sm text-slate-500">PRN No: {prnNo}</p>
                  <p className="text-sm text-slate-500">
                    {documentCount} document(s) uploaded
                  </p>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
