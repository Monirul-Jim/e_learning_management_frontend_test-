const AdminExtraSection = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Welcome Section */}
      <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-3xl font-bold mb-2">Welcome to Admin Dashboard</h1>
        <p className="text-lg">
          Manage courses, assignments, users, and more efficiently.
        </p>
      </div>

      {/* Admin Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Manage Users */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Manage Users
          </h2>
          <p className="text-gray-600">Add, edit, or remove platform users.</p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            View Users
          </button>
        </div>

        {/* Manage Courses */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Manage Courses
          </h2>
          <p className="text-gray-600">Create and update course details.</p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            View Courses
          </button>
        </div>

        {/* Manage Assignments */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Manage Assignments
          </h2>
          <p className="text-gray-600">
            Assign, update, or delete assignments.
          </p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            View Assignments
          </button>
        </div>
      </div>

      {/* New Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* View Reports */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            View Reports
          </h2>
          <p className="text-gray-600">
            View detailed reports on user activity and platform performance.
          </p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            View Reports
          </button>
        </div>

        {/* Manage Notifications */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Manage Notifications
          </h2>
          <p className="text-gray-600">
            Send important notifications to users about courses, deadlines, etc.
          </p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Manage Notifications
          </button>
        </div>

        {/* Admin Settings */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Admin Settings
          </h2>
          <p className="text-gray-600">
            Modify platform settings such as themes, user permissions, etc.
          </p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminExtraSection;
