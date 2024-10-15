import { Outlet } from "react-router-dom";
import Navbar from "./Home/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
