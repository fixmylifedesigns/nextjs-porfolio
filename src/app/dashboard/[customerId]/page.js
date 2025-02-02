"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useTheme } from "../../../context/ThemeContext";
import { database } from "../../../firebase/firebaseConfig";
import { ref, onValue, off } from "firebase/database";
import AdminRoute from "../../../components/AdminRoute";
import ToggleTheme from "../../../components/ToggleTheme";
import AddProjectModal from "../../../components/AddProjectModal";
import ImportProjectModal from "../../../components/ImportProjectModal";
import ProjectCard from "../../../components/ProjectCard";
import AdminNav from "../../../components/AdminNav";

export default function CustomerDashboard({ params }) {
  const { user, isAdmin } = useAuth();
  const { isDarkMode } = useTheme();
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { customerId } = params;

  useEffect(() => {
    console.log("CustomerDashboard useEffect", { user, isAdmin, customerId });

    if (user && isAdmin) {
      const projectsRef = ref(database, `projects/${customerId}`);
      console.log("Projects ref created", projectsRef.toString());

      setLoading(true);
      setError(null);

      const unsubscribe = onValue(
        projectsRef,
        (snapshot) => {
          setLoading(false);
          if (snapshot.exists()) {
            const projectsData = snapshot.val();
            console.log("Projects data fetched", projectsData);
            const projectsList = Object.entries(projectsData).map(
              ([id, data]) => ({
                id,
                ...data,
              })
            );
            setProjects(projectsList);
            console.log("Projects state updated", projectsList);
          } else {
            console.log("No projects found for this customer");
            setProjects([]);
          }
        },
        (error) => {
          setLoading(false);
          setError("Failed to fetch projects. Please try again later.");
          console.error("Error fetching projects:", error);
        }
      );

      return () => {
        console.log("Unsubscribing from projects listener");
        off(projectsRef);
      };
    }
  }, [user, isAdmin, customerId]);

  const handleDeleteProject = (projectId) => {
    console.log("handleDeleteProject called", { projectId });
    setProjects((prevProjects) => {
      const updatedProjects = prevProjects.filter(
        (project) => project.id !== projectId
      );
      console.log("Updated projects state", updatedProjects);
      return updatedProjects;
    });
  };

  return (
    <AdminRoute>
      <div
        className={`min-h-screen ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
        }`}
      >
        <AdminNav />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">
              Customer Dashboard: {customerId}
            </h1>
            <div>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="mr-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Add New Project
              </button>
              <button
                onClick={() => setIsImportModalOpen(true)}
                className="mr-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                Import Project
              </button>
              <ToggleTheme />
            </div>
          </div>

          {loading && <p>Loading projects...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  customerId={customerId}
                  onDelete={handleDeleteProject}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setCurrentProject(null);
        }}
        project={currentProject}
        customerId={customerId}
      />

      <ImportProjectModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        customerId={customerId}
      />
    </AdminRoute>
  );
}
