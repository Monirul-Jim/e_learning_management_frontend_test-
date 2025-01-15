const AboutSection = () => {
  return (
    <section className="py-16">
      <div className=" mx-auto text-center px-6">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-6">About Us</h2>
        <p className="text-gray-600 text-lg mb-12">
          Welcome to{" "}
          <span className="font-semibold text-blue-600">
            Our E-Learning Platform
          </span>
          , your go-to destination for quality online education. Empower
          yourself with knowledge through our interactive and engaging courses.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="bg-white shadow-lg p-6 rounded-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10l4.553 2.276a1 1 0 01.447.894v7.46a2 2 0 01-1.105 1.79l-5.89 2.945A4 4 0 0112 22v-7a2 2 0 00-2-2H5a2 2 0 01-2-2v-4a2 2 0 012-2h7a2 2 0 002-2V4a2 2 0 01.553-1.447L14.4 1.055A1 1 0 0115 1h3a1 1 0 011 1v4a2 2 0 01-2 2h-2"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Purchase a Course
            </h3>
            <p className="text-gray-600">
              Explore our curated catalog and select a course tailored to your
              goals.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="bg-white shadow-lg p-6 rounded-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 12v8m0-8H5.5a2.5 2.5 0 01-2.5-2.5v-3a2.5 2.5 0 012.5-2.5h11a2.5 2.5 0 012.5 2.5v3a2.5 2.5 0 01-2.5 2.5H16m0 0v8"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Watch Video Lessons
            </h3>
            <p className="text-gray-600">
              Access high-quality, on-demand video lessons anytime, anywhere.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="bg-white shadow-lg p-6 rounded-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10l4.553 2.276a1 1 0 01.447.894v7.46a2 2 0 01-1.105 1.79l-5.89 2.945A4 4 0 0112 22v-7a2 2 0 00-2-2H5a2 2 0 01-2-2v-4a2 2 0 012-2h7a2 2 0 002-2V4a2 2 0 01.553-1.447L14.4 1.055A1 1 0 0115 1h3a1 1 0 011 1v4a2 2 0 01-2 2h-2"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Take Quizzes
            </h3>
            <p className="text-gray-600">
              Reinforce your learning by taking engaging quizzes.
            </p>
          </div>
          {/* Feature 4 */}
          <div className="bg-white shadow-lg p-6 rounded-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Get Your Results
            </h3>
            <p className="text-gray-600">
              Receive instant feedback and track your progress easily.
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto  bg-white p-4  mt-10 w-60">
        <a
          href="#course"
          className="inline-block bg-blue-600 text-white text-lg font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:ring-4 focus:ring-blue-300 transition-all duration-300"
        >
          Purchase Course
        </a>
      </div>
    </section>
  );
};

export default AboutSection;
