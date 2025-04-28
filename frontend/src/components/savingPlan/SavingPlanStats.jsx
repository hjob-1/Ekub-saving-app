import { FiAward, FiCheckCircle, FiDollarSign } from 'react-icons/fi';
import PerformanceCard from '../PerformanceCard';

const SavingPlanStats = ({ stats = {} }) => {
  const savingPlansStats = [
    {
      value: stats?.totalCollected?.toLocaleString() || 0,
      label: 'Total Collected',
      subtext: 'From all paid contributions',
      trend: 'up',
      trendValue: '↑',
      icon: <FiDollarSign className="text-green-600" />, // Money icon
    },
    {
      value: stats?.completedPlans || 0,
      label: 'Completed Plans',
      subtext: 'Fully contributed plans',
      trend: 'up',
      trendValue: '+',
      icon: <FiCheckCircle className="text-blue-600" />, // Success checkmark
    },
    {
      value: stats?.highestAmountPlan || 'N/A',
      label: 'Top Plan',
      trend: 'neutral',
      trendValue: '⭐',
      icon: <FiAward className="text-yellow-500" />, // Award or trophy
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {savingPlansStats.map((stat, index) => (
        <PerformanceCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default SavingPlanStats;
