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

const SavingPlanDetailPage = () => {
  const token = useToken();
  const limit = 5;
  const savingId = '6801c0b666939642aa92cb20';
  const {
    savingPlanStats,
    payments,
    currentPage,
    totalPages,
    switchStates,
    totalPayments,
    setCurrentPage,
    toggleSwitch,
  } = useSavingPlan(token, savingId, limit);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        title="Weekly Saving Plan"
        subtitle="Track payments, winners, and plan progress"
        showActionButton
        buttonText="Initiate Lottery"
        onButtonClick={() => setIsModalOpen(true)}
      />
      <StatsCards stats={savingPlanStats} />
      <h1 className="text-2xl font-semibold mb-6 text-indigo-700">
        Payment List
      </h1>
      <TabPanel tab={'week'} setTab={() => {}} />
      <PaymentList
        payments={payments}
        stats={savingPlanStats}
        switchStates={switchStates}
        onToggle={toggleSwitch}
      />
      <Pagination
        currentPage={currentPage}
        totalItems={totalPayments}
        totalPages={totalPages}
        itemsPerPage={limit}
        label="payments"
        onPageChange={setCurrentPage}
      />
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <WinnerDrawModal />
        </Modal>
      )}
    </div>
  );
};

export default SavingPlanDetailPage;
