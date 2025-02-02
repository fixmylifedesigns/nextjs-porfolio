import { useTheme } from '../context/ThemeContext';

export default function Skills() {
  const { isDarkMode } = useTheme();
  const skills = [
    "JavaScript ES5/ES6", "React.js", "Node.js", "Next.js", "Angular",
    "Python", "Ruby on Rails", "SQL Databases", "RESTful APIs",
    "Git & GitHub", "Agile Development"
  ];

  return (
    <section id="skills" className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto px-6">
        <h2 className={`text-3xl font-bold text-center mb-8 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Skills</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill, index) => (
            <span key={index} className={`px-3 py-1 rounded-full text-sm ${
              isDarkMode 
                ? 'bg-gray-700 text-white' 
                : 'bg-gray-200 text-gray-800'
            }`}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}