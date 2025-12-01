
// import { useLocation } from "react-router-dom";

// const SuperUserDashboard = () => {
//   const location = useLocation();

//   return (
//     <div className="bg-white shadow-md  min-h-screen">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-6">
//         Admin Dashboard
//       </h2>
//       <ul className="space-y-4">
//         <li>
//           <a
//             href="/dashboard"
//             className={`block px-4 py-2 rounded-md text-gray-700 hover:bg-blue-500 hover:text-white ${
//               location.pathname === "/dashboard" ? "bg-blue-500 text-white" : ""
//             }`}
//           >
//             Dashboard
//           </a>
//         </li>
//         <li>
//           <a
//             href="/dashboard/add-category"
//             className={`block px-4 py-2 rounded-md text-gray-700 hover:bg-blue-500 hover:text-white ${
//               location.pathname === "/dashboard/add-category"
//                 ? "bg-blue-500 text-white"
//                 : ""
//             }`}
//           >
//             Add Category
//           </a>
//         </li>
//         <li>
//           <a
//             href="/dashboard/add-course"
//             className={`block px-4 py-2 rounded-md text-gray-700 hover:bg-blue-500 hover:text-white ${
//               location.pathname === "/dashboard/add-course"
//                 ? "bg-blue-500 text-white"
//                 : ""
//             }`}
//           >
//             Add Course
//           </a>
//         </li>
//         <li>
//           <a
//             href="/dashboard/add-parent-module"
//             className={`block px-4 py-2 rounded-md text-gray-700 hover:bg-blue-500 hover:text-white ${
//               location.pathname === "/dashboard/add-parent-module"
//                 ? "bg-blue-500 text-white"
//                 : ""
//             }`}
//           >
//             Add Parent Module
//           </a>
//         </li>
//         <li>
//           <a
//             href="/dashboard/add-module"
//             className={`block px-4 py-2 rounded-md text-gray-700 hover:bg-blue-500 hover:text-white ${
//               location.pathname === "/dashboard/add-module"
//                 ? "bg-blue-500 text-white"
//                 : ""
//             }`}
//           >
//             Add Module
//           </a>
//         </li>
//         <li>
//           <a
//             href="/dashboard/add-video"
//             className={`block px-4 py-2 rounded-md text-gray-700 hover:bg-blue-500 hover:text-white ${
//               location.pathname === "/dashboard/add-video"
//                 ? "bg-blue-500 text-white"
//                 : ""
//             }`}
//           >
//             Add Video
//           </a>
//         </li>
//         <li>
//           <a
//             href="/dashboard/add-quiz"
//             className={`block px-4 py-2 rounded-md text-gray-700 hover:bg-blue-500 hover:text-white ${
//               location.pathname === "/dashboard/add-quiz"
//                 ? "bg-blue-500 text-white"
//                 : ""
//             }`}
//           >
//             Add Quiz
//           </a>
//         </li>
//         <li>
//           <a
//             href="/"
//             className={`block px-4 py-2 rounded-md text-gray-700 hover:bg-blue-500 hover:text-white ${
//               location.pathname === "/" ? "bg-blue-500 text-white" : ""
//             }`}
//           >
//             Home
//           </a>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default SuperUserDashboard;
import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Folders,
  BookOpen,
  Box,
  Component,
  Video,
  ClipboardList,
  Home,
} from "lucide-react";

const SuperUserDashboard = () => {
  const location = useLocation();

  const navItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      path: "/dashboard/add-category",
      label: "Add Category",
      icon: Folders,
    },
    {
      path: "/dashboard/add-course",
      label: "Add Course",
      icon: BookOpen,
    },
    {
      path: "/dashboard/add-parent-module",
      label: "Add Parent Module",
      icon: Box,
    },
    {
      path: "/dashboard/add-module",
      label: "Add Module",
      icon: Component,
    },
    {
      path: "/dashboard/add-video",
      label: "Add Video",
      icon: Video,
    },
    {
      path: "/dashboard/add-quiz",
      label: "Add Quiz",
      icon: ClipboardList,
    },
    {
      path: "/",
      label: "Home",
      icon: Home,
    },
  ];

  return (
    <div className="min-h-full p-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 border-b pb-4">
        Admin Portal
      </h2>
      <ul className="space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ease-in-out ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SuperUserDashboard;