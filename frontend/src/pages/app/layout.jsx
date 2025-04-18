import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';

function AppLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md ">
        <div className="max-w-screen-xl mx-auto px-4 px-6 py-2 flex justify-between items-center">
          <h1 className="relative text-xl font-bold tracking-wide">Equb</h1>

          {/* Hamburger (Mobile) */}
          <button className="md:hidden" onClick={toggleMenu}>
            <svg
              className="h-6 w-6 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <button className="hover:underline">Home</button>
            <button className="hover:underline">Profile</button>
          </div>
          {/* Mobile Dropdown */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute top-[45px] left-0 right-0 bg-white text-[#4F46E5] shadow-md z-40 md:hidden px-6 py-4 rounded-b-xl"
              >
                <Link to="/user/members">
                  <button
                    onClick={toggleMenu}
                    className="block w-full text-left py-2 hover:underline"
                  >
                    Members
                  </button>
                </Link>
                <Link to="/user/saving-plan">
                  <button
                    onClick={toggleMenu}
                    className="block w-full text-left py-2 hover:underline"
                  >
                    Saving plans
                  </button>
                </Link>

                <button
                  onClick={toggleMenu}
                  className="block w-full text-left py-2 hover:underline"
                >
                  Account
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto px-4">{children}</main>
    </div>
  );
}

export default AppLayout;
