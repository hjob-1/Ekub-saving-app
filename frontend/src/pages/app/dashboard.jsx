import React from 'react';

function AdminDashboardMobileFirst() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar (Mobile - Initially hidden) */}
      <aside
        className="fixed top-0 left-0 w-full h-full bg-white dark:bg-gray-800 p-4 z-50 transform -translate-x-full transition-transform duration-300 ease-in-out"
        id="sidebar"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Ekub Saving</h2>
          <button
            className="text-gray-600 dark:text-gray-300"
            onClick={() =>
              document
                .getElementById('sidebar')
                .classList.toggle('-translate-x-full')
            }
          >
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
                SETTINGS
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
      </aside>

      {/* Main Content */}
      <div className="p-4">
        {/* Header */}
        <header className="flex justify-between items-center mb-4">
          <button
            className="text-gray-600 dark:text-gray-300"
            onClick={() =>
              document
                .getElementById('sidebar')
                .classList.toggle('-translate-x-full')
            }
          >
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
          <h1 className="text-lg font-semibold">
            Admin dashboard for Ekub Saving platform
          </h1>
        </header>

        {/* Overview */}
        <section className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
              <p className="text-gray-600 dark:text-gray-300">TOTAL</p>
              <p className="text-2xl font-bold">24 Members</p>
              <p className="text-sm text-gray-500">3 new members this month</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
              <p className="text-gray-600 dark:text-gray-300">ACTIVE</p>
              <p className="text-2xl font-bold">3 Saving Plans</p>
              <p className="text-sm text-gray-500">1 plan ending next week</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
              <p className="text-gray-600 dark:text-gray-300">COLLECTED</p>
              <p className="text-2xl font-bold">$4,800</p>
              <p className="text-sm text-gray-500">92% collection rate</p>
            </div>
          </div>
        </section>

        {/* Recent Activities */}
        <section className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Recent Activities</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
              <thead>
                <tr>
                  <th className="text-left py-2 px-4">Activity</th>
                  <th className="text-left py-2 px-4">User</th>
                  <th className="text-left py-2 px-4">Amount</th>
                  <th className="text-left py-2 px-4">Plan</th>
                  <th className="text-left py-2 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4">Payment received</td>
                  <td className="py-2 px-4">John Doe</td>
                  <td className="py-2 px-4">$200</td>
                  <td className="py-2 px-4">Monthly Plan</td>
                  <td className="py-2 px-4">Oct 15, 2023</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">New member</td>
                  <td className="py-2 px-4">Sarah Smith</td>
                  <td className="py-2 px-4">-</td>
                  <td className="py-2 px-4">Weekly Plan</td>
                  <td className="py-2 px-4">Oct 14, 2023</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Lottery completed</td>
                  <td className="py-2 px-4">-</td>
                  <td className="py-2 px-4">$2,400</td>
                  <td className="py-2 px-4">Monthly Plan</td>
                  <td className="py-2 px-4">Oct 10, 2023</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Payment received</td>
                  <td className="py-2 px-4">Michael Johnson</td>
                  <td className="py-2 px-4">$150</td>
                  <td className="py-2 px-4">Weekly Plan</td>
                  <td className="py-2 px-4">Oct 9, 2023</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Missed payment</td>
                  <td className="py-2 px-4">Emily Brown</td>
                  <td className="py-2 px-4">$200</td>
                  <td className="py-2 px-4">Monthly Plan</td>
                  <td className="py-2 px-4">Oct 8, 2023</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>
          <div className="flex flex-wrap gap-2">
            <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
              Add Member
            </button>
            <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
              Create Plan
            </button>
            <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
              Record Payment
            </button>
            <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
              Run Lottery
            </button>
          </div>
        </section>

        {/* Upcoming Lotteries */}
        <section>
          <h2 className="text-lg font-semibold mb-2">Upcoming Lotteries</h2>
          <div className="space-y-2">
            <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
              <h3 className="font-semibold">Monthly Plan Lottery</h3>
              <p className="text-sm text-gray-500">
                October 31, 2023 • 12 participants • $2,400 pool
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
              <h3 className="font-semibold">Weekly Plan Lottery</h3>
              <p className="text-sm text-gray-500">
                October 22, 2023 • 8 participants • $1,200 pool
              </p>
            </div>
          </div>
        </section>
      </div>
      <style jsx global>{`
        @media (max-width: 768px) {
          #sidebar {
            transform: translateX(-100%);
          }
          #sidebar.show {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

export default AdminDashboardMobileFirst;
