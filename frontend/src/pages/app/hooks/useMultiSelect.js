import { useState, useEffect } from 'react';
import { useDebounce } from './useDebounce';

const useMultiSelect = ({ fetchFn, identifierKey = '_id' }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounced fetch function
  const fetchSuggestions = useDebounce(async (searchQuery) => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetchFn(searchQuery);
      if (response.status === 1) {
        setSuggestions(response.payload?.data || []);
      }
    } catch (err) {
      setError(err);
      console.error('Error fetching suggestions:', err);
    } finally {
      setIsLoading(false);
    }
  }, 400);

  useEffect(() => {
    fetchSuggestions(query);
  }, [query]);

  const addItem = (item) => {
    if (
      !selectedItems.some(
        (selected) => selected[identifierKey] === item[identifierKey],
      )
    ) {
      setSelectedItems((prev) => [...prev, item]);
    }
    setQuery('');
    setSuggestions([]);
  };

  const removeItem = (itemToRemove) => {
    setSelectedItems((prev) =>
      prev.filter(
        (item) => item[identifierKey] !== itemToRemove[identifierKey],
      ),
    );
  };

  const clearAll = () => {
    setSelectedItems([]);
  };

  return {
    query,
    setQuery,
    suggestions,
    selectedItems,
    isLoading,
    error,
    addItem,
    removeItem,
    clearAll,
  };
};

export default useMultiSelect;
