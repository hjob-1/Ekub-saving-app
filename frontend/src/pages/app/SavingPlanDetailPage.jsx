import Breadcrumb from '../../components/Breadcrumb';
import PageHeader from '../../components/header';

import TabPanel from '../../components/TabPanel';
import { useToken } from '../../context/getToken';

import { useDetailSavingPlan } from './hooks/useSavingPlan';
import StatsCards from '../../components/savingPlan/StatsCards';
import PaymentList from '../../components/savingPlan/PaymentList';
import Pagination from '../../components/Pagination';
import WinnerDrawModal from '../../components/savingPlan/Lottery';
import { useState } from 'react';
import Modal from '../../components/Modal';
import { useParams } from 'react-router';
import WinnerList from '../../components/savingPlan/WinnerList';
import { useSavingPlanWinners } from './hooks/useWinner';
import EmailReminderButton from '../../components/EmailReminderButton';
import { FiAlertCircle } from 'react-icons/fi';
import { sendReminderApi } from '../../util/ApiUtil';

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
  } = useDetailSavingPlan(token, savingId, limit);

  const { winners, loading, error, pagination, setPage } = useSavingPlanWinners(
    token,
    savingId,
    limit,
  );

  const sendReminderEmail = async () => {
    try {
      const response = await sendReminderApi(token, savingId);
      if (response.status === 1) {
        console.log('Email sent successfully!');
      } else {
        console.error('Failed to send email:', response.message);
      }
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  };

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
          { label: 'Dashboard', href: '/user/' },
          { label: 'Saving plans', href: '/user/saving-plans' },
          { label: savingPlanStats?.name || '' },
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

      {/* Email Reminder Section */}
      <div className="bg-blue-50 p-5 rounded-lg mb-8 border border-blue-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-medium text-blue-800 flex items-center gap-2 mb-1">
              <FiAlertCircle className="text-blue-500" />
              Upcoming Due Date Notification
            </h3>
            <p className="text-sm text-blue-600">
              Send email reminders to all members about the approaching
              deadline.
            </p>
          </div>
          <EmailReminderButton
            onSendEmail={sendReminderEmail}
            className="flex-shrink-0"
          />
        </div>
      </div>

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
