import { Link } from 'react-router';
import {
  FiUsers,
  FiDollarSign,
  FiCalendar,
  FiClock,
  FiArrowRight,
  FiTrash2,
} from 'react-icons/fi';
import Avator from './Avator';

const PlanCard = ({ plan, onDelete }) => {
  const targetAmount = plan.amount * plan.participants.length ** 2;

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:border-purple-100">
      {/* Header with status */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${
              plan.isCompleted
                ? 'bg-green-100 text-green-700'
                : 'bg-blue-100 text-blue-700'
            }`}
          >
            {plan.isCompleted
              ? 'Completed'
              : plan.daysRemaining > 0
              ? `${plan.daysRemaining} days left`
              : 'Ended'}
          </span>
          <button
            onClick={() => onDelete(plan)}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            title="Delete plan"
            aria-label="Delete plan"
          >
            <FiTrash2 />
          </button>
        </div>
        {/* Add dropdown menu here if needed */}
      </div>

      {/* Plan title as link */}
      <Link to={`/user/saving-plan/${plan._id}`} className="block mb-3 group">
        <h2 className="text-lg font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
          {plan.name}
        </h2>
      </Link>

      {/* Key metrics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center">
          <FiDollarSign className="text-gray-400 mr-2" />
          <div>
            <p className="text-xs text-gray-500">Target</p>
            <p className="text-sm font-semibold">
              ${targetAmount?.toLocaleString() || '0'}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <FiDollarSign className="text-gray-400 mr-2" />
          <div>
            <p className="text-xs text-gray-500">Saved</p>
            <p className="text-sm font-semibold">
              ${plan.totalCollected?.toLocaleString() || '0'}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <FiCalendar className="text-gray-400 mr-2" />
          <div>
            <p className="text-xs text-gray-500">Cycle</p>
            <p className="text-sm font-semibold capitalize">
              {plan.paymentPlan}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <FiUsers className="text-gray-400 mr-2" />
          <div>
            <p className="text-xs text-gray-500">Members</p>
            <p className="text-sm font-semibold">
              {plan.participants?.length || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>{plan.progressPercentage.toFixed(0)}% completed</span>
          <span>
            ${plan.totalCollected?.toLocaleString()} of $
            {targetAmount?.toLocaleString()}
          </span>
        </div>
        <ProgressBar progress={plan.progressPercentage} />
      </div>

      {/* Timeline */}
      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
        <div>
          <FiClock className="inline mr-1" />
          <span>{new Date(plan.startDate).toLocaleDateString()}</span>
        </div>
        <FiArrowRight className="text-gray-300 mx-2" />
        <div>
          <span>{new Date(plan.endDate).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Participants avatars with better hover effect */}
      <div className="flex items-center">
        <div className="flex -space-x-2">
          {plan.participants?.slice(0, 5).map((participant, index) => (
            <Avator fullname={participant.fullname} key={index} />
          ))}
        </div>
        {plan.participants?.length > 5 && (
          <span className="ml-2 text-xs text-gray-500">
            +{plan.participants.length - 5} more
          </span>
        )}
      </div>

      {/* CTA Button */}
      <Link
        to={`/user/saving-plan/${plan._id}`}
        className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
      >
        View Plan Details
      </Link>
    </div>
  );
};

const ProgressBar = ({ progress }) => (
  <div className="w-full bg-gray-200 rounded-full h-2">
    <div
      className="bg-purple-600 h-2 rounded-full"
      style={{ width: `${progress}%` }}
    ></div>
  </div>
);

export default PlanCard;
