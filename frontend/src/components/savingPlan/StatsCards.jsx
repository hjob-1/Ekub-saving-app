import { CalenderSvg } from '../../assets/icons/calenderSvg';
import { DollarSvg } from '../../assets/icons/DollarSvg';
import { PeopleSvg } from '../../assets/icons/peopleSvg';
import StatsCard from '../StatsCard';
const StatsCards = ({ stats }) => {
  const statsData = [
    {
      title: 'Total Money',
      value: `$${stats?.totalAmount || 'NA'}`,
      Icon: <DollarSvg className="h-6 w-6 text-white" />,
    },
    {
      title: 'Active Members',
      value: stats?.totalParticipants || 'NA',
      Icon: <PeopleSvg className="h-6 w-6 text-white" />,
      iconBgColor: 'bg-green-500',
    },
    {
      title: 'Duration',
      value: `${stats?.duration || 'NA'}`,
      Icon: <CalenderSvg className="h-6 w-6 text-white" />,
      iconBgColor: 'bg-blue-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-6">
      {statsData.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default StatsCards;
