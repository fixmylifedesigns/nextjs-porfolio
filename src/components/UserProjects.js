// src/components/UserProjects.js
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { database } from "../firebase/firebaseConfig";
import { ref, onValue, remove, get } from "firebase/database";

export default function UserProjects() {
  const [projects, setProjects] = useState([]);
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    if (user) {
      const projectsRef = isAdmin
        ? ref(database, "projects")
        : ref(database, `projects/${user.uid}`);
      const unsubscribe = onValue(projectsRef, async (snapshot) => {
        const data = snapshot.val();
        if (isAdmin) {
          const projectList = [];
          for (const [userId, userProjects] of Object.entries(data)) {
            for (const [projectId, project] of Object.entries(userProjects)) {
              const customerRef = ref(
                database,
                `customers/${project.customerId}`
              );
              const customerSnapshot = await get(customerRef);
              const customer = customerSnapshot.val();
              projectList.push({
                id: projectId,
                userId,
                ...project,
                customer,
              });
            }
          }
          setProjects(projectList);
        } else {
          const projectList = data
            ? Object.entries(data).map(([id, value]) => ({ id, ...value }))
            : [];
          setProjects(projectList);
        }
      });

      return () => unsubscribe();
    }
  }, [user, isAdmin]);

  const handleDelete = async (projectId, userId = user.uid) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await remove(ref(database, `projects/${userId}/${projectId}`));
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("Failed to delete project. Please try again.");
      }
    }
  };

  return (
    <div>
      <h2>{isAdmin ? "All Projects" : "Your Projects"}</h2>
      {projects.map((project) => (
        <div key={project.id}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <a href={project.hostedUrl} target="_blank" rel="noopener noreferrer">
            View Project
          </a>
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          {isAdmin && (
            <p>Customer: {project.customer ? project.customer.name : "N/A"}</p>
          )}
          <button
            onClick={() =>
              handleDelete(project.id, isAdmin ? project.userId : undefined)
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
