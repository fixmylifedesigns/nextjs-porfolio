"use client"
import { useTheme } from "../context/ThemeContext";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Education from "../components/Education";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <Header />
      <main>
        <Hero />
        <Projects limit={3} />
        <Skills />
        {/* <Experience /> */}
        {/* <Education /> */}
        {/* <Contact /> */}
      </main>
      <Footer />
    </div>
  );
}
