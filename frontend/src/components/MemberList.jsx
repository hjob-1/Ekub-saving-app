import UserCard from '../pages/app/addMember/UserCard';
import EmptyState from './EmptyState';
import Pagination from './Pagination';
import LoadingSpinner from './Spinner';

const MemberList = ({
  users,
  isLoading,
  searchTerm,
  onEdit,
  onDelete,
  pagination,
  onPageChange,
  setIsModalOpen,
}) => {
  if (isLoading) {
    return <LoadingSpinner message="Loading members..." />;
  }

  if (users.length === 0) {
    return (
      <EmptyState
        searchTerm={searchTerm}
        onAction={() => setIsModalOpen(true)}
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {users.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      <div className="mt-8">
        <Pagination
          {...pagination}
          onPageChange={onPageChange}
          label="Members"
        />
      </div>
    </>
  );
};

export default MemberList;
