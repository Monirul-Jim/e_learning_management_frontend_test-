// const SuperUserDashboard = () => {
//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">Superuser Dashboard</h2>
//       <ul>
//         <li>
//           <a
//             href="/dashboard/add-course"
//             className="text-gray-800 hover:text-blue-500"
//           >
//             Add Course
//           </a>
//         </li>
//         <li>
//           <a
//             href="/dashboard/manage-users"
//             className="text-gray-800 hover:text-blue-500"
//           >
//             Manage Users
//           </a>
//         </li>
//         <li>
//           <a href="/" className="text-gray-800 hover:text-blue-500">
//             Home
//           </a>
//         </li>
//         {/* Add other superuser specific as here */}
//       </ul>
//     </div>
//   );
// };

// export default SuperUserDashboard;
import { useLocation } from "react-router-dom";

const SuperUserDashboard = () => {
  const location = useLocation();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Superuser Dashboard</h2>
      <ul>
        <li>
          <a
            href="/dashboard/add-category"
            className={`text-gray-800 hover:text-blue-500 ${
              location.pathname === "/dashboard/add-category" ? "font-bold" : ""
            }`}
          >
            Add Category
          </a>
        </li>
        <li>
          <a
            href="/dashboard/add-course"
            className={`text-gray-800 hover:text-blue-500 ${
              location.pathname === "/dashboard/add-course" ? "font-bold" : ""
            }`}
          >
            Add Course
          </a>
        </li>
        <li>
          <a
            href="/dashboard/add-parent-module"
            className={`text-gray-800 hover:text-blue-500 ${
              location.pathname === "/dashboard/add-parent-module"
                ? "font-bold"
                : ""
            }`}
          >
            Add Parent Module
          </a>
        </li>
        <li>
          <a
            href="/dashboard/add-module"
            className={`text-gray-800 hover:text-blue-500 ${
              location.pathname === "/dashboard/add-module" ? "font-bold" : ""
            }`}
          >
            Add Module
          </a>
        </li>
        <li>
          <a
            href="/dashboard/add-video"
            className={`text-gray-800 hover:text-blue-500 ${
              location.pathname === "/dashboard/add-video" ? "font-bold" : ""
            }`}
          >
            Add Video
          </a>
        </li>
        <li>
          <a
            href="/"
            className={`text-gray-800 hover:text-blue-500 ${
              location.pathname === "/" ? "font-bold" : ""
            }`}
          >
            Home
          </a>
        </li>
        {/* Add other superuser specific as here */}
      </ul>
    </div>
  );
};

export default SuperUserDashboard;
