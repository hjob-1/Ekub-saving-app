// import { dummyPlans } from '../constants/dummyPlans';
import { FiUsers, FiTrendingUp, FiCalendar } from 'react-icons/fi';
import PerformanceCard from '../../components/PerformanceCard';
import PlanCard from '../../components/PlanTable';
import CreateSavingPlanForm from '../../components/CreateSavingPlan';
import { notify } from '../../util/notify';
import { createSavingPlanApi, getSavingPlansApi } from '../../util/ApiUtil';
import { useToken } from '../../context/getToken';
import { useEffect, useState } from 'react';

export default function SavingPlans() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savingPlans, setSavingPlans] = useState([]);
  const token = useToken();
  const createSavingPlan = async (planData) => {
    try {
      const response = await createSavingPlanApi(token, planData);
      if (response.status === 1) {
        setIsModalOpen(false);
        notify(response);
      }
    } catch (error) {
      notify(error);
      console.error('Failed to create saving plan:', error);
    }
  };

  const fetchSavingPlans = async () => {
    try {
      const response = await getSavingPlansApi(token);
      if (response.status === 1) {
        setSavingPlans(response.payload.data);
      }
    } catch (error) {
      notify(error);
      console.error('Failed to fetch saving plans:', error);
    }
  };

  useEffect(() => {
    fetchSavingPlans();
  }, []);
  console.log('savingplans', savingPlans);
  return (
    <div className="p-3 w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl flex-1 sm:text-2xl font-bold text-purple-800">
          Saving Plans Management
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-purple-600 text-white  p-1 sm:px-4 sm:py-2 rounded hover:bg-purple-700"
        >
          Add Plan
        </button>
      </div>

      <input
        type="text"
        placeholder="Search plans..."
        className="p-2 border border-gray-300 rounded w-full"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        {savingPlans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        <PerformanceCard
          icon={<FiTrendingUp />}
          value="$45,600"
          label="Total Savings"
          subtext="Across all plans"
        />
        <PerformanceCard
          icon={<FiUsers />}
          value="41"
          label="Total Members"
          subtext="Participating"
        />
        <PerformanceCard
          icon={<FiCalendar />}
          value="May 15"
          label="Next Payout"
          subtext="Monthly Plan"
        />
      </div>
      {isModalOpen && (
        <div
          onClick={(e) => {
            // Only close if clicking directly on backdrop (not children)
            if (e.target === e.currentTarget) {
              setIsModalOpen(false);
            }
          }}
          className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50"
        >
          <CreateSavingPlanForm createSavingPlan={createSavingPlan} />
        </div>
      )}
    </div>
  );
}
