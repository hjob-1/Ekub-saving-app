import { useCallback, useEffect, useState } from 'react';

import {
  getSavingPlanStatsApi,
  getSavingPlanPaymentsApi,
  updateSavingPlanPaymentsApi,
  getSavingPlansApi,
  getSavingPlansStatsApi,
} from '../util/ApiUtil';
import { usePaginatedData } from './usePaginatedData'; // Import the reusable hook

export const useDetailSavingPlan = (token, savingId, limit) => {
  const [savingPlanStats, setSavingPlanStats] = useState(null);
  const [switchStates, setSwitchStates] = useState({});
  const fetchPayments = useCallback(
    (page) => getSavingPlanPaymentsApi(token, savingId, page, limit),
    [token, savingId, limit],
  );

  // Fetch saving plan stats (not paginated)
  const getStats = async () => {
    const res = await getSavingPlanStatsApi(token, savingId);
    if (res.status === 1) setSavingPlanStats(res.payload.data);
    else console.error('Failed to fetch stats:', res.message);
  };

  // Get payments using usePaginatedData
  const {
    data: payments,
    pagination,
    loading,
    error,
    fetchPage,
    setPage,
  } = usePaginatedData(fetchPayments, [token, savingId], 1);

  useEffect(() => {
    if (token) {
      getStats();
    }
  }, []);

  useEffect(() => {
    if (payments.length > 0) {
      const stateMap = {};
      payments.forEach((p) => (stateMap[p._id] = p.isPaid));
      setSwitchStates(stateMap);
    }
  }, [payments]);

  const toggleSwitch = async (paymentId) => {
    setSwitchStates((prev) => ({ ...prev, [paymentId]: !prev[paymentId] }));
    const res = await updateSavingPlanPaymentsApi(token, savingId, paymentId);
    if (res.status === 1) await fetchPage(); // Refetch payments after update
    else console.error('Update failed:', res.message);
  };

  return {
    savingPlanStats,
    payments,
    pagination,
    switchStates,
    loading,
    error,
    setCurrentPage: setPage,
    toggleSwitch,
  };
};

export const useSavingPlans = (token, limit = 6) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [savingPlansStats, setSavingPlansStats] = useState(null);
  // Debounce search term to avoid excessive API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // 300ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Fetch saving plan stats (not paginated)
  const getStats = async () => {
    const res = await getSavingPlansStatsApi(token);
    if (res.status === 1) setSavingPlansStats(res.payload.data);
    else console.error('Failed to fetch stats:', res.message);
  };
  useEffect(() => {
    if (token) {
      getStats();
    }
  }, []);

  const fetchSavingPlans = useCallback(
    (page) => getSavingPlansApi(token, page, limit, debouncedSearchTerm),
    [token, limit, debouncedSearchTerm],
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Get payments using usePaginatedData
  const {
    data: savingPlans,
    pagination,
    loading,
    error,
    fetchPage,
    setPage,
  } = usePaginatedData(fetchSavingPlans, [token]);
  console.log('savingPlans', savingPlans);

  // Reset to page 1 when search term changes
  useEffect(() => {
    setPage(1);
    fetchPage(1);
  }, [debouncedSearchTerm]);
  return {
    savingPlans,
    pagination,
    loading,
    error,
    searchTerm,
    handleSearch,
    setCurrentPage: setPage,
    refresh: fetchPage,
    savingPlansStats,
  };
};
