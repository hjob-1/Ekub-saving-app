import { FaEnvelope, FaPhone, FaUser } from 'react-icons/fa';

const UserForm = ({ user = {}, onChange, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="bg-white rounded-xl p-8 w-full max-w-sm shadow-[0px_3px_35px_rgba(0,0,0,0.01),0px_3px_25px_rgba(0,0,0,0.08)]">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-bold mb-4 text-center">
          {user?._id ? 'Edit Member' : 'Add New Member'}
        </h2>

        <div className="relative">
          <FaUser className="absolute left-3 top-3 text-gray-400" />
          <input
            className="mt-1 block w-full rounded-md border border-gray-300 focus:border-indigo-600 focus:outline-none p-2 pl-10"
            id="name"
            type="text"
            name="fullname"
            placeholder="Full name"
            required
            value={user?.fullname ?? ''}
            onChange={(e) => onChange('fullname', e.target.value)}
          />
        </div>

        <div className="relative">
          <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
          <input
            className="mt-1 block w-full rounded-md border border-gray-300 focus:border-indigo-600 focus:outline-none p-2 pl-10"
            id="email"
            type="email"
            name="email"
            placeholder="Email address"
            required
            value={user?.email ?? ''}
            onChange={(e) => onChange('email', e.target.value)}
          />
        </div>

        <div className="relative">
          <FaPhone className="absolute left-3 top-3 text-gray-400" />
          <input
            className="mt-1 block w-full rounded-md border border-gray-300 focus:border-indigo-600 focus:outline-none p-2 pl-10"
            id="phone"
            type="tel"
            name="phone"
            placeholder="Phone"
            required
            value={user?.phone ?? ''}
            onChange={(e) => onChange('phone', e.target.value)}
          />
        </div>

        <div>
          <button
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="submit"
          >
            {user?._id ? 'Update User' : 'Add User'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
