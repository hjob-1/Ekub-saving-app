import { FiEdit2, FiMail, FiPhone, FiTrash2 } from 'react-icons/fi';
import Avator from './Avator';

// user card
const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition transform hover:-translate-y-1 overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start mb-3 border-b border-gray-200 pb-3">
          <div className="flex items-center gap-3">
            <Avator fullname={user.fullname} />
            <h3 className="font-bold text-gray-900 truncate mb-1">
              {user.fullname}
            </h3>
          </div>

          <div className="flex gap-1">
            <button
              onClick={() => onEdit(user)}
              className="text-gray-500 hover:text-purple-600 p-1.5 rounded-lg hover:bg-purple-50 transition-colors"
              title="Edit"
            >
              <FiEdit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(user._id)}
              className="text-gray-500 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
              title="Delete"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <FiMail className="mr-2" />
            <span className="truncate">{user.email}</span>
          </div>
          {user.phone && (
            <div className="flex items-center text-sm text-gray-600">
              <FiPhone className="mr-2" />
              <span>{user.phone}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
