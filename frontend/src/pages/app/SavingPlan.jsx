import {
  FiUsers,
  FiTrendingUp,
  FiCalendar,
  FiSearch,
  FiPlus,
  FiAward,
  FiCheckCircle,
  FiDollarSign,
  FiArrowDown,
  FiTrash2,
} from 'react-icons/fi';
import PerformanceCard from '../../components/PerformanceCard';
import PlanCard from '../../components/PlanTable';
import CreateSavingPlanForm from '../../components/CreateSavingPlan';
import { notify } from '../../util/notify';
import { createSavingPlanApi, deleteSavingPlanApi } from '../../util/ApiUtil';
import { useToken } from '../../context/getToken';
import { useState } from 'react';
import Pagination from '../../components/Pagination';
import Breadcrumb from '../../components/Breadcrumb';
import PageHeader from '../../components/header';
import { useSavingPlans } from './hooks/useSavingPlan';
import LoadingSpinner from '../../components/Spinner';
import SavingPlanStats from '../../components/savingPlan/SavingPlanStats';
import ErrorState from '../../components/ErrorState';
import DeleteConfirmationDialog from '../../components/DeleteConfirmationDialog';

export default function SavingPlans() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState(null);
  const token = useToken();
  const {
    savingPlans,
    pagination,
    loading,
    error,
    searchTerm,
    handleSearch,
    setCurrentPage,
    refresh,
    savingPlansStats,
  } = useSavingPlans(token);

  const handleDeletePlan = async () => {
    try {
      const response = await deleteSavingPlanApi(token, planToDelete._id);
      if (response.status === 1) {
        notify({ message: 'Plan deleted successfully', status: 1 });
        refresh();
        setPlanToDelete(null);
      }
    } catch (error) {
      notify(error);
      console.error('Failed to delete saving plan:', error);
    }
  };
  const createSavingPlan = async (planData) => {
    try {
      const response = await createSavingPlanApi(token, planData);
      if (response.status === 1) {
        setIsModalOpen(false);
        notify(response);
        refresh();
      }
    } catch (error) {
      notify(error);
      console.error('Failed to create saving plan:', error);
    }
  };
  if (loading) {
    return <LoadingSpinner message="Loading ..." />;
  }
  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <div className="p-4 w-full">
      <Breadcrumb
        items={[
          { label: 'Dashboard', href: '/user/' },
          { label: 'Saving plans' },
        ]}
      />
      {/* Header and Actions */}
      <PageHeader
        title="Saving Plans overview"
        subtitle="Manage your saving plans and track performance"
      >
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search plans..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 flex items-center gap-2"
          >
            <FiPlus /> Add Plan
          </button>
        </div>
      </PageHeader>
      {/* Performance Overview Cards */}
      <SavingPlanStats stats={savingPlansStats} />
      {/* Enhanced Section Transition */}
      <div className="mt-12 mb-8 relative">
        {/* Decorative line with fade effect */}
        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent"></div>

        {/* Content container with subtle background */}
        <div className="relative flex flex-col items-start bg-purple-50/30 rounded-lg p-4 pl-6 border border-purple-100 max-w-3xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FiUsers className="text-purple-600 text-xl" />
            </div>
            <h2 className="text-xl font-semibold text-purple-900">
              {savingPlans.length > 0
                ? `Your Saving Plans `
                : 'Start Your First Saving Plan'}
            </h2>
          </div>

          <p className="text-gray-600 pl-1">
            {savingPlans.length > 0 ? (
              <>
                Track progress, manage contributions, and view upcoming payouts.
                <span className="block mt-1 text-sm text-purple-600 flex items-center gap-1">
                  <FiArrowDown className="animate-bounce" /> Scroll to explore
                </span>
              </>
            ) : (
              "You haven't created any saving plans yet. Get started by clicking the button below."
            )}
          </p>

          {savingPlans.length === 0 && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-3 ml-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center gap-2 transition-all"
            >
              <FiPlus /> Create Plan
            </button>
          )}
        </div>
      </div>
      {/* Plans Grid */}

      <DeleteConfirmationDialog
        isOpen={planToDelete}
        onClose={() => setPlanToDelete(null)}
        onConfirm={handleDeletePlan}
        title="Remove Plan"
        description={`This will permanently remove ${
          planToDelete && planToDelete?.name
        } from the system.`}
        confirmText="Confirm Removal"
      />
      {savingPlans.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savingPlans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                onUpdate={refresh} // Refresh after any updates
                onDelete={() => setPlanToDelete(plan)} // Add this prop
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8">
            <Pagination
              {...pagination}
              onPageChange={setCurrentPage}
              label="saving plans"
            />
          </div>
        </>
      )}
      {/* Create Plan Modal */}
      {isModalOpen && (
        <div
          onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}
          className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4"
        >
          <CreateSavingPlanForm
            createSavingPlan={createSavingPlan}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
