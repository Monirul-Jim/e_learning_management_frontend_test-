const StudentExtraSection = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Welcome Section */}
      <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-3xl font-bold mb-2">
          Welcome to Student Dashboard
        </h1>
        <p className="text-lg">
          Access your courses, assignments, and prepare for exams.
        </p>
      </div>

      {/* Student Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Courses */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Your Courses
          </h2>
          <p className="text-gray-600">
            Access and manage your enrolled courses with ease.
          </p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            View Courses
          </button>
        </div>

        {/* Assignments */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Assignments
          </h2>
          <p className="text-gray-600">
            Stay on top of your assignments and submit them on time.
          </p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            View Assignments
          </button>
        </div>

        {/* Exams */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Exams</h2>
          <p className="text-gray-600">
            Prepare for upcoming exams and review past results.
          </p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            View Exams
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentExtraSection;
