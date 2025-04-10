import { useState } from 'react';
import { FiEdit2, FiMoreVertical, FiTrash2 } from 'react-icons/fi';
function DropdownMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-gray-500 hover:text-gray-700"
      >
        <FiMoreVertical />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-25 bg-white border border-indigo-600 rounded shadow-md z-10">
          <button className="w-full flex items-center px-3 py-2 hover:bg-gray-100 text-sm text-left">
            <FiEdit2 className="mr-2" /> Edit
          </button>
          <button className="w-full flex items-center px-3 py-2 hover:bg-gray-100 text-sm text-left text-red-600">
            <FiTrash2 className="mr-2" /> Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
