// src/components/Footer.js
import Link from "next/link";
import { useTheme } from "../context/ThemeContext";

export default function Footer() {
  const { isDarkMode } = useTheme();

  return (
    <footer
      className={`py-8 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-800 text-white"
      }`}
    >
      <div className="container mx-auto px-6 text-center">
        <p>&copy; 2024 Irving Duran. All rights reserved.</p>
        <div className="mt-4 flex justify-center space-x-4">
          <a
            href="https://linkedin.com/in/irvingduran"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/fixmylifedesigns"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            GitHub
          </a>
          <Link href="/login" className="hover:text-blue-400">
            Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
