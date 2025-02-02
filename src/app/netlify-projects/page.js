"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import AdminRoute from "../../components/AdminRoute";
import AdminNav from "../../components/AdminNav";
import NetlifyProjects from "../../components/NetlifyProjects";

export default function NetlifyProjectsPage() {
  const { isAdmin } = useAuth();
  const { isDarkMode } = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin) {
      router.push("/dashboard");
    }
  }, [isAdmin, router]);

  return (
    <AdminRoute>
      <div
        className={`min-h-screen ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
        }`}
      >
        <AdminNav />
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold mb-6">
            Netlify Projects (Admin Only)
          </h1>
          <NetlifyProjects />
        </div>
      </div>
    </AdminRoute>
  );
}
