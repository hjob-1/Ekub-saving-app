import React, { useState } from 'react';

function AppLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <aside
        className={`bg-white dark:bg-gray-800 w-64 p-4 space-y-4 transition-transform duration-300 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } fixed top-0 left-0 h-full z-50 md:relative `}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Ekub Saving</h2>
          <button className="md:hidden" onClick={toggleSidebar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav>
          <ul className="space-y-2">
            <li>
              <button className="w-full text-left py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                Dashboard
              </button>
            </li>
            <li>
              <button className="w-full text-left py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                Members
              </button>
            </li>
            <li>
              <button className="w-full text-left py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                Saving Plans
              </button>
            </li>
            <li>
              <button className="w-full text-left py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                Payments
              </button>
            </li>
            <li>
              <button className="w-full text-left py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                Lottery
              </button>
            </li>
            <li>
              <button className="w-full text-left py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                Settings
              </button>
            </li>
            <li>
              <button className="w-full text-left py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                Account
              </button>
            </li>
            <li>
              <button className="w-full text-left py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                Notifications
              </button>
            </li>
          </ul>
        </nav>
        <div className="mt-auto">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-300"></div>
            <div>
              <p className="text-sm font-semibold">Admin User</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-4 md:ml-20">
        {/* Navbar */}
        <nav className="flex justify-between items-center mb-4">
          <button className="md:hidden" onClick={toggleSidebar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
          <h1 className="text-xl font-semibold">Equb</h1>{' '}
          <div>
            {/* Add user profile, notifications, etc. */}
            <button className="ml-4">Profile</button>
          </div>
        </nav>

        {/* Content Area */}
        <main>{children}</main>
      </div>
    </div>
  );
}

export default AppLayout;
