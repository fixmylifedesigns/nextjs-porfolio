// src/components/ElevenLabsAgent.js
"use client";
import { useEffect } from 'react';
import { useTheme } from "../context/ThemeContext";

const ElevenLabsAgent = () => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    // Load the ElevenLabs Convai script
    const script = document.createElement('script');
    script.src = "https://elevenlabs.io/convai-widget/index.js";
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);

    // Cleanup function to remove the script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className={`elevenlabs-agent-container ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <elevenlabs-convai agent-id={process.env.NEXT_PUBLIC_ELEVEN_LABS}></elevenlabs-convai>
      
      <style jsx>{`
        .elevenlabs-agent-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
        }
        
        /* You can add custom styles for dark/light theme if needed */
        .dark-theme {
          /* Custom styles for dark theme */
        }
        
        .light-theme {
          /* Custom styles for light theme */
        }
      `}</style>
    </div>
  );
};

export default ElevenLabsAgent;