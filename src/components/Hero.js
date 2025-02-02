import { useTheme } from "../context/ThemeContext";
import portrait from "@/data/images/portrait.jpg";
import Image from "next/image";

export default function Hero() {
  const { isDarkMode } = useTheme();

  return (
    <section
      className={`py-20 ${
        isDarkMode ? "bg-gray-1000 text-white" : "bg-blue-600 text-white"
      }`}
    >
      <div className="container mx-auto px-6 text-center">
        <div className="flex justify-center mb-6">
          <Image
            src={portrait}
            alt="Irving Duran"
            width={150}
            height={150}
            className="rounded-full border-4 border-white shadow-lg"
          />
        </div>
        <h1 className="text-4xl font-bold mb-2">Irving Duran</h1>
        <p className="text-xl mb-4">Full Stack Developer</p>
        <p className="mb-8">Based in Brooklyn, New York</p>
        <a
          href="#contact"
          className={`px-6 py-3 rounded-full font-bold ${
            isDarkMode
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-white text-blue-600 hover:bg-blue-100"
          } transition duration-300`}
        >
          Get in Touch
        </a>
        <a
          href="#contact"
          className={`px-6 py-3 rounded-full font-bold ml-2 ${
            isDarkMode
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-white text-blue-600 hover:bg-blue-100"
          } transition duration-300`}
        >
          Linkedin
        </a>
      </div>
    </section>
  );
}
