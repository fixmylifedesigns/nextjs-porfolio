import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null },
  });

  const handleInput = (e) => {
    const field = e.target.id;
    const value = e.target.value;
    setFormData((form) => ({ ...form, [field]: value }));
    setStatus({
      submitted: false,
      submitting: false,
      info: { error: false, msg: null },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, // Replace with your EmailJS service ID
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: "Message sent successfully!" },
      });
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      setStatus({
        submitted: false,
        submitting: false,
        info: {
          error: true,
          msg: "An error occurred. Please try again later.",
        },
      });
    }
  };

  return (
    <section
      id="contact"
      className={`py-20 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
    >
      <div className="container mx-auto px-6">
        <h2
          className={`text-3xl font-bold text-center mb-8 ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Get in Touch
        </h2>
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className={`block mb-2 text-sm font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleInput}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className={`block mb-2 text-sm font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInput}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className={`block mb-2 text-sm font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleInput}
                rows="4"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                required
              />
            </div>
            {status.info.error && (
              <div className="text-red-500 text-sm">{status.info.msg}</div>
            )}
            {status.submitted && !status.info.error && (
              <div className="text-green-500 text-sm">{status.info.msg}</div>
            )}
            <button
              type="submit"
              disabled={status.submitting}
              className={`w-full py-2 px-4 rounded-md ${
                isDarkMode
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              } transition duration-300 ${
                status.submitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {status.submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
