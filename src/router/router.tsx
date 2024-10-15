import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Authectication/Login";
import SignUp from "../Authectication/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
        children: [
            
        {
            path: '/login',
            element:<Login/>
            },
            {
                path: '/register',
                element:<SignUp/>
            }
        
        ],
  },
]);
export default router;
