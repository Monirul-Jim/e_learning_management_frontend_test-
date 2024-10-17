import { Outlet } from "react-router-dom";
import Navbar from "./Home/Navbar/Navbar";
import Home from "./Home/Home";

function App() {
  return (
    <>
      <Navbar />
      <Home />
      <Outlet />
    </>
  );
}

export default App;
