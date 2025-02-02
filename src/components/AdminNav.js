"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "../context/ThemeContext";

const AdminNav = () => {
  const pathname = usePathname();
  const { isDarkMode } = useTheme();

  const navItems = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/admin", label: "Admin Panel" },
    { path: "/netlify-projects", label: "Netlify Projects" },
  ];

  const isActive = (path) => pathname === path;

  return (
    <nav className={`py-4 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
      <div className="container mx-auto px-4">
        <ul className="flex space-x-4">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link href={item.path}>
                <span
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive(item.path)
                      ? isDarkMode
                        ? "bg-gray-900 text-white"
                        : "bg-white text-gray-900"
                      : isDarkMode
                      ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                      : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                  } transition-colors duration-200`}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default AdminNav;
