// const StudentDashBoard = () => {
//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">User Dashboard</h2>
//       {/* Normal user specific menu */}
//       <ul>
//         <li>
//           <a
//             href="/dashboard"
//             className={`text-gray-800 hover:text-blue-500 ${
//               location.pathname === "/dashboard" ? "font-bold" : ""
//             }`}
//           >
//             Dashboard
//           </a>
//         </li>
//         <li>
//           <a
//             href="/dashboard/view-courses"
//             className="text-gray-800 hover:text-blue-500"
//           >
//             View Courses
//           </a>
//         </li>
//         <li>
//           <a href="/" className="text-gray-800 hover:text-blue-500">
//             Home
//           </a>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default StudentDashBoard;
import { useLocation } from "react-router-dom";

const StudentDashBoard = () => {
  const location = useLocation();

  return (
    <div className="bg-white shadow-md   min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Student Dashboard
      </h2>
      <ul className="space-y-4">
        <li>
          <a
            href="/dashboard"
            className={`block px-4 py-2 rounded-md text-gray-700 hover:bg-blue-500 hover:text-white ${
              location.pathname === "/dashboard" ? "bg-blue-500 text-white" : ""
            }`}
          >
            Dashboard
          </a>
        </li>
        <li>
          <a
            href="/dashboard/view-courses"
            className={`block px-4 py-2 rounded-md text-gray-700 hover:bg-blue-500 hover:text-white ${
              location.pathname === "/dashboard/view-courses"
                ? "bg-blue-500 text-white"
                : ""
            }`}
          >
            View Courses
          </a>
        </li>
        <li>
          <a
            href="/"
            className={`block px-4 py-2 rounded-md text-gray-700 hover:bg-blue-500 hover:text-white ${
              location.pathname === "/" ? "bg-blue-500 text-white" : ""
            }`}
          >
            Home
          </a>
        </li>
      </ul>
    </div>
  );
};

export default StudentDashBoard;
