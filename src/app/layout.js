// src/app/layout.js
import { ThemeProvider } from "../context/ThemeContext";
import { AuthProvider } from "../context/AuthContext";
import "./globals.css";

export const metadata = {
  title: "Irving Duran - Full Stack Developer",
  description:
    "Portfolio of Irving Duran, Full Stack Developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeProvider>
        <AuthProvider>
          <body>{children}</body>
        </AuthProvider>
      </ThemeProvider>
    </html>
  );
}
