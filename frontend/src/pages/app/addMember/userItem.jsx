// User List Item Component
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDeleteOutline } from 'react-icons/md';
const UserItem = ({ user, onEdit, onDelete }) => (
  <div className="p-4 border border-gray-200 rounded-lg mb-2">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-medium">{user.fullname}</h3>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-gray-500">{user.phone}</p>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={() => onEdit(user)}
          className="text-indigo-600 hover:text-indigo-800"
        >
          <AiOutlineEdit />
        </button>
        <button
          onClick={() => onDelete(user._id)}
          className="text-red-500 hover:text-red-700"
        >
          <MdOutlineDeleteOutline />
        </button>
      </div>
    </div>
  </div>
);

export default UserItem;
