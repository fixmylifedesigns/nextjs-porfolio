// src/firebase/projectOperations.js
import { db, auth, database } from "./firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { ref, onValue, remove } from "firebase/database";

export const addProject = async (userId, projectData) => {
  try {
    const docRef = await addDoc(collection(db, "projects"), {
      userId,
      ...projectData,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding project: ", error);
    throw error;
  }
};

export const getUserProjects = async (userId) => {
  try {
    const q = query(collection(db, "projects"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting user projects: ", error);
    throw error;
  }
};

export const deleteProject = async ({ projectId, customerId }) => {
  if (window.confirm("Are you sure you want to delete this project?")) {
    try {
      await remove(ref(database, `projects/${customerId}/${projectId}`));
      alert("Project deleted successfully!");
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  }
};

export const updateProject = async (projectId, updatedData) => {
  try {
    await updateDoc(doc(db, "projects", projectId), updatedData);
  } catch (error) {
    console.error("Error updating project: ", error);
    throw error;
  }
};
