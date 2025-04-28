import { FiUsers, FiUserPlus } from 'react-icons/fi';

const EmptyState = ({
  title = 'No members found',
  description = 'Get started by adding your first member',
  actionText = 'Add Member',
  onAction,
  searchTerm,
  icon: Icon = FiUsers,
  iconColor = 'text-purple-600',
  iconBg = 'bg-purple-100',
  actionVariant = 'primary',
}) => {
  const actionVariants = {
    primary:
      'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-md',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  const displayDescription = searchTerm
    ? 'No members match your search. Try different keywords.'
    : description;

  return (
    <div className="bg-white rounded-xl p-8 text-center border border-gray-100 shadow-sm">
      <div className="mx-auto max-w-xs">
        {/* Icon */}
        <div
          className={`${iconBg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
        >
          <Icon className={`w-8 h-8 ${iconColor}`} />
        </div>

        {/* Text Content */}
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-500 mt-1 mb-4">{displayDescription}</p>

        {/* Action Button */}
        {onAction && (
          <button
            onClick={onAction}
            className={`${actionVariants[actionVariant]} px-4 py-2 rounded-lg transition-all inline-flex items-center gap-2`}
          >
            <FiUserPlus />
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
