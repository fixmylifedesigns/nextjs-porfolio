"use client";
import { useState, useEffect } from "react";
import AdminRoute from "../../components/AdminRoute";
import AdminNav from "../../components/AdminNav";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";

export default function AdminPanel() {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      if (user) {
        try {
          setLoading(true);
          const token = await user.getIdToken();
          const response = await fetch("/api/users", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to fetch users");
          }
          const data = await response.json();
          setUsers(data.users);
        } catch (err) {
          console.error("Error fetching users:", err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUsers();
  }, [user]);

  return (
    <AdminRoute>
      <div
        className={`min-h-screen ${
          isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
        }`}
      >
        <AdminNav />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

          {loading && (
            <div
              className={`p-4 rounded-md ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } shadow`}
            >
              <p className="text-center">Loading users...</p>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md mb-4">
              <p>Error: {error}</p>
            </div>
          )}

          {!loading && !error && (
            <div
              className={`overflow-hidden rounded-lg shadow ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-xl font-semibold">User List</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className={isDarkMode ? "bg-gray-700" : "bg-gray-50"}>
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Display Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Created At
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Last Sign In
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    className={`divide-y ${
                      isDarkMode ? "divide-gray-700" : "divide-gray-200"
                    }`}
                  >
                    {users.map((user) => (
                      <tr
                        key={user.uid}
                        className={
                          isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                        }
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {user.displayName || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {new Date(user.creationTime).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {new Date(user.lastSignInTime).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <Link href={`/dashboard/${user.uid}`}>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                              View Dashboard
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminRoute>
  );
}
