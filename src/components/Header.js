import Link from "next/link";
import ToggleTheme from "./ToggleTheme";
import { useTheme } from "../context/ThemeContext";

export default function Header() {
  const { isDarkMode } = useTheme();

  return (
    <header
      className={`sticky top-0 z-10 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/">
          <span className="font-bold text-xl">Irving Duran</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="#projects">
            <span className="hover:text-blue-500">Projects</span>
          </Link>
          <Link href="#skills">
            <span className="hover:text-blue-500">Skills</span>
          </Link>
          <Link href="#experience">
            <span className="hover:text-blue-500">Experience</span>
          </Link>
          <Link href="#contact">
            <span className="hover:text-blue-500">Contact</span>
          </Link>
          <ToggleTheme />
        </div>
      </nav>
    </header>
  );
}
