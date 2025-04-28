import { FiX } from 'react-icons/fi';

const ErrorState = ({ error }) => (
  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
    <div className="flex items-center">
      <FiX className="h-5 w-5 text-red-500 mr-3" />
      <div>
        <p className="font-medium text-red-800">Error loading data</p>
        <p className="text-sm text-red-600">
          {error || 'Please refresh the page'}
        </p>
      </div>
    </div>
  </div>
);

export default ErrorState;
