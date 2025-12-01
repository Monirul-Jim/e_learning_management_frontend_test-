
// import { useLocation } from "react-router-dom";

// const StudentDashBoard = () => {
//   const location = useLocation();

//   return (
//     <div className="bg-white shadow-md   min-h-screen">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-6">
//         Student Dashboard
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
//             href="/dashboard/view-courses"
//             className={`block px-4 py-2 rounded-md text-gray-700 hover:bg-blue-500 hover:text-white ${
//               location.pathname === "/dashboard/view-courses"
//                 ? "bg-blue-500 text-white"
//                 : ""
//             }`}
//           >
//             View Courses
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

// export default StudentDashBoard;
import { useLocation, Link } from "react-router-dom";
import { LayoutDashboard, BookOpenCheck, Home } from "lucide-react";

const StudentDashBoard = () => {
  const location = useLocation();

  const navItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      path: "/dashboard/view-courses",
      label: "My Courses",
      icon: BookOpenCheck,
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
        Student Portal
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

export default StudentDashBoard;