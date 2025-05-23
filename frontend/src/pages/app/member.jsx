import { useCallback, useContext, useState } from 'react';
import { FiBarChart2, FiSearch, FiUserPlus, FiUsers } from 'react-icons/fi';
import { AppContext } from '../../context/applicationContext';
import ErrorState from '../../components/ErrorState';
import Breadcrumb from '../../components/Breadcrumb';
import PageHeader from '../../components/header';
import MemberStats from '../../components/MemberStats';
import MemberList from '../../components/MemberList';
import DeleteConfirmationDialog from '../../components/DeleteConfirmationDialog';
import Modal from '../../components/Modal';
import UserForm from '../../components/userForm';
import { useUsers } from '../../hooks/useUsers';

const SearchAndAddMember = ({ searchTerm, onSearchChange, onAddMember }) => (
  <div className="flex gap-3 w-full sm:w-auto">
    <div className="relative flex-1 sm:w-64">
      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search member..."
        className="pl-10 pr-4 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
    <button
      onClick={onAddMember}
      className="bg-purple-600 text-white px-2 py-2 rounded hover:bg-purple-700 flex items-center gap-2"
    >
      <FiUserPlus /> Add Member
    </button>
  </div>
);
const UserManagement = () => {
  const { getSession } = useContext(AppContext);
  const token = getSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [planToDeleteId, setPlanToDeleteId] = useState(null);
  const {
    users,
    addUser,
    editUser,
    deleteUser,
    isLoading,
    error,
    pagination,
    searchTerm,
    setSearchTerm,
    memberStats,
    setCurrentPage,
  } = useUsers(token);

  const handleSubmit = useCallback(
    (user) => {
      user?._id ? editUser(user) : addUser(user);
      setIsModalOpen(false);
      setEditingUser(null);
    },
    [addUser, editUser],
  );

  const handleEdit = useCallback((user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  }, []);
  const handleUserChange = (field, value) => {
    setEditingUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleDelete = () => {
    deleteUser(planToDeleteId), [deleteUser];
    setPlanToDeleteId(null);
  };

  if (error) {
    return <ErrorState error={error} />;
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Breadcrumb
        items={[{ label: 'Dashboard', href: '/user/' }, { label: 'Members' }]}
      />
      {/* Header and Actions */}
      <PageHeader
        title="Member Dashboard"
        subtitle="Overview & manage Equb members"
      >
        <SearchAndAddMember
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddMember={setIsModalOpen}
        />
      </PageHeader>

      {/* Statistics Cards */}

      {/* Divider */}
      <div className="border-t border-gray-200 my-8"></div>

      {/* Statistics Section */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <FiBarChart2 className="text-2xl text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-800">
            Community Insights
          </h2>
        </div>
        <p className="text-gray-600 mb-6 max-w-3xl">
          Key metrics and statistics about your member community. Monitor
          growth, activity, and engagement patterns at a glance.
        </p>
        <MemberStats stats={memberStats} />
      </section>

      {/* Divider */}
      <div className="border-t border-gray-200 my-8"></div>

      {/* Member List Section */}
      <div className="flex items-center gap-3 mb-6">
        <FiUsers className="text-2xl text-purple-600" />
        <h2 className="text-2xl font-bold text-gray-800">Member Directory</h2>
      </div>

      <DeleteConfirmationDialog
        isOpen={planToDeleteId}
        onClose={() => setPlanToDeleteId(null)}
        onConfirm={handleDelete}
        title="Remove Member"
        description="Permanently remove this member? This cannot be undone."
        confirmText="Remove"
      />
      <MemberList
        users={users}
        isLoading={isLoading}
        searchTerm={searchTerm}
        onEdit={handleEdit}
        onDelete={setPlanToDeleteId}
        pagination={pagination}
        onPageChange={setCurrentPage}
        setIsModalOpen={setIsModalOpen}
      />

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingUser(null);
          }}
        >
          <UserForm
            user={editingUser}
            onSubmit={handleSubmit}
            onChange={handleUserChange}
            onCancel={() => {
              setIsModalOpen(false);
              setEditingUser(null);
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default UserManagement;
