import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { database } from "../firebase/firebaseConfig";
import { ref, push, set } from "firebase/database";

const ImportProjectModal = ({ isOpen, onClose, customerId }) => {
  const [netlifyProjects, setNetlifyProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (isOpen) {
      fetchNetlifyProjects();
    }
  }, [isOpen]);

  const fetchNetlifyProjects = async () => {
    try {
      const response = await fetch("/api/netlify-projects");
      if (!response.ok) {
        throw new Error("Failed to fetch Netlify projects");
      }
      const data = await response.json();
      console.log("Fetched Netlify projects:", data); // Debug log
      setNetlifyProjects(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching Netlify projects:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  const importProject = async (project) => {
    console.log("Importing project:", project); // Debug log
    try {
      const projectRef = push(ref(database, `projects/${customerId}`));
      const projectData = {
        netlifyId: project.id,
        name: project.name,
        url: project.url,
        screenshot: project.screenshot,
        repo_url: project.repo_url,
        repo_path: project.repo_path,
        admin_url: project.admin_url,
        created_at: project.created_at,
        updated_at: project.updated_at,
        framework: project.framework,
        branch: project.branch,
        deploy_url: project.deploy_url,
      };
      console.log("Project data to be imported:", projectData); // Debug log
      await set(projectRef, projectData);
      alert("Project imported successfully!");
      onClose();
    } catch (err) {
      console.error("Error importing project:", err);
      alert(`Failed to import project: ${err.message}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div
        className={`w-full max-w-md p-6 rounded-lg ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">Import Netlify Project</h2>
        {loading && <p>Loading projects...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && (
          <ul className="space-y-2">
            {netlifyProjects.map((project) => (
              <li
                key={project.id}
                className="flex justify-between items-center"
              >
                <span>{project.name}</span>
                <button
                  onClick={() => importProject(project)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Import
                </button>
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ImportProjectModal;
