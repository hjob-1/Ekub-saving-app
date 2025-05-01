import { useState, useEffect, useCallback } from 'react';
import {
  deleteEkubMember,
  getEkubMembers,
  getEkubMemberStatsApi,
  registerUserToEkubApi,
  updateEkubMember,
} from '../util/ApiUtil';
import { notify } from '../util/notify';
import { usePaginatedData } from './usePaginatedData';

/**
 * Hook for managing Ekub members with pagination, search, and CRUD operations.
 * @param {string} token - Auth token
 * @param {number} initialLimit - Items per page
 */
export const useUsers = (token, initialLimit = 10) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
  const [memberStats, setMemberStats] = useState({});

  // Debounce search term to avoid rapid API calls
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);
  const fetchMemberStats = useCallback(async () => {
    try {
      const res = await getEkubMemberStatsApi(token);
      if (res.status === 1) {
        setMemberStats(() => res.payload.data);
        console.log(res.payload.data);
      }
    } catch (e) {
      console.error('Fetch member stats failed', e);
    }
  }, [token]);
  useEffect(() => {
    fetchMemberStats();
  }, [token, fetchMemberStats]);
  // Data fetcher receives page number
  const fetchMembers = useCallback(
    (page) =>
      getEkubMembers(token, {
        page,
        limit: initialLimit,
        search: debouncedSearch,
      }),
    [token, initialLimit, debouncedSearch],
  );

  // usePaginatedData handles calling fetcher and managing pagination state
  const {
    data: users,
    pagination,
    loading: isLoading,
    error,
    fetchPage,
    setPage,
  } = usePaginatedData(fetchMembers, [token, debouncedSearch]);

  // CRUD operations re-fetch current page on success
  const addUser = useCallback(
    async (newUser) => {
      try {
        const res = await registerUserToEkubApi(
          newUser.fullname,
          newUser.email,
          newUser.phone,
          '123',
          token,
        );
        if (res.status === 1) {
          notify(res);
          fetchPage(pagination.currentPage);
          fetchMemberStats();
        }
      } catch (e) {
        console.error('Add user failed', e);
      }
    },
    [token, fetchPage, pagination.currentPage, fetchMemberStats],
  );

  const editUser = useCallback(
    async (upd) => {
      try {
        const res = await updateEkubMember(token, upd._id, upd);
        if (res.status === 1) {
          notify(res);
          fetchPage(pagination.currentPage);
          fetchMemberStats();
        }
      } catch (e) {
        console.error('Edit user failed', e);
      }
    },
    [token, fetchPage, pagination.currentPage, fetchMemberStats],
  );

  const deleteUser = useCallback(
    async (id) => {
      try {
        const res = await deleteEkubMember(token, id);
        if (res.status === 1) {
          notify(res);
          // If deleting last item on page, go back one page if needed
          const nextPage =
            users.length === 1 && pagination.currentPage > 1
              ? pagination.currentPage - 1
              : pagination.currentPage;
          fetchPage(nextPage);
          fetchMemberStats();
          setPage(nextPage);
        }
      } catch (e) {
        console.error('Delete user failed', e);
      }
    },
    [
      token,
      fetchPage,
      pagination.currentPage,
      users.length,
      setPage,
      fetchMemberStats,
    ],
  );

  // Initial load & refresh when token or search changes
  useEffect(() => {
    setPage(1);
    fetchPage(1);
  }, [token, debouncedSearch]);

  return {
    users,
    pagination,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    fetchPage,
    addUser,
    editUser,
    deleteUser,
    memberStats,
    setCurrentPage: setPage,
    fetchMemberStats,
  };
};
