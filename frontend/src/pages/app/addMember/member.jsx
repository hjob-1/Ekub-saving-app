import { useContext, useState } from 'react';
import { FiUserPlus } from 'react-icons/fi';
import UserItem from './userItem';
import UserForm from './userForm';
import { AppContext } from '../../../context/applicationContext';

import { useUsers } from '../hooks/useUsers';

// Main User Management Component
const UserManagement = () => {
  const appContext = useContext(AppContext);
  const token = appContext.getSession();

  const { users, addUser, editUser, deleteUser } = useUsers(token);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [newUser, setNewUser] = useState({
    fullname: '',
    email: '',
    phone: '',
  });

  const handleSubmit = () => {
    if (isEditing) {
      editUser(newUser);
      setIsEditing(null);
    } else {
      addUser(newUser);
    }
    setIsModalOpen(false);
    setNewUser({ name: '', email: '', phone: '' });
  };

  const onEdit = (user) => {
    setNewUser(user);
    setIsEditing(user._id);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold text-purple-800 mb-6">
        User Management
      </h1>
      {/* Search Users */}
      <div className="mb-4 flex item-center justify-between">
        <input
          type="text"
          placeholder="Search by name, email, or role"
          className="p-2 border border-gray-300 rounded flex-1 mr-7"
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-3 py-2 rounded hover:bg-purple-800"
        >
          <FiUserPlus className="text-3" />
        </button>
      </div>

      {/* User List */}
      <div className="mb-4">
        {users.map((user) => (
          <UserItem
            key={user._id}
            user={user}
            onEdit={onEdit}
            onDelete={deleteUser}
          />
        ))}
      </div>

      {/* Add/Edit User Form */}
      {isModalOpen && (
        <div
          onClick={(e) => {
            // Only close if clicking directly on backdrop (not children)
            if (e.target === e.currentTarget) {
              setIsModalOpen(false);
            }
          }}
          className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50"
        >
          <UserForm
            user={newUser}
            isEditing={isEditing}
            onChange={setNewUser}
            onSubmit={handleSubmit}
          />
        </div>
      )}
    </div>
  );
};

export default UserManagement;
