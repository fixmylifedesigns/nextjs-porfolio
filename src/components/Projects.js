import React from "react";
import Link from "next/link";
import { useTheme } from "../context/ThemeContext";
import projectsData from "../data/projectData.json";

export default function Projects({ limit }) {
  const { isDarkMode } = useTheme();
  const displayedProjects = limit
    ? projectsData.filter((project) => project.display === 1).slice(0, limit)
    : projectsData.filter((project) => project.display === 1);

  return (
    <section
      id="projects"
      className={`py-20 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}
    >
      <div className="container mx-auto px-6">
        <h2
          className={`text-3xl font-bold text-center mb-8 ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Recent Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project) => (
            <div
              key={project.title}
              className={`rounded-lg shadow-md overflow-hidden ${
                isDarkMode ? "bg-gray-700" : "bg-white"
              }`}
            >
              <div className="relative h-48">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3
                  className={`font-bold text-xl mb-2 ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  {project.title}
                </h3>
                <p
                  className={`${
                    isDarkMode ? "text-white" : "text-gray-800"
                  } mb-4`}
                >
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.website && (
                    <a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition duration-300"
                    >
                      Website
                    </a>
                  )}
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-900 transition duration-300"
                    >
                      Repo
                    </a>
                  )}
                  {project.api && (
                    <a
                      href={project.api}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 text-white px-4 py-2 rounded-md text-sm hover:bg-green-600 transition duration-300"
                    >
                      API
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-purple-500 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-600 transition duration-300"
                    >
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {limit &&
          projectsData.filter((project) => project.display === 1).length >
            limit && (
            <div className="mt-12 text-right">
              <Link href="/projects">
                <span
                  className={`px-6 py-3 rounded-md text-lg font-semibold ${
                    isDarkMode
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  } transition duration-300`}
                >
                  View All Projects
                </span>
              </Link>
            </div>
          )}
      </div>
    </section>
  );
}
