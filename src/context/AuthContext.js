// src/context/AuthContext.js
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { auth, database } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get } from "firebase/database";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          const adminRef = ref(database, `admins/${user.uid}`);
          const snapshot = await get(adminRef);
          setIsAdmin(snapshot.val() === true);
        } catch (error) {
          console.error("Error checking admin status:", error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
