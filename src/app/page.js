"use client";
// import { useTheme } from "../context/ThemeContext";
// import Header from "../components/Header";
// import Hero from "../components/Hero";
// import Projects from "../components/Projects";
// import Skills from "../components/Skills";
// import Experience from "../components/Experience";
// import Education from "../components/Education";
// import Contact from "../components/Contact";
// import Footer from "../components/Footer";
import Portfolio from "../components/new/landing";
import ElevenLabsAgent from "../components/ElevenLabsAgent";

export default function Home() {
  // const { isDarkMode } = useTheme();

  return (
    <div>
      <Portfolio />
      {process.env.NEXT_PUBLIC_ELEVEN_LABS && <ElevenLabsAgent />}
    </div>
  );
}
