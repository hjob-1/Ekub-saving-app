import { useNavigate } from 'react-router';
import { FiHome, FiTool } from 'react-icons/fi';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md mx-auto">
        {/* Illustration */}
        {/* Visual element (simple circle with X) */}
        <div className="mb-10 mx-auto w-40 h-40 rounded-full bg-indigo-100 flex items-center justify-center">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-5xl text-indigo-600">404</h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 mb-4">
            <FiTool className="mr-2" />
            <span className="font-medium">Under Maintenance</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            Page Not Available
          </h1>

          <p className="text-gray-600">
            The page you're looking for is currently under maintenance or
            doesn't exist. We're working hard to improve your experience.
          </p>

          <div className="pt-6">
            <button
              onClick={() => navigate('/user/')}
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
            >
              <FiHome className="mr-2" />
              Return to Homepage
            </button>
          </div>

          <p className="text-sm text-gray-500 pt-8">
            Need help?{' '}
            <a
              href="mailto:support@equb.com"
              className="text-indigo-600 hover:underline"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
