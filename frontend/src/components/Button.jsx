const Button = ({ onClick, loading = false, label }) => (
  <button
    onClick={onClick}
    disabled={loading}
    className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition disabled:opacity-50 w-full"
  >
    {loading ? 'Processing...' : label || '🎯 Draw Winner'}
  </button>
);

export default Button;
