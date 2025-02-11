import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import Background from "./Background";
import FAQ from "./FAQ";

const ExperienceCard = () => {
  const experiences = [
    {
      company: "Match Hat",
      role: "Software Engineer",
      period: "Oct 2024 - Present",
      location: "Kyoto, Japan / Remote",
    },
    {
      company: "Freelance Software Engineer",
      role: "Software Engineer",
      period: "May 2023 - Present",
      location: "Remote",
    },
    {
      company: "American Express",
      role: "Software Engineer II",
      period: "Oct 2020 - May 2023",
      location: "New York City / Remote",
    },
  ];

  const techStack = [
    "JavaScript ES6+",
    "React.js",
    "Node.js",
    "TypeScript",
    "Next.js",
    "GraphQL",
    "React Native",
    "Tailwind CSS",
  ];

  return (
    <div className="p-8 text-white">
      <header className="mb-16">
        <h1 className="text-2xl font-light tracking-wide mb-2">Experience</h1>
        <p className="text-sm tracking-wide opacity-75">Professional Journey</p>
      </header>

      <div className="max-w-lg">
        <div className="mb-12">
          {experiences.map((exp, index) => (
            <div key={index} className="mb-8 border-l border-white/30 pl-6">
              <h3 className="font-light text-xl mb-2">{exp.company}</h3>
              <p className="text-sm tracking-wide opacity-75 mb-1">
                {exp.role}
              </p>
              <p className="text-sm tracking-wide opacity-75">
                {exp.period} | {exp.location}
              </p>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-light tracking-wide mb-4">Tech Stack</h3>
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech, index) => (
              <span
                key={index}
                className="border border-white/30 px-3 py-1 text-sm tracking-wide"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={() => window.open("/Resumeirvingduran.pdf")}
          className="border border-white px-6 py-2 hover:bg-white hover:text-black transition-colors"
        >
          Download CV
        </button>
      </div>
    </div>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: "", email: "", message: "" }); // Reset form

      // Show success message for 3 seconds
      setTimeout(() => {
        setStatus((prev) => ({ ...prev, success: false }));
      }, 3000);
    } catch (error) {
      setStatus({ loading: false, success: false, error: error.message });
    }
  };

  return (
    <div className="p-8 text-white">
      <header className="mb-16">
        <h1 className="text-2xl font-light tracking-wide mb-2">Contact</h1>
        <p className="text-sm tracking-wide opacity-75">Get in touch</p>
      </header>

      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm mb-2">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-transparent border border-white/30 p-2 text-white focus:border-white outline-none"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block text-sm mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-transparent border border-white/30 p-2 text-white focus:border-white outline-none"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="message" className="block text-sm mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-transparent border border-white/30 p-2 text-white focus:border-white outline-none"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={status.loading}
          className="border border-white px-6 py-2 hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {status.loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </button>

        {/* Status Messages */}
        {status.error && (
          <p className="mt-4 text-red-400 text-sm">Error: {status.error}</p>
        )}

        {status.success && (
          <p className="mt-4 text-green-400 text-sm">
            Message sent successfully!
          </p>
        )}
      </form>
    </div>
  );
};

