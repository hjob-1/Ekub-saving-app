import React, { useState, useRef, useEffect } from 'react';

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
  isLoading = false,
  noResultsText = 'No matches found',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsFocused(false);
    }
  };

  const handleItemSelect = (item) => {
    onSelect(item);
    setIsFocused(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      {/* Selected items chips */}
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedItems.map((item) => (
          <span
            key={getItemId(item)}
            className="inline-flex items-center bg-blue-100 text-blue-800 text-sm py-1 px-3 rounded-full"
          >
            {renderItem(item)}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(item);
              }}
              className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none"
              aria-label={`Remove ${getItemId(item)}`}
            >
              &times;
            </button>
          </span>
        ))}
      </div>

      {/* Search input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          aria-autocomplete="list"
          aria-expanded={isFocused && suggestions.length > 0}
        />
        {isLoading && (
          <div className="absolute right-3 top-2.5">
            <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
          </div>
        )}
      </div>

      {/* Suggestions dropdown */}
      {isFocused && (suggestions.length > 0 || query) && (
        <div
          ref={dropdownRef}
          className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto max-h-60 focus:outline-none"
        >
          {isLoading ? (
            <div className="px-4 py-2 text-gray-500">Loading...</div>
          ) : suggestions.length === 0 ? (
            <div className="px-4 py-2 text-gray-500">{noResultsText}</div>
          ) : (
            suggestions.map((item) => (
              <button
                key={getItemId(item)}
                type="button"
                onClick={() => handleItemSelect(item)}
                className="w-full text-left px-4 py-2 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none"
              >
                {renderItem(item)}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelectSearchInput;
