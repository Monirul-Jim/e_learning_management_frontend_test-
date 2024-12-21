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
import StudentViewCourse from "../dashboard/StudentDashboard/StudentViewCourse/StudentViewCourse";
import AddParentModule from "../dashboard/AdminDashboard/AddParentModule/AddParentModule";
import AddModule from "../dashboard/AdminDashboard/AddModule/AddModule";
import AddVideo from "../dashboard/AdminDashboard/AddVideo/AddVideo";
import SeeClass from "../dashboard/StudentDashboard/SeeClass/SeeClass";
import Information from "../dashboard/Information";
import AddQuiz from "../dashboard/AdminDashboard/AddQuiz/AddQuiz";
import NotFoundPage from "../components/NotFoundPage/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFoundPage />,
  },
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
        path: "",
        element: <Information />,
      },
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
      {
        path: "view-courses",
        element: <StudentViewCourse />,
      },
      {
        path: "add-parent-module",
        element: <AddParentModule />,
      },
      {
        path: "add-module",
        element: <AddModule />,
      },
      {
        path: "add-video",
        element: <AddVideo />,
      },
      {
        path: "add-quiz",
        element: <AddQuiz />,
      },
      {
        path: "see-class/:id",
        element: <SeeClass />,
      },
    ],
  },
]);
export default router;
