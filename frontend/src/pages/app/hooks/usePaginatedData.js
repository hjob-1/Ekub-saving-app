import { useState, useEffect } from 'react';

export const usePaginatedData = (apiFn, deps = [], initialPage = 1) => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: initialPage,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPage = async (page = pagination.currentPage) => {
    try {
      setLoading(true);
      setError(null);
      const res = await apiFn(page); // your apiFn should accept `page`

      if (res?.status === 1 && res?.payload) {
        const { data, pagination: pg } = res.payload.data;

        console.log(res.payload);
        setData(data || []);
        setPagination(pg || pagination);
      } else {
        throw new Error(res?.payload?.message || 'Failed to fetch data');
      }
    } catch (err) {
      console.error('Pagination Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage(pagination.currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.currentPage]);

  return {
    data,
    loading,
    error,
    pagination,
    fetchPage,
    setPage: (page) =>
      setPagination((prev) => ({ ...prev, currentPage: page })),
  };
};
