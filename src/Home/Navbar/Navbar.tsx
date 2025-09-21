"use client";
import { motion } from "framer-motion";
import { Menu, X, ShoppingCart, User, LogOut, BookOpen } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { useAppDispatch, useAppSelector } from "../../redux/feature/hooks";
import { logout, useCurrentUser } from "../../redux/feature/authSlice";
import type { RootState } from "../../redux/feature/store";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useAppSelector(useCurrentUser);
  const cartItems = useAppSelector((state: RootState) => state.cart.items); // Get cart items

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "#courses" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  // Calculate total items in cart
  const totalItemsInCart = cartItems.reduce(
    (acc: number, item: any) => acc + (item.quantity || 1),
    0
  );

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/10 backdrop-blur-xl border-b border-border/20"
    >
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/5 via-background/10 to-background/5"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo - Enhanced with gradient */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex-shrink-0"
          >
            <motion.h1
              className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              TechFest
            </motion.h1>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-4 xl:space-x-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{
                    y: -2,
                    textShadow: "0 0 8px rgba(255,255,255,0.8)",
                  }}
                  className="text-foreground/90 hover:text-primary transition-all duration-300 px-2 xl:px-4 py-2 rounded-lg hover:bg-accent/20 backdrop-blur-sm relative overflow-hidden group text-sm xl:text-base"
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.a>
              ))}
            </div>
          </nav>

          {/* Cart & Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <Button
                variant="ghost"
                size="sm"
                className="relative hover:bg-accent/20 backdrop-blur-sm"
                asChild
              >
                <a href="/cart" className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="hidden sm:inline">Cart</span>
                  {totalItemsInCart > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {totalItemsInCart}
                    </Badge>
                  )}
                </a>
              </Button>
            </motion.div>

            {/* Auth Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center space-x-2"
            >
              {user ? (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-accent/20 backdrop-blur-sm"
                    asChild
                  >
                    <a href="/dashboard" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span className="hidden sm:inline">Dashboard</span>
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="hover:bg-destructive/20 hover:text-destructive backdrop-blur-sm"
                  >
                    <LogOut className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Logout</span>
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-accent/20 backdrop-blur-sm"
                    asChild
                  >
                    <a href="/login">Login</a>
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300"
                    asChild
                  >
                    <a href="/register">Register</a>
                  </Button>
                </div>
              )}
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:bg-accent/20 backdrop-blur-sm p-2"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden backdrop-blur-xl bg-background/20 rounded-lg mt-2 border border-border/20 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-3">
              {/* Navigation Links */}
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground/90 hover:text-primary block px-4 py-3 rounded-lg hover:bg-accent/20 transition-colors backdrop-blur-sm text-base"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}

              {/* Cart Link */}
              <a
                href="/cart"
                className="text-foreground/90 hover:text-primary block px-4 py-3 rounded-lg hover:bg-accent/20 transition-colors backdrop-blur-sm text-base flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart className="h-4 w-4" />
                Cart {totalItemsInCart > 0 && `(${totalItemsInCart})`}
              </a>

              <div className="border-t border-border/50 pt-4 mt-4 space-y-2">
                {user ? (
                  <>
                    <Button
                      className="w-full justify-start bg-primary/10 hover:bg-primary/20 text-primary border-primary/30"
                      variant="outline"
                      asChild
                    >
                      <a href="/dashboard" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Dashboard
                      </a>
                    </Button>
                    <Button
                      className="w-full justify-start hover:bg-destructive/20 hover:text-destructive"
                      variant="outline"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="w-full" variant="outline" asChild>
                      <a href="/login">Login</a>
                    </Button>
                    <Button
                      className="w-full bg-gradient-to-r from-primary to-primary/80"
                      asChild
                    >
                      <a href="/register">Register</a>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
// import React, { useState } from "react";
// import "./Animated.css";
// import { useAppDispatch, useAppSelector } from "../../redux/feature/hooks";
// import { logout, useCurrentUser } from "../../redux/feature/authSlice";
// import { type RootState } from "../../redux/feature/store";

// const Navbar: React.FC = () => {
//   const user = useAppSelector(useCurrentUser);
//   const cartItems = useAppSelector((state: RootState) => state.cart.items); // Get cart items
//   const dispatch = useAppDispatch();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//   };

//   // Calculate total number of items in the cart
//   const totalItemsInCart = cartItems.reduce(
//     (acc, item) => acc + item.quantity,
//     0
//   );

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
//           href="/cart"
//           className="block md:inline-block text-white font-semibold hover:text-teal-500 px-3 py-3 md:border-none"
//         >
//           Cart {totalItemsInCart > 0 && `(${totalItemsInCart})`}
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
