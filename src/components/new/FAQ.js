import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/30">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex justify-between items-center text-left hover:opacity-80"
      >
        <span className="text-lg">{question}</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="pb-4 text-white/80 leading-relaxed">{answer}</div>
      )}
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "Where are you based?",
      answer: "I am currently based in Brooklyn, New York.",
    },
    {
      question: "Are you open to relocating?",
      answer:
        "Yes, I am open to relocating anywhere in the United States and even globally for the right opportunity.",
    },
    {
      question: "Can you build full-stack applications from scratch?",
      answer:
        "Yes, I have extensive experience building full-stack applications from the ground up. I've worked with various tech stacks including React.js + Node.js, Ruby on Rails, and React on Rails. Currently, I prefer working with Next.js for its powerful features and excellent developer experience.",
    },
    {
      question: "What is your preferred tech stack?",
      answer:
        "My preferred tech stack is Next.js for its robust features including server-side rendering, API routes, and excellent developer experience. I'm also well-versed in modern frontend technologies like React, Tailwind CSS, and TypeScript.",
    },
    {
      question: "What type of projects have you worked on?",
      answer:
        "I've worked on a diverse range of projects including e-commerce platforms, content management systems, real-time applications, and enterprise-level web applications. Each project has helped me develop a deep understanding of different business domains and technical challenges.",
    },
    {
      question: "Are you available for remote work?",
      answer:
        "Yes, I have extensive experience working remotely and am comfortable with remote collaboration tools and asynchronous communication.",
    },
  ];

  return (
    <div className="p-8 text-white">
      <header className="mb-16">
        <h1 className="text-2xl font-light tracking-wide mb-2">FAQ</h1>
        <p className="text-sm tracking-wide opacity-75">
          Frequently Asked Questions
        </p>
      </header>

      <div className="max-w-2xl space-y-2">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

export default FAQ;
