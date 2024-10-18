import { Outlet } from "react-router-dom";
import Navbar from "./Home/Navbar/Navbar";
import Footer from "./Home/Footer/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
