// src/components/AddProjectModal.js
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { database } from "../firebase/firebaseConfig";
import { ref, push, set, update } from "firebase/database";
import { useTheme } from "../context/ThemeContext";

export default function AddProjectModal({
  isOpen,
  onClose,
  project,
  onDelete,
  customerId,
}) {
  const { user, isAdmin } = useAuth();
  const { isDarkMode } = useTheme();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [hostedUrl, setHostedUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [githubRepoName, setGithubRepoName] = useState("");

  useEffect(() => {
    if (project) {
      setName(project.name || "");
      setDescription(project.description || "");
      setHostedUrl(project.hostedUrl || "");
      setGithubUrl(project.githubUrl || "");
      setGithubRepoName(project.githubRepoName || "");
    } else {
      setName("");
      setDescription("");
      setHostedUrl("");
      setGithubUrl("");
      setGithubRepoName("");
    }
  }, [project]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    const projectData = {
      name,
      description,
      hostedUrl,
      githubUrl,
      githubRepoName,
      customerId: customerId || (project ? project.customerId : null),
      updatedAt: new Date().toISOString(),
    };

    try {
      if (project) {
        // Update existing project
        await update(
          ref(database, `projects/${project.userId || user.uid}/${project.id}`),
          projectData
        );
      } else {
        // Add new project
        const newProjectRef = push(
          ref(
            database,
            `projects/${isAdmin && customerId ? customerId : user.uid}`
          )
        );
        await set(newProjectRef, {
          ...projectData,
          createdAt: new Date().toISOString(),
        });
      }

      onClose();
      alert(
        project
          ? "Project updated successfully!"
          : "Project added successfully!"
      );
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Error saving project. Please try again.");
    }
  };

  const handleDelete = () => {
    if (project && onDelete) {
      onDelete(project.id, project.userId || user.uid);
      onClose();
    }
  };

  if (!isOpen) return null;

  const inputClassName =
    "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black bg-white";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        className={`w-full max-w-md p-6 rounded-lg ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2
          className={`text-2xl font-bold mb-4 ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          {project ? "Edit Project" : "Add New Project"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className={`block text-sm font-medium ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Project Name*
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={inputClassName}
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className={`block text-sm font-medium ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={inputClassName}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="hostedUrl"
              className={`block text-sm font-medium ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Hosted URL*
            </label>
            <input
              type="url"
              id="hostedUrl"
              value={hostedUrl}
              onChange={(e) => setHostedUrl(e.target.value)}
              required
              className={inputClassName}
            />
          </div>
          <div>
            <label
              htmlFor="githubUrl"
              className={`block text-sm font-medium ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              GitHub URL
            </label>
            <input
              type="url"
              id="githubUrl"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className={inputClassName}
            />
          </div>
          <div>
            <label
              htmlFor="githubRepoName"
              className={`block text-sm font-medium ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              GitHub Repo Name
            </label>
            <input
              type="text"
              id="githubRepoName"
              value={githubRepoName}
              onChange={(e) => setGithubRepoName(e.target.value)}
              className={inputClassName}
            />
          </div>
          <div className="flex justify-end space-x-2">
            {project && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600"
              >
                Delete
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                isDarkMode
                  ? "bg-gray-600 text-white hover:bg-gray-700"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600"
            >
              {project ? "Update" : "Add"} Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
