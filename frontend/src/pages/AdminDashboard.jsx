import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

// Reuse icon and status badge helpers from student dashboard
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
  const fileExt = type.split(".").pop().toLowerCase();
  if (["jpg", "jpeg", "png", "gif"].includes(fileExt)) return icons.image;
  if (fileExt === "pdf") return icons.pdf;
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
  const [documents, setDocuments] = useState([]);
  const [feedback, setFeedback] = useState({ message: "", type: "" });
  const [actionLoading, setActionLoading] = useState(false);

  const showFeedback = (message, type) => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback({ message: "", type: "" }), 4000);
  };

  // Fetch admin profile/documents on mount
  useEffect(() => {
    api
      .get(`/admins/${adminID}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProfile(res.data);
        // Then fetch all college documents:
        api
          .get(`/documents/college`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((docRes) => setDocuments(docRes.data));
      });
  }, [token, adminID]);

  // Approve/Reject document
  const handleVerify = async (docId, action) => {
    setActionLoading(true);
    try {
      await api.put(
        `/documents/verify/${docId}`,
        { status: action },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      showFeedback(`Document ${action}ed successfully!`, "success");
      // Refresh docs
      const collegeId = profile?.collegeId;
      if (collegeId) {
        const docRes = await api.get(`/documents/college/${collegeId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDocuments(docRes.data);
      }
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

  if (!profile) {
    return (
      <div className="p-12 text-lg text-indigo-700">Loading Dashboard...</div>
    );
  }

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
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-bold text-slate-900 mb-4">
            Documents From Your College
          </h3>
          {feedback.message && (
            <p
              className={`mb-4 p-3 rounded-md text-sm ${
                feedback.type === "error"
                  ? "bg-red-50 text-red-700"
                  : "bg-green-50 text-green-700"
              }`}
            >
              {feedback.message}
            </p>
          )}
          {documents.length === 0 ? (
            <p className="text-slate-500 text-center py-10">
              No documents available for verification.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-slate-200">
                  <tr className="text-slate-500">
                    <th className="py-3 px-4 font-semibold">File Name</th>
                    <th className="py-3 px-4 font-semibold">Student PRN</th>
                    <th className="py-3 px-4 font-semibold">Uploaded</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                    <th className="py-3 px-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {documents.map((doc) => (
                    <tr key={doc.document_id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <Icon type={doc.s3Key} />
                        <span className="font-medium text-slate-800">
                          {doc.s3Key.split("/").pop()}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {doc.uploaderPRN || doc.userId}
                      </td>
                      <td className="py-3 px-4 text-slate-500">
                        {new Date(doc.uploadedAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 capitalize">
                        <StatusBadge status={doc.status} />
                      </td>
                      <td className="py-3 px-4 flex gap-2">
                        <a
                          href={doc.s3Url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-indigo-600 hover:text-indigo-800"
                        >
                          View
                        </a>
                        {/* Only show Approve/Reject if not verified or rejected */}
                        {doc.status === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                handleVerify(doc.document_id, "verified")
                              }
                              disabled={actionLoading}
                              className="px-3 py-1 rounded bg-green-600 text-white text-xs font-semibold"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() =>
                                handleVerify(doc.document_id, "rejected")
                              }
                              disabled={actionLoading}
                              className="px-3 py-1 rounded bg-red-600 text-white text-xs font-semibold"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
