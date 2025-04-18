import Breadcrumb from '../../components/Breadcrumb';
import PageHeader from '../../components/header';

import TabPanel from '../../components/TabPanel';
import { useToken } from '../../context/getToken';

import { useSavingPlan } from './hooks/useSavingPlan';
import StatsCards from '../../components/savingPlan/StatsCards';
import PaymentList from '../../components/savingPlan/PaymentList';
import Pagination from '../../components/Pagination';
import WinnerDrawModal from '../../components/savingPlan/Lottery';
import { useState } from 'react';
import Modal from '../../components/Modal';
import { useParams } from 'react-router';
import WinnerList from '../../components/savingPlan/WinnerList';
import { useSavingPlanWinners } from './hooks/useWinner';

const SavingPlanDetailPage = () => {
  const token = useToken();
  const { id: savingId } = useParams();
  const limit = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tab, setTab] = useState('payment');
  const {
    savingPlanStats,
    payments,
    switchStates,
    pagination: paymentPagination,
    toggleSwitch,
    setCurrentPage,
    loading: paymentLoading,
    error: paymentError,
  } = useSavingPlan(token, savingId, limit);

  const { winners, loading, error, pagination, setPage } = useSavingPlanWinners(
    token,
    savingId,
    limit,
  );

  const tabComponent = {
    payment: (
      <>
        <PaymentList
          payments={payments}
          stats={savingPlanStats}
          switchStates={switchStates}
          loading={paymentLoading}
          error={paymentError}
          onToggle={toggleSwitch}
        />
        <Pagination
          {...paymentPagination}
          label="payments"
          onPageChange={setCurrentPage}
        />
      </>
    ),
    winners: (
      <>
        <WinnerList winners={winners} loading={loading} error={error} />
        <Pagination {...pagination} label="winners" onPageChange={setPage} />
      </>
    ),
  };
  const recentWinner = winners?.[winners.length - 1];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <Breadcrumb
        items={[
          { label: 'Dashboard' },
          { label: 'Saving plans' },
          { label: 'Weekly Plan' },
        ]}
      />
      <PageHeader
        title={savingPlanStats?.name || 'Saving Plan'}
        subtitle="Track payments, winners, and plan progress"
        showActionButton
        buttonText="Initiate Lottery"
        onButtonClick={() => setIsModalOpen(true)}
      />
      <StatsCards stats={savingPlanStats} />

      {recentWinner && (
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-2xl shadow-md mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-1">🎉 Latest Winner!</h2>
            <p className="text-lg">
              <span className="font-semibold">{recentWinner?.fullname}</span>{' '}
              won{' '}
              <span className="font-semibold">
                ${savingPlanStats?.totalAmount / savingPlanStats?.totalPayments}
              </span>{' '}
              on{' '}
              <span className="italic">
                {new Date(recentWinner.wonDate).toLocaleDateString()}
              </span>
            </p>
          </div>
          <div className="text-5xl">🏆</div>
        </div>
      )}

      <TabPanel tab={tab} setTab={setTab} />
      {tabComponent[tab] || (
        <div className="text-center">No data available</div>
      )}

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <WinnerDrawModal savingId={savingId} />
        </Modal>
      )}
    </div>
  );
};

export default SavingPlanDetailPage;
