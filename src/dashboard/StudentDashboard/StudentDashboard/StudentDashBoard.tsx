const StudentDashBoard = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">User Dashboard</h2>
      {/* Normal user specific menu */}
      <ul>
        <li>
          <a
            href="/dashboard/view-courses"
            className="text-gray-800 hover:text-blue-500"
          >
            View Courses
          </a>
        </li>
        <li>
          <a href="/" className="text-gray-800 hover:text-blue-500">
            Home
          </a>
        </li>
      </ul>
    </div>
  );
};

export default StudentDashBoard;
