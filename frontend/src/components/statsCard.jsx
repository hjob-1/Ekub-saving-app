const StatsCard = ({
  title,
  value,
  Icon,
  iconBgColor = 'bg-indigo-500',
  valueColor = 'text-gray-900',
  className = '',
}) => {
  return (
    <div className={`bg-white overflow-hidden shadow rounded-lg ${className}`}>
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          {Icon && (
            <div className={`flex-shrink-0 ${iconBgColor} rounded-md p-3`}>
              {Icon}
            </div>
          )}
          <div className={`${Icon ? 'ml-5' : ''} w-0 flex-1`}>
            <dt className="text-sm font-medium text-gray-500 truncate">
              {title}
            </dt>
            <dd className="flex items-baseline">
              <div
                className={`text-xl sm:text-2xl font-semibold ${valueColor}`}
              >
                {value}
              </div>
            </dd>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
