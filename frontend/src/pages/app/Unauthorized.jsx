// components/Unauthorized.js
import { FaLock } from 'react-icons/fa';
import { Link } from 'react-router';

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <FaLock className="mx-auto text-4xl text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Unauthorized Access
        </h1>
        <p className="text-gray-600 mb-6">
          You don't have permission to view this page. Please contact your
          administrator.
        </p>
        <Link
          to="/user/login"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
