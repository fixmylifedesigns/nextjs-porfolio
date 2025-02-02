// src/components/ProjectCard.js
import React from "react";
import { useTheme } from "../context/ThemeContext";
import { deleteProject } from "../firebase/projectOperations";

const ProjectCard = ({ project, customerId }) => {
  const { isDarkMode } = useTheme();

  return (
    <div
      key={project.id}
      className={`rounded-lg shadow-md p-6 ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}
    >
      <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
      {project.screenshot && (
        <img
          src={project.screenshot}
          alt={project.name}
          className="w-full h-40 object-cover mb-4"
        />
      )}
      <p className="mb-4">{project.url}</p>
      <p className="mb-2">Framework: {project.framework || "N/A"}</p>
      <p className="mb-2">Branch: {project.branch || "N/A"}</p>
      <div className="flex flex-wrap gap-2 mt-4">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-block px-4 py-2 rounded ${
            isDarkMode
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white transition-colors duration-200`}
        >
          Visit Site
        </a>
        {project.repo_url && (
          <a
            href={project.repo_url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block px-4 py-2 rounded ${
              isDarkMode
                ? "bg-gray-600 hover:bg-gray-700"
                : "bg-gray-500 hover:bg-gray-600"
            } text-white transition-colors duration-200`}
          >
            View Repo
          </a>
        )}
        {customerId && (
          <button
            onClick={() => deleteProject({ projectId: project.id, customerId })}
            className={`inline-block px-4 py-2 rounded ${
              isDarkMode
                ? "bg-red-600 hover:bg-red-700"
                : "bg-red-500 hover:bg-red-600"
            } text-white transition-colors duration-200`}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
