import { useCallback, useEffect, useState } from 'react';
import {
  getSavingPlanStatsApi,
  getSavingPlanPaymentsApi,
  updateSavingPlanPaymentsApi,
} from '../../../util/ApiUtil';
import { usePaginatedData } from './usePaginatedData'; // Import the reusable hook

export const useSavingPlan = (token, savingId, limit) => {
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
