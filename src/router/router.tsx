import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Authectication/Login";
import SignUp from "../Authectication/SignUp";
import MainDashboard from "../dashboard/MainDashboard";
import AddCourse from "../dashboard/AdminDashboard/AddCourse/AddCourse";
import AddCategory from "../dashboard/AdminDashboard/AddCategory/AddCategory";
import UpdateCourse from "../dashboard/AdminDashboard/UpdateCourse/UpdateCourse";
import Cart from "../Cart/Cart";
import Home from "../Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <SignUp />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <MainDashboard />,
    children: [
      // {
      //   path: "",
      //   element: <Navigate to="add-course" />,
      // },
      {
        path: "add-course",
        element: <AddCourse />,
      },
      {
        path: "add-category",
        element: <AddCategory />,
      },
      {
        path: "update-course/:id",
        element: <UpdateCourse />,
      },
    ],
  },
]);
export default router;
