import { useCallback } from 'react';
import { getSavingPlanWinnersApi } from '../../../util/ApiUtil';
import { usePaginatedData } from './usePaginatedData';

export const useSavingPlanWinners = (token, savingId, limit) => {
  const fetchWinners = useCallback(
    (page) => getSavingPlanWinnersApi(token, savingId, page, limit),
    [token, savingId, limit],
  );
  const {
    data: winners,
    pagination,
    loading,
    error,
    fetchPage,
    setPage,
  } = usePaginatedData(fetchWinners, [token, savingId]);

  return {
    winners,
    loading,
    error,
    pagination,
    fetchPage,
    setPage,
  };
};
