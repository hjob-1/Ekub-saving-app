// import DropdownMenu from './DropdownMenu';

const PlanCard = ({ plan }) => {
  const visibleMembers = plan.participants.slice(0, 3);
  const remaining = plan.participants.length - visibleMembers.length;

  const getStatusColor = () => {
    if (plan.startDate === plan.endDate) {
      return 'bg-green-100 text-green-700';
    } else {
      return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-xl font-bold text-purple-800">{plan.name}</h2>
        <div className="flex gap-2">
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor()}`}
          >
            {plan.startDate === plan.endDate ? 'Completed' : 'Ongoing'}
          </span>
          {/* <DropdownMenu /> */}
        </div>
      </div>

      <p className="text-sm font-bold text-gray-500 capitalize">
        {plan.paymentPlan} • ${plan.amount}/cycle
      </p>

      <p className="text-xs text-gray-400 mb-3">
        Duration: {new Date(plan.startDate).toLocaleDateString()} →{' '}
        {new Date(plan.endDate).toLocaleDateString()}
      </p>

      <div className="flex items-center">
        {visibleMembers.map((m, i) => (
          <img
            key={i}
            src="https://i.pravatar.cc/150?img=5"
            alt="avatar"
            className={`w-8 h-8 rounded-full border-2 border-white -ml-2 ${
              i === 0 ? 'ml-0' : ''
            }`}
          />
        ))}

        {remaining > 0 && (
          <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 text-xs font-medium flex items-center justify-center -ml-2">
            +{remaining}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanCard;
