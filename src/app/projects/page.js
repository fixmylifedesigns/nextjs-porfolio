"use client";
import { useTheme } from "../../context/ThemeContext";
import Header from "../../components/Header";
import Projects from "../../components/Projects";
import Footer from "../../components/Footer";

export default function ProjectsPage() {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <Header />
      <main>
        <Projects />
      </main>
      <Footer />
    </div>
  );
}
