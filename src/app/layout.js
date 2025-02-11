// src/app/layout.js
import { ThemeProvider } from "../context/ThemeContext";
import { AuthProvider } from "../context/AuthContext";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://duranirving.com"), // Update with your domain
  title: {
    default: "Irving Jose Duran | Full Stack Engineer",
    template: "%s | Irving Jose Duran",
  },
  description:
    "Full Stack Engineer specializing in Next.js, React, Node.js, and modern web technologies. Based in Brooklyn, NY.",
  keywords: [
    "Irving Jose Duran",
    "Full Stack Engineer",
    "Web Developer",
    "Software Engineer",
    "React Developer",
    "Next.js Developer",
    "Brooklyn",
    "New York",
    "Frontend Development",
    "Backend Development",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Portfolio",
    "Japan"
  ],
  authors: [{ name: "Irving Jose Duran" }],
  creator: "Irving Jose Duran",
  publisher: "Irving Jose Duran",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://duranirving.com",
    siteName: "Irving Jose Duran",
    title: "Irving Jose Duran | Full Stack Engineer",
    description:
      "Full Stack Engineer specializing in Next.js, React, Node.js, and modern web technologies. Based in Brooklyn, NY.",
    images: [
      {
        url: "/api/og", // Make sure to create and add this image
        width: 1200,
        height: 630,
        alt: "Irving Jose Duran - Full Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Irving Jose Duran | Full Stack Engineer",
    description:
      "Full Stack Engineer specializing in Next.js, React, Node.js, and modern web technologies. Based in Brooklyn, NY.",
    images: ["/api/og"], // Same image as OG
    creator: "@fixmylifenyc", // Update with your Twitter handle if you have one
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // verification: {
  //   google: "your-google-verification-code", // Add if you have Google Search Console verification
  //   // Add other verification codes as needed
  // },
  alternates: {
    canonical: "https://duranirving.com",
  },
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
