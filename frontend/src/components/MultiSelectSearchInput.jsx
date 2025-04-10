// components/MultiSelectSearchInput.jsx
import React from 'react';

const MultiSelectSearchInput = ({
  label,
  placeholder,
  query,
  setQuery,
  suggestions,
  onSelect,
  selectedItems,
  onRemove,
  renderItem,
  getItemId,
}) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mt-1 block w-full rounded-md border border-gray-300 focus:border-indigo-600 focus:outline-none p-1"
      />
      {suggestions.length > 0 && (
        <ul className="bg-white border mt-1 rounded shadow max-h-40 overflow-y-auto">
          {suggestions.map((item) => (
            <li
              key={getItemId(item)}
              className="px-3 py-2 hover:bg-blue-50 cursor-pointer"
              onClick={() => onSelect(item)}
            >
              {renderItem(item)}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-2 flex flex-wrap gap-2">
        {selectedItems.map((item) => (
          <span
            key={getItemId(item)}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center"
          >
            {renderItem(item)}
            <button
              onClick={() => onRemove(item)}
              className="ml-2 text-red-500 hover:text-red-700"
              type="button"
            >
              &times;
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default MultiSelectSearchInput;
