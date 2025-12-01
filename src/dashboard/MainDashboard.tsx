// import { useState } from "react";
// import { Outlet } from "react-router-dom";
// import { useAppSelector } from "../redux/feature/hooks";
// import {type RootState } from "../redux/feature/store";
// import SuperUserDashboard from "./AdminDashboard/SuperUserDashboard/SuperUserDashboard";
// import StudentDashBoard from "./StudentDashboard/StudentDashboard/StudentDashBoard";

// const MainDashboard = () => {
//   const user = useAppSelector((state: RootState) => state.auth.user);
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDrawer = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-4 h-screen">
//       <div className="hidden lg:block lg:col-span-1 h-full bg-white shadow-lg p-4">
//         {user?.is_superuser ? (
//           <>
//             <SuperUserDashboard />
//           </>
//         ) : (
//           <>
//             <StudentDashBoard />
//           </>
//         )}
//       </div>

//       <div className="lg:col-span-3 p-4 bg-gray-100">
//         {/* Render additional sections for admin or student */}

//         {/* Outlet renders nested routes */}
//         <Outlet />
//       </div>
//       <div className="lg:hidden">
//         <div className="fixed top-0 left-0 right-0 bg-gray-100 p-2 z-50">
//           <button
//             onClick={toggleDrawer}
//             className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
//           >
//             Open Menu
//           </button>
//         </div>
//         <div
//           className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transition-transform transform ${
//             isOpen ? "translate-x-0" : "-translate-x-full"
//           }`}
//         >
//           <div className="p-4">
//             <h2 className="text-xl font-semibold mb-4">Drawer Menu</h2>
//             {user?.is_superuser ? (
//               <>
//                 <SuperUserDashboard />
//               </>
//             ) : (
//               <>
//                 <StudentDashBoard />
//               </>
//             )}
//           </div>
//           <button
//             onClick={toggleDrawer}
//             className="absolute top-4 right-4 text-gray-600"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MainDashboard;
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/feature/hooks";
import { type RootState } from "../redux/feature/store";
import SuperUserDashboard from "./AdminDashboard/SuperUserDashboard/SuperUserDashboard";
import StudentDashBoard from "./StudentDashboard/StudentDashboard/StudentDashBoard";
import { Menu, X } from "lucide-react";

const MainDashboard = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const DashboardComponent = user?.is_superuser ? SuperUserDashboard : StudentDashBoard;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 h-screen bg-gray-50">
      {/* --- Sidebar (Desktop) --- */}
      <div className="hidden lg:block lg:col-span-1 h-full bg-white border-r border-gray-100 shadow-xl">
        <DashboardComponent />
      </div>

      {/* --- Main Content Area --- */}
      <div className="lg:col-span-3 p-6 overflow-y-auto">
        {/* Mobile Header/Menu Button */}
        <div className="lg:hidden sticky top-0 bg-white p-4 mb-4 border-b shadow-md z-40">
          <button
            onClick={toggleDrawer}
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
            <span className="font-semibold">Menu</span>
          </button>
        </div>

        {/* Outlet renders nested routes */}
        <div className="mt-4 lg:mt-0">
          <Outlet />
        </div>
      </div>

      {/* --- Mobile Drawer --- */}
      <div className="lg:hidden">
        {/* Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={toggleDrawer}
            aria-hidden="true"
          ></div>
        )}
        
        <div
          className={`fixed top-0 left-0 w-64 h-full bg-white shadow-2xl z-50 transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 relative">
            {/* Close Button */}
            <button
              onClick={toggleDrawer}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-1"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="mt-8">
                {/* Render the appropriate dashboard component inside the drawer */}
                <DashboardComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;