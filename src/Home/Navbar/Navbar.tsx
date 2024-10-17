// import React, { useState } from "react";
// import "./Animated.css";
// const Navbar: React.FC = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };
//   return (
//     <nav className="flex flex-wrap items-center justify-between p-2 bg-black ">
//       <h1 className="text-2xl md:text-2xl font-bold animated-gradient-text">
//         E-Learning Experience
//       </h1>
//       <div className="flex md:hidden">
//         <button onClick={toggleMenu} aria-label="Toggle Menu">
//           {!isMenuOpen ? (
//             <img
//               className="block  bg-white"
//               src="https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png"
//               width="48"
//               height="48"
//               alt="Open Menu"
//             />
//           ) : (
//             <img
//               className="block  bg-white"
//               src="https://img.icons8.com/fluent-systems-regular/2x/close-window.png"
//               width="48"
//               height="48"
//               alt="Close Menu"
//             />
//           )}
//         </button>
//       </div>
//       <div
//         className={`${
//           isMenuOpen ? "block" : "hidden"
//         } w-full md:w-auto md:flex text-right text-bold mt-5 md:mt-0  md:border-none`}
//       >
//         <a
//           href="/"
//           className="block md:inline-block text-white font-semibold hover:text-teal-500 px-3 py-3  md:border-none"
//         >
//           Home
//         </a>
//         <a
//           href="#"
//           className="block md:inline-block text-white font-semibold hover:text-teal-500 px-3 py-3  md:border-none"
//         >
//           Products
//         </a>
//         <a
//           href="#"
//           className="block md:inline-block text-white font-semibold hover:text-teal-500 px-3 py-3  md:border-none"
//         >
//           Pricing
//         </a>
//         <a
//           href="#"
//           className="block md:inline-block text-white font-semibold hover:text-teal-500 px-3 py-3  md:border-none"
//         >
//           Contact
//         </a>
//       </div>
//       <a
//         href="/login"
//         className={`${
//           isMenuOpen ? "block" : "hidden"
//         } md:flex w-full md:w-auto px-4 py-2 text-right bg-teal-900 hover:bg-teal-500 text-white md:rounded`}
//       >
//         Login
//       </a>
//       <a
//         href="/register"
//         className={`${
//           isMenuOpen ? "block" : "hidden"
//         } md:flex w-full md:w-auto px-4 py-2 text-right bg-teal-900 hover:bg-teal-500 text-white md:rounded`}
//       >
//         Register
//       </a>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState } from "react";
import "./Animated.css";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex flex-wrap items-center justify-between p-2 bg-black">
      <h1 className="text-2xl md:text-2xl font-bold animated-gradient-text">
        E-Learning Experience
      </h1>

      <div className="flex md:hidden">
        <button onClick={toggleMenu} aria-label="Toggle Menu">
          {!isMenuOpen ? (
            <img
              className="block bg-white"
              src="https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png"
              width="48"
              height="48"
              alt="Open Menu"
            />
          ) : (
            <img
              className="block bg-white"
              src="https://img.icons8.com/fluent-systems-regular/2x/close-window.png"
              width="48"
              height="48"
              alt="Close Menu"
            />
          )}
        </button>
      </div>

      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } w-full md:w-auto md:flex text-right text-bold mt-5 md:mt-0 md:border-none`}
      >
        <a
          href="/"
          className="block md:inline-block text-white font-semibold hover:text-teal-500 px-3 py-3 md:border-none"
        >
          Home
        </a>
        <a
          href="#"
          className="block md:inline-block text-white font-semibold hover:text-teal-500 px-3 py-3 md:border-none"
        >
          Products
        </a>
        <a
          href="#"
          className="block md:inline-block text-white font-semibold hover:text-teal-500 px-3 py-3 md:border-none"
        >
          Pricing
        </a>
        <a
          href="#"
          className="block md:inline-block text-white font-semibold hover:text-teal-500 px-3 py-3 md:border-none"
        >
          Contact
        </a>
      </div>

      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:flex space-x-4 w-full md:w-auto mt-4 md:mt-0 text-right`}
      >
        <a
          href="/login"
          className="block md:inline-block px-4 py-2 text-white bg-teal-900 hover:bg-teal-500 rounded md:rounded-none"
        >
          Login
        </a>
        <a
          href="/register"
          className="block md:inline-block px-4 py-2 text-white bg-teal-900 hover:bg-teal-500 rounded md:rounded-none"
        >
          Register
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
