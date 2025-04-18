const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  totalPages,
  label = 'items',
}) => {
  const start = Math.min((currentPage - 1) * itemsPerPage + 1, totalItems);
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
      <span>
        {start}–{end} of {totalItems} {label} (Page {currentPage} of{' '}
        {totalPages})
      </span>
      <div className="space-x-2">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-1 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
