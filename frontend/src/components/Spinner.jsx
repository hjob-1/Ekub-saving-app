const LoadingSpinner = ({ message }) => (
  <div className="mt-4 text-center">
    <div className="animate-spin h-8 w-8 border-t-4 border-indigo-600 rounded-full mx-auto" />
    <p className="mt-2 text-sm text-gray-600">{message}</p>
  </div>
);

export default LoadingSpinner;
