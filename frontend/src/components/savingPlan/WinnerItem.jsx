const WinnerItem = ({ winner, last }) => (
  <div
    className={`flex items-center justify-between px-6 py-4 ${
      !last ? 'border-b border-gray-200' : ''
    }`}
  >
    <div>
      <p className="text-sm font-medium text-indigo-700">{winner.fullname}</p>
      <p className="text-xs text-gray-600">Phone: {winner.phone}</p>
    </div>
    <div className="text-sm text-indigo-600">
      <p>drawDate</p>
      <span className="text-green-500">
        {new Date(winner.wonDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </span>
    </div>
  </div>
);

export default WinnerItem;
