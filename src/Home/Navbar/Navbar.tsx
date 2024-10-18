// import React, { useState } from "react";
// import "./Animated.css";
// import { useAppDispatch, useAppSelector } from "../../redux/feature/hooks";
// import { logout, useCurrentUser } from "../../redux/feature/authSlice";

// const Navbar: React.FC = () => {
//   const user = useAppSelector(useCurrentUser);
//   const dispatch = useAppDispatch();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };
//   const handleLogout = () => {
//     dispatch(logout());
//   };

//   return (
//     <nav className="flex flex-wrap items-center justify-between p-2 bg-black">
//       <h1 className="text-2xl md:text-2xl font-bold animated-gradient-text">
//         E-Learning Experience
//       </h1>

//       <div className="flex md:hidden">
//         <button onClick={toggleMenu} aria-label="Toggle Menu">
//           {!isMenuOpen ? (
//             <img
//               className="block bg-white"
//               src="https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png"
//               width="48"
//               height="48"
//               alt="Open Menu"
//             />
//           ) : (
//             <img
//               className="block bg-white"
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
//         } w-full md:w-auto md:flex text-right text-bold mt-5 md:mt-0 md:border-none`}
//       >
//         <a
//           href="/"
//           className="block md:inline-block text-white font-semibold hover:text-teal-500 px-3 py-3 md:border-none"
//         >
//           Home
//         </a>

//         <a
//           href="#"
//           className="block md:inline-block text-white font-semibold hover:text-teal-500 px-3 py-3 md:border-none"
//         >
//           Cart
//         </a>
//       </div>

//       {user ? (
//         <>
//           <div
//             className={`${
//               isMenuOpen ? "block" : "hidden"
//             } md:flex space-x-4 w-full md:w-auto mt-4 md:mt-0 text-right`}
//           >
//             <a
//               href="/dashboard"
//               className="block md:inline-block px-4 py-2 text-white bg-teal-900 hover:bg-teal-500 rounded md:rounded-none"
//             >
//               Dashboard
//             </a>
//             <button
//               onClick={handleLogout}
//               className="block md:inline-block px-4 py-2 text-white bg-teal-900 hover:bg-teal-500 rounded md:rounded-none"
//             >
//               Logout
//             </button>
//           </div>
//         </>
//       ) : (
//         <>
//           <div
//             className={`${
//               isMenuOpen ? "block" : "hidden"
//             } md:flex space-x-4 w-full md:w-auto mt-4 md:mt-0 text-right`}
//           >
//             <a
//               href="/login"
//               className="block md:inline-block px-4 py-2 text-white bg-teal-900 hover:bg-teal-500 rounded md:rounded-none"
//             >
//               Login
//             </a>
//             <a
//               href="/register"
//               className="block md:inline-block px-4 py-2 text-white bg-teal-900 hover:bg-teal-500 rounded md:rounded-none"
//             >
//               Register
//             </a>
//           </div>
//         </>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState } from "react";
import "./Animated.css";
import { useAppDispatch, useAppSelector } from "../../redux/feature/hooks";
import { logout, useCurrentUser } from "../../redux/feature/authSlice";
import { RootState } from "../../redux/feature/store";

const Navbar: React.FC = () => {
  const user = useAppSelector(useCurrentUser);
  const cartItems = useAppSelector((state: RootState) => state.cart.items); // Get cart items
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  // Calculate total number of items in the cart
  const totalItemsInCart = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

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
          href="/cart"
          className="block md:inline-block text-white font-semibold hover:text-teal-500 px-3 py-3 md:border-none"
        >
          Cart {totalItemsInCart > 0 && `(${totalItemsInCart})`}
        </a>
      </div>

      {user ? (
        <>
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } md:flex space-x-4 w-full md:w-auto mt-4 md:mt-0 text-right`}
          >
            <a
              href="/dashboard"
              className="block md:inline-block px-4 py-2 text-white bg-teal-900 hover:bg-teal-500 rounded md:rounded-none"
            >
              Dashboard
            </a>
            <button
              onClick={handleLogout}
              className="block md:inline-block px-4 py-2 text-white bg-teal-900 hover:bg-teal-500 rounded md:rounded-none"
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
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
        </>
      )}
    </nav>
  );
};

export default Navbar;
