import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router';
import Footer from '../../components/Footer';
import { GiPayMoney } from 'react-icons/gi';
import { AppContext } from '../../context/applicationContext';
import Avator from '../../components/Avator';

function AppLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const appContext = useContext(AppContext);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleAvatarMenu = () => setAvatarMenuOpen(!avatarMenuOpen);

  const handlelogout = () => {
    appContext.logout();
    navigate('/user/login', { replace: true });
    setAvatarMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative">
      {/* White Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link to="/user/">
            <div className="flex flex items-center justify-center gap-3 font-mono">
              <h2 className="text-3xl font-bold  text-center text-gray-800 text-indigo-600">
                equb
              </h2>
              <GiPayMoney className="text-3xl text-indigo-600 " />
            </div>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/user/members"
              className="text-gray-600 hover:text-indigo-600 font-medium text-sm transition-colors"
            >
              Members
            </Link>
            <Link
              to="/user/saving-plans"
              className="text-gray-600 hover:text-indigo-600 font-medium text-sm transition-colors"
            >
              Saving Plans
            </Link>

            {/* Avatar with Dropdown (Desktop) */}
            <div className="relative ml-4">
              <button
                onClick={toggleAvatarMenu}
                className="flex items-center focus:outline-none"
              >
                <Avator
                  fullname={appContext.getUserData()?.fullname || 'Admin User'}
                />

                <svg
                  className={`ml-1 h-4 w-4 text-gray-500 transition-transform ${
                    avatarMenuOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <AnimatePresence>
                {avatarMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200 "
                  >
                    <Link
                      to="/user/account"
                      className="block w-full  text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setAvatarMenuOpen(false)}
                    >
                      View Account
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={handlelogout}
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-3">
            <div onClick={toggleAvatarMenu} className="relative">
              <Avator
                fullname={appContext.getUserData()?.fullname || 'Admin User'}
              />
              {avatarMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                >
                  <Link
                    to="/user/account"
                    className="block text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setAvatarMenuOpen(false)}
                  >
                    View Account
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={handlelogout}
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </div>

            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    menuOpen
                      ? 'M6 18L18 6M6 6l12 12'
                      : 'M4 6h16M4 12h16M4 18h16'
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-white border-t border-gray-200 overflow-hidden"
            >
              <div className="px-4 py-3 space-y-3">
                <Link
                  to="/user/members"
                  className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={toggleMenu}
                >
                  Members
                </Link>
                <Link
                  to="/user/saving-plans"
                  className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={toggleMenu}
                >
                  Saving Plans
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 pt-24 pb-12">
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default AppLayout;
