import React from "react";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="text-center p-6">
        {/* Animation for SVG with Tailwind CSS */}
        <div className="animate-bounce mb-6">
          <svg
            className="w-24 h-24 text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M9 1a1 1 0 011 1v8.293l3.646-3.647a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L8 10.293V2a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Main heading with animation */}
        <h1 className="text-5xl font-extrabold text-white mb-4 transition-all transform animate__animated animate__fadeInUp">
          Oops! Page Not Found
        </h1>
        <p className="text-xl text-white mb-8 opacity-70">
          Looks like you've ventured into unknown territory.
        </p>

        {/* Button with hover effect */}
        <button
          onClick={() => (window.location.href = "/")}
          className="px-8 py-3 bg-yellow-400 text-white text-lg font-bold rounded-full shadow-xl hover:bg-yellow-500 transform hover:scale-110 transition-all duration-300"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
