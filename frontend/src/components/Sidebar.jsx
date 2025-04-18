import {
  FiGrid,
  FiUsers,
  FiDollarSign,
  FiBell,
  FiSettings,
} from 'react-icons/fi';
import { Link } from 'react-router';

const navItems = [
  { label: 'Dashboard', icon: <FiGrid />, to: '/user/dashboard' },
  { label: 'Members', icon: <FiUsers />, to: '/user/members' },
  { label: 'Saving Plans', icon: <FiDollarSign />, to: '/user/saving-plan' },
  { label: 'Account', icon: <FiSettings />, section: 'Settings' },
];

export default function Sidebar({ isSidebarOpen, toggleSidebar }) {
  return (
    <aside
      className={`w-64 bg-purple-50 h-screen p-4 flex flex-col justify-between transition-transform duration-300 transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      } fixed top-0 left-0 h-full z-50 md:relative `}
    >
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-purple-800 ">Ekub Saving</h2>
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

        <ul>
          {navItems.map(({ label, icon, to }, i) => (
            <Link to={to} key={i}>
              <li className="flex items-center gap-3 mb-4 text-gray-700 hover:text-purple-700 cursor-pointer">
                {icon}
                {label}
              </li>
            </Link>
          ))}
        </ul>
      </div>

      <div className="text-sm text-gray-600">
        <p className="font-semibold">Admin User</p>
        <p className="text-xs">Administrator</p>
      </div>
    </aside>
  );
}
