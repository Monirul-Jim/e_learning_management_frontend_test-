import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/feature/hooks";
import { RootState } from "../redux/feature/store";
import SuperUserDashboard from "./AdminDashboard/SuperUserDashboard/SuperUserDashboard";
import StudentDashBoard from "./StudentDashboard/StudentDashboard/StudentDashBoard";

const MainDashboard = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 h-screen">
      <div className="hidden lg:block lg:col-span-1 h-full bg-white shadow-lg p-4">
        {user?.is_superuser ? (
          <>
            <SuperUserDashboard />
          </>
        ) : (
          <>
            <StudentDashBoard />
          </>
        )}
      </div>

      <div className="lg:col-span-3 p-4 bg-gray-100">
        {/* Render additional sections for admin or student */}

        {/* Outlet renders nested routes */}
        <Outlet />
      </div>
      <div className="lg:hidden">
        <div className="fixed top-0 left-0 right-0 bg-gray-100 p-2 z-50">
          <button
            onClick={toggleDrawer}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Open Menu
          </button>
        </div>
        <div
          className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transition-transform transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Drawer Menu</h2>
            {user?.is_superuser ? (
              <>
                <SuperUserDashboard />
              </>
            ) : (
              <>
                <StudentDashBoard />
              </>
            )}
          </div>
          <button
            onClick={toggleDrawer}
            className="absolute top-4 right-4 text-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
