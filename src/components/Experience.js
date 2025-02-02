import { useTheme } from "../context/ThemeContext";

export default function Experience() {
  const { isDarkMode } = useTheme();
  const experiences = [
    {
      company: "Freelance",
      position: "React Developer",
      period: "July 2023 to Current",
      responsibilities: [
        "Creating new features, functionalities and capabilities on web app",
        "Improve quality of existing code and documentation",
        "Provide guidance and assistance to team members",
        "Leading the team in more test-drive development with Jest.js",
      ],
    },
    {
      company: "American Express",
      position: "Software Engineer III",
      period: "Oct. 2020 to Mar. 2022",
      responsibilities: [
        "Developing new user-facing features using React.js and Angular",
        "Building reusable cross platform components and front-end libraries for future use",
        "Translating designs and wireframes into high quality code",
        "Optimizing components for maximum performance across a vast array of web-capable devices and browsers",
      ],
    },
    {
      company: "Lambda School",
      position: "Team Lead, Full Stack Web Development & Computer Science",
      period: "May 2019 to Feb. 2020",
      responsibilities: [
        "Work closely with students on HTML5, CSS3, Javascript ES5/ES6, React js and Node js",
        "Manage a group of 7-10 students",
        "Mentor students to achieve good coding practices",
      ],
    },
  ];

  return (
    <section
      id="experience"
      className={`py-20 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
    >
      <div className="container mx-auto px-6">
        <h2
          className={`text-3xl font-bold text-center mb-8 ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Work Experience
        </h2>
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`border-l-4 ${
                isDarkMode ? "border-blue-500" : "border-blue-600"
              } pl-4`}
            >
              <h3
                className={`font-bold text-xl ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {exp.company}
              </h3>
              <p
                className={`${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                } mb-2`}
              >
                {exp.position}
              </p>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                } mb-4`}
              >
                {exp.period}
              </p>
              <ul className="list-disc list-inside">
                {exp.responsibilities.map((resp, respIndex) => (
                  <li
                    key={respIndex}
                    className={isDarkMode ? "text-gray-300" : "text-gray-700"}
                  >
                    {resp}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
