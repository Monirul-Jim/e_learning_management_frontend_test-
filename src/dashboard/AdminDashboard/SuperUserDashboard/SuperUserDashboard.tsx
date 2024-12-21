// // const SuperUserDashboard = () => {
// //   return (
// //     <div>
// //       <h2 className="text-xl font-semibold mb-4">Superuser Dashboard</h2>
// //       <ul>
// //         <li>
// //           <a
// //             href="/dashboard/add-course"
// //             className="text-gray-800 hover:text-blue-500"
// //           >
// //             Add Course
// //           </a>
// //         </li>
// //         <li>
// //           <a
// //             href="/dashboard/manage-users"
// //             className="text-gray-800 hover:text-blue-500"
// //           >
// //             Manage Users
// //           </a>
// //         </li>
// //         <li>
// //           <a href="/" className="text-gray-800 hover:text-blue-500">
// //             Home
// //           </a>
// //         </li>
// //         {/* Add other superuser specific as here */}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default SuperUserDashboard;
// import { useLocation } from "react-router-dom";

// const SuperUserDashboard = () => {
//   const location = useLocation();

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">Superuser Dashboard</h2>
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
//             href="/dashboard/add-category"
//             className={`text-gray-800 hover:text-blue-500 ${
//               location.pathname === "/dashboard/add-category" ? "font-bold" : ""
//             }`}
//           >
//             Add Category
//           </a>
//         </li>
//         <li>
//           <a
//             href="/dashboard/add-course"
//             className={`text-gray-800 hover:text-blue-500 ${
//               location.pathname === "/dashboard/add-course" ? "font-bold" : ""
//             }`}
//           >
//             Add Course
//           </a>
//         </li>
//         <li>
//           <a
//             href="/dashboard/add-parent-module"
//             className={`text-gray-800 hover:text-blue-500 ${
//               location.pathname === "/dashboard/add-parent-module"
//                 ? "font-bold"
//                 : ""
//             }`}
//           >
//             Add Parent Module
//           </a>
//         </li>
//         <li>
//           <a
//             href="/dashboard/add-module"
//             className={`text-gray-800 hover:text-blue-500 ${
//               location.pathname === "/dashboard/add-module" ? "font-bold" : ""
//             }`}
//           >
//             Add Module
//           </a>
//         </li>
//         <li>
//           <a
//             href="/dashboard/add-video"
//             className={`text-gray-800 hover:text-blue-500 ${
//               location.pathname === "/dashboard/add-video" ? "font-bold" : ""
//             }`}
//           >
//             Add Video
//           </a>
//         </li>
//         <li>
//           <a
//             href="/"
//             className={`text-gray-800 hover:text-blue-500 ${
//               location.pathname === "/" ? "font-bold" : ""
//             }`}
//           >
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
    <div className="bg-white shadow-md  min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Admin Dashboard
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
            href="/dashboard/add-category"
            className={`block px-4 py-2 rounded-md text-gray-700 hover:bg-blue-500 hover:text-white ${
              location.pathname === "/dashboard/add-category"
                ? "bg-blue-500 text-white"
                : ""
            }`}
          >
            Add Category
          </a>
        </li>
        <li>
          <a
            href="/dashboard/add-course"
            className={`block px-4 py-2 rounded-md text-gray-700 hover:bg-blue-500 hover:text-white ${
              location.pathname === "/dashboard/add-course"
                ? "bg-blue-500 text-white"
                : ""
            }`}
          >
            Add Course
          </a>
        </li>
        <li>
          <a
            href="/dashboard/add-parent-module"
            className={`block px-4 py-2 rounded-md text-gray-700 hover:bg-blue-500 hover:text-white ${
              location.pathname === "/dashboard/add-parent-module"
                ? "bg-blue-500 text-white"
                : ""
            }`}
          >
            Add Parent Module
          </a>
        </li>
        <li>
          <a
            href="/dashboard/add-module"
            className={`block px-4 py-2 rounded-md text-gray-700 hover:bg-blue-500 hover:text-white ${
              location.pathname === "/dashboard/add-module"
                ? "bg-blue-500 text-white"
                : ""
            }`}
          >
            Add Module
          </a>
        </li>
        <li>
          <a
            href="/dashboard/add-video"
            className={`block px-4 py-2 rounded-md text-gray-700 hover:bg-blue-500 hover:text-white ${
              location.pathname === "/dashboard/add-video"
                ? "bg-blue-500 text-white"
                : ""
            }`}
          >
            Add Video
          </a>
        </li>
        <li>
          <a
            href="/dashboard/add-quiz"
            className={`block px-4 py-2 rounded-md text-gray-700 hover:bg-blue-500 hover:text-white ${
              location.pathname === "/dashboard/add-quiz"
                ? "bg-blue-500 text-white"
                : ""
            }`}
          >
            Add Quiz
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

export default SuperUserDashboard;
