'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Navigation({ showNav = true }: { showNav?: boolean }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  if (!showNav) return null;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed left-1/2 transform -translate-x-1/2 top-6 z-50 w-[85vw]"
    >
      <div 
        className="relative bg-gray-50/70 dark:bg-gray-900/70 backdrop-blur-sm px-12 py-3 rounded-full shadow-lg overflow-hidden w-full"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <motion.div
          className="absolute inset-0 -z-10"
          animate={{
            background: [
              "radial-gradient(circle at 0% 0%, rgba(200, 200, 200, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 100% 100%, rgba(200, 200, 200, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 0% 100%, rgba(200, 200, 200, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 100% 0%, rgba(200, 200, 200, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 0% 0%, rgba(200, 200, 200, 0.1) 0%, transparent 50%)",
            ]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        {isHovering && (
          <motion.div
            className="absolute pointer-events-none bg-gradient-to-r from-gray-400/30 to-gray-500/30 dark:from-gray-600/40 dark:to-gray-700/40 rounded-full blur-2xl"
            animate={{
              x: mousePosition.x - 100,
              y: mousePosition.y - 42,
            }}
            transition={{
              type: "spring",
              damping: 15,
              stiffness: 200,
              mass: 0.8,
            }}
            style={{
              width: "90px",
              height: "90px",
            }}
          />
        )}
        <div className="flex items-center justify-between relative">
          <div className="flex items-center space-x-8">
            <a href="#about" className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">About</a>
            <a href="#projects" className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">Projects</a>
            <a href="#experience" className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">Experience</a>
            <a href="#contact" className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">Contact</a>
          </div>
          
          <div className="flex items-center space-x-5">
            <a 
              href="/resume.pdf" 
              target="_blank"
              className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors font-medium"
            >
              Resume
            </a>
            <a
              href="https://github.com/BraydonJhnstn"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-110 transition-transform text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>

            <a
              href="https://linkedin.com/in/BraydonJohnston"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-110 transition-transform text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>

            <a
              href="https://x.com/BraydonJhnstn"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-110 transition-transform text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            <a
              href="https://instagram.com/johnstbray"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-110 transition-transform text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
} 