import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { database } from "../firebase/firebaseConfig";
import { ref, push, set, remove, onValue } from "firebase/database";
import ProjectCard from "../components/ProjectCard";

const NetlifyProjects = ({ customerId = null }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (customerId) {
          // Fetch projects from Firebase for a specific customer
          const projectsRef = ref(database, `projects/${customerId}`);
          onValue(projectsRef, (snapshot) => {
            const data = snapshot.val();
            const projectList = data
              ? Object.entries(data).map(([id, project]) => ({
                  ...project,
                  id,
                }))
              : [];
            setProjects(projectList);
            setLoading(false);
          });
        } else {
          // Fetch all Netlify projects
          const response = await fetch("/api/netlify-projects");
          if (!response.ok) {
            throw new Error("Failed to fetch projects");
          }
          const data = await response.json();
          setProjects(data);
          setLoading(false);
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProjects();
  }, [customerId]);

  const importProject = async (project) => {
    if (!customerId) {
      alert("Cannot import project without a customer ID");
      return;
    }
    try {
      const projectRef = push(ref(database, `projects/${customerId}`));
      await set(projectRef, {
        id: project.id,
        name: project.name,
        url: project.url,
        screenshot: project.screenshot_url,
        repo_url: project.repo_url,
        repo_path: project.repo_path,
        admin_url: project.admin_url,
        created_at: project.created_at,
        updated_at: project.updated_at,
        framework: project.framework,
        branch: project.branch,
        deploy_url: project.deploy_url,
      });
      alert("Project imported successfully!");
    } catch (err) {
      console.error("Error importing project:", err);
      alert("Failed to import project. Please try again.");
    }
  };

  const deleteProject = async (projectId) => {
    if (!customerId) {
      alert("Cannot delete project without a customer ID");
      return;
    }
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await remove(ref(database, `projects/${customerId}/${projectId}`));
        alert("Project deleted successfully!");
      } catch (err) {
        console.error("Error deleting project:", err);
        alert("Failed to delete project. Please try again.");
      }
    }
  };

  if (loading) return <div>Loading projects...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={`py-10 ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      <div className="container mx-auto px-4">
        <h2
          className={`text-3xl font-bold mb-6 ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          {customerId ? "Customer Projects" : "Netlify Projects"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, key) => (
            <ProjectCard key={key} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NetlifyProjects;
