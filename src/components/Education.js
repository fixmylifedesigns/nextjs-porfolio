import { useTheme } from "../context/ThemeContext";

export default function Education() {
  const { isDarkMode } = useTheme();
  const education = [
    {
      school: "Bogota Bootcamp",
      course: "Ruby On Rails Course",
      period: "Jan. 2020 to Apr. 2020",
    },
    {
      school: "Lambda School",
      course: "Certificate of Completion Web Development & Computer Science",
      period: "Feb. 2019 to Sept. 2019",
    },
    {
      school: "New York Code + Design Academy",
      course: "Web Development Foundation",
      period: "May 2018 to June 2018",
    },
  ];

  return (
    <section className={`py-20 ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      <div className="container mx-auto px-6">
        <h2
          className={`text-3xl font-bold text-center mb-8 ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Education
        </h2>
        <div className="space-y-8">
          {education.map((edu, index) => (
            <div
              key={index}
              className={`rounded-lg shadow-md p-6 ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <h3
                className={`font-bold text-xl mb-2 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {edu.school}
              </h3>
              <p
                className={`mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {edu.course}
              </p>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {edu.period}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
