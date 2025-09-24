import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

export default function AdminStudentDetails({ token }) {
  const { studentId } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token || !studentId) return;
    setLoading(true);

    Promise.all([
      api.get(`/students/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      api.get(`/admins/${studentId}/documents`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ])
      .then(([studentRes, docsRes]) => {
        setStudent(studentRes.data);
        setDocuments(docsRes.data);
        setError("");
      })
      .catch((err) => {
        setError("Failed to load student details or documents.");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [token, studentId]);

  if (loading)
    return <div className="p-6 text-center">Loading student details...</div>;
  if (error) return <div className="p-6 text-center text-red-700">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
      >
        &larr; Back
      </button>

      <h2 className="text-2xl font-bold mb-2">{student.name}</h2>
      <p className="mb-1">PRN: {student.prn}</p>
      <p className="mb-1">Email: {student.email}</p>
      <p className="mb-1">College: {student.collegeName}</p>
      {/* Extend with more profile fields as needed */}

      <h3 className="text-xl mt-8 mb-4">Uploaded Documents</h3>
      {documents.length === 0 ? (
        <p>No documents uploaded by this student.</p>
      ) : (
        <table className="w-full border border-slate-300 border-collapse">
          <thead>
            <tr>
              <th className="border border-slate-300 p-2">File Name</th>
              <th className="border border-slate-300 p-2">Uploaded Date</th>
              <th className="border border-slate-300 p-2">Status</th>
              <th className="border border-slate-300 p-2">View Document</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.document_id} className="hover:bg-slate-100">
                <td className="border border-slate-300 p-2 flex items-center gap-2">
                  <Icon type={doc.s3Key} />
                  {doc.s3Key.split("/").pop()}
                </td>
                <td className="border border-slate-300 p-2">
                  {new Date(doc.uploadedAt).toLocaleDateString()}
                </td>
                <td className="border border-slate-300 p-2 capitalize">
                  <StatusBadge status={doc.status} />
                </td>
                <td className="border border-slate-300 p-2">
                  <a
                    href={doc.s3Url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline font-semibold"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
