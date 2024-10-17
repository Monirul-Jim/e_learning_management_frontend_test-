import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Authectication/Login";
import SignUp from "../Authectication/SignUp";
import MainDashboard from "../dashboard/MainDashboard";
import AddCourse from "../dashboard/AdminDashboard/AddCourse/AddCourse";
import AddCategory from "../dashboard/AdminDashboard/AddCategory/AddCategory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <MainDashboard />,
    children: [
      {
        path: "add-course",
        element: <AddCourse />,
      },
      {
        path: "add-category",
        element: <AddCategory />,
      },
    ],
  },
]);
export default router;
