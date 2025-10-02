import React, { useState } from "react";
import api from "../api/axios";

const DebugPanel = () => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState({});

  const testEndpoint = async (name, url, headers = {}) => {
    setLoading((prev) => ({ ...prev, [name]: true }));
    try {
      const response = await api.get(url, { headers });
      setResults((prev) => ({
        ...prev,
        [name]: {
          success: true,
          status: response.status,
          data: response.data,
        },
      }));
    } catch (error) {
      setResults((prev) => ({
        ...prev,
        [name]: {
          success: false,
          status: error.response?.status || "Network Error",
          error: error.response?.data || error.message,
        },
      }));
    } finally {
      setLoading((prev) => ({ ...prev, [name]: false }));
    }
  };

  const token = localStorage.getItem("token");

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-bold mb-4">API Debug Panel</h3>

      <div className="space-y-2 mb-4">
        <p>
          <strong>Token exists:</strong> {token ? "Yes" : "No"}
        </p>
        <p>
          <strong>Token preview:</strong>{" "}
          {token ? `${token.substring(0, 20)}...` : "None"}
        </p>
      </div>

      <div className="space-y-2">
        <button
          onClick={() => testEndpoint("health", "/health")}
          disabled={loading.health}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          {loading.health ? "Testing..." : "Test Health"}
        </button>

        <button
          onClick={() => testEndpoint("students", "/admins/students")}
          disabled={loading.students}
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
        >
          {loading.students ? "Testing..." : "Test Get Students"}
        </button>

        <button
          onClick={() => testEndpoint("student-123", "/admins/student/123")}
          disabled={loading["student-123"]}
          className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
        >
          {loading["student-123"] ? "Testing..." : "Test Get Student (123)"}
        </button>

        <button
          onClick={() => testEndpoint("docs-123", "/admins/123/documents")}
          disabled={loading["docs-123"]}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          {loading["docs-123"] ? "Testing..." : "Test Get Documents (123)"}
        </button>
      </div>

      <div className="mt-6">
        <h4 className="font-bold mb-2">Results:</h4>
        <pre className="bg-white p-4 rounded text-xs overflow-auto max-h-96">
          {JSON.stringify(results, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default DebugPanel;
