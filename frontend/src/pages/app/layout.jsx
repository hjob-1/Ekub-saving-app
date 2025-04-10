import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';

function AppLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
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
