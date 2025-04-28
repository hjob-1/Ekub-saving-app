import { FiArrowUpRight, FiArrowDownRight, FiMinus } from 'react-icons/fi';

export default function PerformanceCard({
  icon,
  label,
  value,
  subtext,
  trend = 'neutral',
  trendValue,
}) {
  // Define trend icon and color based on trend type
  const trendStyles = {
    up: {
      icon: <FiArrowUpRight className="text-green-500" />,
      color: 'text-green-500',
    },
    down: {
      icon: <FiArrowDownRight className="text-red-500" />,
      color: 'text-red-500',
    },
    neutral: {
      icon: <FiMinus className="text-gray-400" />,
      color: 'text-gray-400',
    },
  };

  const trendInfo = trendStyles[trend] || trendStyles.neutral;

  return (
    <div className="bg-white p-5 rounded-2xl shadow-md text-center w-full border border-gray-200">
      <div className="flex justify-center items-center mb-3 text-4xl text-indigo-600">
        {icon}
      </div>
      <p className="text-2xl font-semibold text-gray-800">{value}</p>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}

      {trendValue && (
        <div
          className={`flex justify-center items-center mt-2 space-x-1 ${trendInfo.color}`}
        >
          {trendInfo.icon}
          <span className="text-sm font-semibold">{trendValue}</span>
        </div>
      )}
    </div>
  );
}
