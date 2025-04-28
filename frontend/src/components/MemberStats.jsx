import { FiClock, FiUsers } from 'react-icons/fi';

const MemberStats = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
    <StatCard
      icon={FiUsers}
      label="Total Members"
      value={stats?.totalMembers}
      gradient="purple"
    />
    <StatCard
      icon={FiClock}
      label="New This Week"
      value={stats?.newThisWeek}
      gradient="blue"
    />
  </div>
);

// reusable stat card
const StatCard = ({ icon: Icon, label, value, gradient = 'purple' }) => {
  const gradientMap = {
    purple: 'from-purple-50 to-indigo-50 border-purple-100 text-purple-600',
    blue: 'from-blue-50 to-cyan-50 border-blue-100 text-blue-600',
  };
  return (
    <div
      className={`bg-gradient-to-r ${gradientMap[gradient]} p-4 rounded-xl border shadow-sm`}
    >
      <div className="flex items-center">
        <div className="bg-white p-2 rounded-lg shadow-sm mr-4">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default MemberStats;
