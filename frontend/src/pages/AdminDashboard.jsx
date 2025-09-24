import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Icon = ({ type }) => {
  // ... Icon component as previously defined
};

const StatusBadge = ({ status }) => {
  // ... StatusBadge component as previously defined
};

export default function AdminDashboard({ token, adminID }) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [documents, setDocuments] = useState([]);
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
        return api.get(`/documents/college`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
      .then((docRes) => setDocuments(docRes.data))
      .catch(() => {
        setProfile(null);
        setDocuments([]);
      });
  }, [token, adminID]);

  // Group documents by studentId or PRN
  const groupedStudents = documents.reduce((acc, doc) => {
    const studentId = doc.userId || doc.uploaderPRN || "Unknown";
    if (!acc[studentId]) acc[studentId] = { studentId, documents: [] };
    acc[studentId].documents.push(doc);
    return acc;
  }, {});

  const studentList = Object.values(groupedStudents).filter((student) =>
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleVerify = async (docId, action) => {
    setActionLoading(true);
    try {
      await api.put(
        `/documents/verify/${docId}`,
        { status: action },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showFeedback(`Document ${action}ed successfully!`, "success");
      const res = await api.get(`/documents/college`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDocuments(res.data);
    } catch {
      showFeedback(`Failed to verify document.`, "error");
    }
    setActionLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminID");
    navigate("/");
  };

  const openStudentDetails = (studentId) => {
    navigate(`/admin/student/${studentId}`);
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
          placeholder="Search students by PRN or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {studentList.length === 0 ? (
          <p className="text-center text-slate-500 py-10">
            No documents available for verification.
          </p>
        ) : (
          <div className="space-y-4">
            {studentList.map(({ studentId, documents }) => (
              <div
                key={studentId}
                className="cursor-pointer rounded-md p-4 bg-white shadow-md hover:bg-gray-50"
                onClick={() => openStudentDetails(studentId)}
              >
                <h2 className="text-lg font-semibold text-slate-800">
                  {studentId}
                </h2>
                <p className="text-sm text-slate-500">
                  {documents.length} document(s) uploaded
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
