import LoadingSpinner from '../Spinner';
import WinnerItem from './WinnerItem';

const WinnerList = ({ winners, loading, error }) => {
  if (loading) {
    return <LoadingSpinner message="Loading ..." />;
  }
  if (error) {
    return <div className="text-red-500 text-center">Try loading Again</div>;
  }
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {winners.map((winner, idx) => (
        <WinnerItem
          key={idx}
          winner={winner}
          last={idx === winners.length - 1}
        />
      ))}
    </div>
  );
};

export default WinnerList;
