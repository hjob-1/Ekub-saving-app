import { useEffect, useState } from 'react';
import {
  getSavingPlanStatsApi,
  getSavingPlanPaymentsApi,
  updateSavingPlanPaymentsApi,
} from '../../../util/ApiUtil';

export const useSavingPlan = (token, savingId, limit) => {
  const [savingPlanStats, setSavingPlanStats] = useState(null);
  const [payments, setPayments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPayments, setTotalPayments] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [switchStates, setSwitchStates] = useState({});

  const getStats = async () => {
    const res = await getSavingPlanStatsApi(token, savingId);
    if (res.status === 1) setSavingPlanStats(res.payload.data);
    else console.error('Failed to fetch stats:', res.message);
  };

  const getPayments = async () => {
    const res = await getSavingPlanPaymentsApi(
      token,
      savingId,
      currentPage,
      limit,
    );
    if (res.status === 1) {
      const { totalPayments, payments, currentPage: page } = res.payload.data;
      setTotalPayments(totalPayments);
      setPayments(payments);
      setTotalPages(Math.ceil(totalPayments / limit));
      setCurrentPage(page);

      const stateMap = {};
      payments.forEach((p) => (stateMap[p._id] = p.isPaid));
      setSwitchStates(stateMap);
    } else console.error('Failed to fetch payments:', res.message);
  };

  const toggleSwitch = async (paymentId) => {
    setSwitchStates((prev) => ({ ...prev, [paymentId]: !prev[paymentId] }));
    const res = await updateSavingPlanPaymentsApi(token, savingId, paymentId);
    if (res.status === 1) await getPayments();
    else console.error('Update failed:', res.message);
  };

  useEffect(() => {
    if (token) {
      getStats();
      getPayments();
    }
  }, [token, currentPage]);

  return {
    savingPlanStats,
    payments,
    currentPage,
    totalPages,
    switchStates,
    totalPayments,
    setCurrentPage,
    toggleSwitch,
  };
};
