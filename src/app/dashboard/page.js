"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { signOut } from "firebase/auth";
import { auth, database } from "../../firebase/firebaseConfig";
import { ref, onValue, remove } from "firebase/database";
import ProtectedRoute from "../../components/ProtectedRoute";
import AddProjectModal from "../../components/AddProjectModal";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ToggleTheme from "../../components/ToggleTheme";
import AdminNav from "../../components/AdminNav";
import ProjectCard from "../../components/ProjectCard";

export default function Dashboard() {
  const { user, isAdmin } = useAuth();
  const { isDarkMode } = useTheme();
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const projectsRef = ref(database, `projects/${user.uid}`);
      const unsubscribe = onValue(projectsRef, (snapshot) => {
        const data = snapshot.val();
        const projectList = data
          ? Object.entries(data).map(([id, value]) => ({ id, ...value }))
          : [];
        setProjects(projectList);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleEditProject = (project) => {
    setCurrentProject(project);
    setIsModalOpen(true);
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await remove(ref(database, `projects/${user.uid}/${projectId}`));
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  return (
    <ProtectedRoute>
      <div
        className={`min-h-screen ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
        }`}
      >
        {isAdmin && <AdminNav />}

        <div className="container mx-auto px-4 py-8">
          {isAdmin && (
            <div
              className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-8 flex justify-between items-center"
              role="alert"
            >
              <div>
                <p className="font-bold">Admin Access</p>
                <p>You have administrative privileges.</p>
              </div>
              <Link href="/admin">
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
                  Go to Admin Panel
                </button>
              </Link>
            </div>
          )}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">
              Welcome, {user?.displayName || user?.email}!
            </h1>
            <div>
              <button
                onClick={() => {
                  setCurrentProject(null);
                  setIsModalOpen(true);
                }}
                className="mr-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Add New Project
              </button>
              <ToggleTheme />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                handleEditProject={handleEditProject}
              />
            ))}
          </div>

          {projects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl">
                You haven&apos;t added any projects yet.
              </p>
              <p className="mt-2">
                Click the &quot;Add New Project&quot; button to get started!
              </p>
            </div>
          )}

          <button
            onClick={handleSignOut}
            className="mt-8 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      <AddProjectModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentProject(null);
        }}
        project={currentProject}
        onDelete={handleDeleteProject}
      />
    </ProtectedRoute>
  );
}
