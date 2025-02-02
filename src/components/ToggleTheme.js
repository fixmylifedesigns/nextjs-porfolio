'use client'
// src/components/ToggleTheme.js
import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function ToggleTheme() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full ${
        isDarkMode
          ? "bg-yellow-400 text-gray-900"
          : "bg-gray-800 text-yellow-400"
      }`}
    >
      {isDarkMode ? "🌞" : "🌙"}
    </button>
  );
}