const MainContent = ({ onNavigate }) => (
  <div className="p-8 text-white m-auto relative">
    {/* Bio section for mobile - shown at top on mobile, hidden on desktop */}
    <div className="md:hidden mb-12">
      <p className="text-sm leading-relaxed tracking-wide">
        Born in 1993
        <br />
        in Brooklyn, New York.
        <br />
        <br />
        Creating stuff was my escape
        <br />
        from the world. My love
        <br />
        for building and making Art
        <br />
        eventually lead me to want
        <br />
        to learn how to build
        <br />
        and create with code.
      </p>
    </div>

    <header className="mb-16">
      <h1 className="text-2xl font-light tracking-wide mb-2">
        Irving Jose Duran
      </h1>
      <p className="text-sm tracking-wide opacity-75">Full Stack Engineer</p>
    </header>

    <nav className="mb-16">
      <ul className="space-y-2">
        <li
          key={0}
          className="flex items-center space-x-2 opacity-50 hover:opacity-100 transition-opacity"
        >
          <span className="text-xs">●</span>
          <a
            href="https://www.linkedin.com/in/irvingduran"
            className="text-sm tracking-wide"
          >
            Linkedin
          </a>
        </li>
        {["Info", "Contact", "FAQ"].map((item) => (
          <li
            key={item}
            className="flex items-center space-x-2 opacity-50 hover:opacity-100 transition-opacity"
          >
            <span className="text-xs">●</span>
            <button
              onClick={() => onNavigate(item.toLowerCase())}
              className="text-sm tracking-wide"
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </nav>

    {/* Bio section for desktop - hidden on mobile, shown on desktop */}
    <div className="hidden md:block absolute top-8 right-8 max-w-xs text-right">
      <p className="text-sm leading-relaxed tracking-wide">
        Born in 1993
        <br />
        in Brooklyn, New York.
        <br />
        <br />
        Creating stuff was my escape
        <br />
        from the world. My love
        <br />
        for building and making Art
        <br />
        eventually lead me to want
        <br />
        to learn how to build
        <br />
        and create with code.
      </p>
    </div>
  </div>
);

const Portfolio = () => {
  const [theme, setTheme] = useState("dark");
  const [currentPath, setCurrentPath] = useState("main");
  const [isEntering, setIsEntering] = useState(true);
  const [fontStyle, setFontStyle] = useState("normal");
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsEntering(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigation = (path) => {
    setIsFlipped(true);
    setTimeout(() => {
      setCurrentPath(path);
      setTimeout(() => {
        setIsFlipped(false);
      }, 50);
    }, 500);
  };

  const goBack = () => {
    setIsFlipped(true);
    setTimeout(() => {
      setCurrentPath("main");
      setTimeout(() => {
        setIsFlipped(false);
      }, 50);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {isEntering && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center text-white">
          <div className="text-2xl tracking-wide opacity-90">
            Irving Jose Duran
          </div>
          <div className="text-base tracking-wide opacity-75">Loading ...</div>
        </div>
      )}

      <Background />

      <div className="flip-card w-full max-w-6xl flex items-center">
        <div className={`flip-card-inner  ${isFlipped ? "is-flipped" : ""}`}>
          <div className="flip-card-front border border-white relative ">
            {currentPath === "main" ? (
              <MainContent onNavigate={handleNavigation} />
            ) : (
              <div className="relative">
                <button
                  onClick={goBack}
                  className="absolute top-4 right-4 text-white/70 hover:text-white text-sm"
                >
                  Close
                </button>
                {currentPath === "contact" && <ContactForm />}
                {currentPath === "info" && <ExperienceCard />}

                {currentPath === "faq" && <FAQ />}
              </div>
            )}

            {/* Theme Toggles */}
            {currentPath === "main" && (
              <div className="absolute bottom-8 right-8 z-10 flex items-center space-x-6 text-xs text-white">
                {/* <div className="flex items-center space-x-4">
                <button
                  onClick={() => setTheme("light")}
                  className={`theme-btn ${
                    theme === "light" ? "opacity-100" : "opacity-50"
                  }`}
                >
                  <span className="block w-2 h-2 bg-white mb-1"></span>
                  Light
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`theme-btn ${
                    theme === "dark" ? "opacity-100" : "opacity-50"
                  }`}
                >
                  <span className="block w-2 h-2 bg-white mb-1"></span>
                  Dark
                </button>
              </div> */}
                <button
                  onClick={() =>
                    setFontStyle((f) => (f === "normal" ? "mono" : "normal"))
                  }
                  className={`theme-btn ${
                    fontStyle === "mono" ? "opacity-100" : "opacity-50"
                  }`}
                >
                  <span className="block w-2 h-2 bg-white mb-1"></span>
                  Monospaced
                </button>
              </div>
            )}
          </div>
          <div className="flip-card-front p-8 text-white/50 border-t border-white/10">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex flex-col">
                <p className="text-sm tracking-wide mb-2">Projects</p>
                <div className="flex gap-4 text-xs">
                  <a
                    href="https://github.com/fixmylifedesigns"
                    className="hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </div>
              </div>

              <div className="flex flex-col">
                <p className="text-sm tracking-wide mb-2">Connect</p>
                <div className="flex gap-4 text-xs">
                  <a
                    href="https://www.linkedin.com/in/irvingduran"
                    className="hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="mailto:contact@duranirving.com"
                    className="hover:text-white transition-colors"
                  >
                    Email
                  </a>
                </div>
              </div>

              <div className="flex flex-col md:text-right">
                <p className="text-sm tracking-wide mb-2">Location</p>
                <p className="text-xs">Brooklyn, NY</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap");

        body {
          font-family: ${fontStyle === "mono" ? "monospace" : "Inter"},
            sans-serif;
          background: black;
          margin: 0;
          padding: 0;
        }

        .flip-card {
          perspective: 1000px;
          min-height: 600px;
        }

        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: left;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }

        .flip-card-inner.is-flipped {
          transform: rotateX(180deg);
        }

        .flip-card-front {
          position: relative;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .theme-btn {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          transition: opacity 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
