import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

// --- HELPER COMPONENTS (Icons, Badges) ---

const BackIcon = () => (
  <svg
    className="w-5 h-5 mr-2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 19l-7-7m0 0l7-7m-7 7h18"
    />
  </svg>
);

const Icon = ({ type }) => {
  const icons = {
    pdf: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7 text-red-500"
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
        className="h-7 w-7 text-sky-500"
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
        className="h-7 w-7 text-slate-500"
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
      className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${
        styles[status] || styles.pending
      }`}
    >
      {status}
    </span>
  );
};

const getCleanFilename = (s3Key) => {
  const fullFilename = s3Key.split("/").pop();
  const underscoreIndex = fullFilename.indexOf("_");
  if (underscoreIndex <= 0) {
    return fullFilename;
  }
  return fullFilename.substring(underscoreIndex + 1);
};

// --- MODAL COMPONENT ---
const ActionModal = ({ doc, action, onClose, onConfirm }) => {
  if (!doc) return null;
  const [remarks, setRemarks] = useState("");
  const isReject = action === "rejected";
  const title = isReject ? "Reject Document" : "Approve Document";
  const buttonClass = isReject
    ? "bg-red-600 hover:bg-red-700"
    : "bg-green-600 hover:bg-green-700";
  const handleConfirm = () => onConfirm(doc.document_id, action, remarks);
  return (
    <div className="fixed inset-0 bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
        <p className="text-sm text-gray-600 mb-4">
          You are about to {action} the document:{" "}
          <span className="font-semibold">{getCleanFilename(doc.s3Key)}</span>.
          {isReject && " Please provide a reason for rejection."}
        </p>
        {isReject && (
          <textarea
            className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:ring-2 focus:ring-indigo-500"
            placeholder="Reason for rejection (e.g., 'Illegible document')"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        )}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 rounded-md text-white ${buttonClass}`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

// --- SKELETON LOADER ---
const DetailsSkeleton = () => (
  <div className="max-w-7xl mx-auto p-4 sm:p-6 animate-pulse">
    <div className="h-8 w-1/3 bg-gray-200 rounded mb-2"></div>
    <div className="h-4 w-1/2 bg-gray-200 rounded mb-8"></div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column Skeleton */}
      <div className="lg:col-span-1 space-y-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="h-6 w-1/2 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded w-full mt-6"></div>
        </div>
      </div>
      {/* Right Column Skeleton */}
      <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
        <div className="h-6 w-1/3 bg-gray-200 rounded mb-4"></div>
        <div className="space-y-3">
          <div className="h-10 bg-gray-100 rounded"></div>
          <div className="h-10 bg-gray-100 rounded"></div>
          <div className="h-10 bg-gray-100 rounded"></div>
        </div>
      </div>
    </div>
  </div>
);

// --- MAIN COMPONENT ---
export default function AdminStudentDetails({ token }) {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalState, setModalState] = useState({
    isOpen: false,
    doc: null,
    action: "",
  });

  const [isSendingEmail, setIsSendingEmail] = useState(false);

  useEffect(() => {
    const fetchDetails = () => {
      if (!studentId) {
        setLoading(false);
        return;
      }
      setLoading(true);
      Promise.all([
        api.get(`/admins/student/${studentId}`),
        api.get(`/admins/${studentId}/documents`),
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
    };
    fetchDetails();
  }, [studentId]);

  const handleActionClick = (doc, action) =>
    setModalState({ isOpen: true, doc, action });
  const handleModalClose = () =>
    setModalState({ isOpen: false, doc: null, action: "" });

  const handleConfirmAction = async (documentId, status, remark) => {
    try {
      await api.put(`/admins/documents/${documentId}/status`, {
        status,
        remark,
      });
      setDocuments((prevDocs) =>
        prevDocs.map((doc) =>
          doc.document_id === documentId ? { ...doc, status, remark } : doc
        )
      );
    } catch (err) {
      console.error("Failed to update document status:", err);
      setError("Failed to save status change. Please try again.");
    } finally {
      handleModalClose();
    }
  };

  const handleSendEmail = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to send a status update email to ${student.name}?`
    );
    if (!confirmed) return;

    setIsSendingEmail(true);
    try {
      await api.post(`/admins/student/${studentId}/send-status-email`);
      alert("Status email sent successfully!");
    } catch (err) {
      console.error("Failed to send email:", err);
      alert("Failed to send email. Please try again.");
    } finally {
      setIsSendingEmail(false);
    }
  };

  if (loading)
    return (
      <div className="bg-gray-50 min-h-screen p-4 sm:p-6 font-sans">
        <DetailsSkeleton />
      </div>
    );
  if (error)
    return (
      <div className="p-6 text-center text-red-600 bg-red-50 rounded-lg">
        {error}
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 font-sans">
      <ActionModal
        {...modalState}
        onClose={handleModalClose}
        onConfirm={handleConfirmAction}
      />
      {student && (
        <div className="max-w-7xl mx-auto">
          {/* --- ✅ MODIFIED HEADER --- */}
          <header className="mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center mb-4 text-sm text-gray-700 font-semibold hover:text-indigo-600 transition"
            >
              <BackIcon /> Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-gray-800">{student.name}</h1>
          </header>

          {/* --- ✅ NEW TWO-COLUMN LAYOUT --- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* --- ✅ Left Column: Student Profile --- */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-6">
                  Student Profile
                </h2>
                <div className="space-y-4 text-sm text-slate-700">
                  <p>
                    <span className="text-slate-500">Name:</span> {student.name}
                  </p>
                  <p>
                    <span className="text-slate-500">PRN:</span> {student.prn}
                  </p>
                  <p>
                    <span className="text-slate-500">Email:</span>{" "}
                    {student.email}
                  </p>
                  <p>
                    <span className="text-slate-500">College:</span>{" "}
                    {student.collegeName}
                  </p>
                  <p>
                    <span className="text-slate-500">Phone:</span>{" "}
                    {student.phone}
                  </p>
                  <p>
                    <span className="text-slate-500">Address:</span>{" "}
                    {student.currentAddress}
                  </p>
                </div>

                <hr className="my-6" />

                <button
                  onClick={handleSendEmail}
                  disabled={isSendingEmail}
                  className="w-full px-4 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg shadow-sm hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-wait"
                >
                  {isSendingEmail ? "Sending..." : "Send Status Email"}
                </button>
              </div>
            </div>

            {/* --- ✅ Right Column: Documents List --- */}
            <main className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-700">
                  Uploaded Documents
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 border-b border-gray-200 text-xs text-gray-600 uppercase">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        File Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 hidden md:table-cell"
                      >
                        Uploaded Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.length > 0 ? (
                      documents.map((doc) => (
                        <tr
                          key={doc.document_id}
                          className="border-b last:border-0 hover:bg-gray-50"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex-shrink-0">
                                <Icon type={doc.s3Key} />
                              </div>
                              <div>
                                <p className="font-medium text-gray-800 break-all">
                                  {getCleanFilename(doc.s3Key)}
                                </p>
                                <p className="text-gray-500 md:hidden">
                                  {new Date(
                                    doc.uploadedAt
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-500 hidden md:table-cell">
                            {new Date(doc.uploadedAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <StatusBadge status={doc.status} />
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex justify-end items-center space-x-2">
                              <a
                                href={doc.s3Url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-md text-xs"
                              >
                                View
                              </a>
                              <button
                                onClick={() =>
                                  handleActionClick(doc, "rejected")
                                }
                                disabled={doc.status !== "pending"}
                                className="px-3 py-1.5 font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-md text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Reject
                              </button>
                              <button
                                onClick={() =>
                                  handleActionClick(doc, "verified")
                                }
                                disabled={doc.status !== "pending"}
                                className="px-3 py-1.5 font-semibold text-green-600 bg-green-50 hover:bg-green-100 rounded-md text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Approve
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="text-center py-16 text-gray-500"
                        >
                          No documents uploaded.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </main>
          </div>
        </div>
      )}
    </div>
  );
}
