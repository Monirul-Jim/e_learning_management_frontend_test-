import { useState } from "react";
import { Outlet } from "react-router-dom";

const MainDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 h-screen">
      <div className="hidden lg:block lg:col-span-1 h-full bg-white shadow-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Menu</h2>
        <ul className="space-y-4">
          <li>
            <a
              href="/dashboard/add-course"
              className="text-gray-800 hover:text-blue-500"
            >
              Add Course
            </a>
          </li>
          <li>
            <a
              href="/dashboard/add-category"
              className="text-gray-800 hover:text-blue-500"
            >
              Category
            </a>
          </li>
          <li>
            <a href="/" className="text-gray-800 hover:text-blue-500">
              Home
            </a>
          </li>
        </ul>
      </div>

      <div className="lg:col-span-3 p-4 bg-gray-100">
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
            <ul className="space-y-4">
              <li>
                <a
                  href="/dashboard/add-course"
                  className="text-gray-800 hover:text-blue-500"
                >
                  Add Course
                </a>
              </li>
              <li>
                <a
                  href="/dashboard/add-category"
                  className="text-gray-800 hover:text-blue-500"
                >
                  Category
                </a>
              </li>
            </ul>
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
