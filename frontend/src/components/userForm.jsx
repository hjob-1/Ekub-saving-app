// import { FaEnvelope, FaPhone, FaUser } from 'react-icons/fa';

// const UserForm = ({ user = {}, onChange, onSubmit }) => {
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit();
//   };

//   return (
//     <div className="bg-white rounded-xl p-8 w-full max-w-sm shadow-[0px_3px_35px_rgba(0,0,0,0.01),0px_3px_25px_rgba(0,0,0,0.08)]">
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <h2 className="text-xl font-bold mb-4 text-center">
//           {user?._id ? 'Edit Member' : 'Add New Member'}
//         </h2>

//         <div className="relative">
//           <FaUser className="absolute left-3 top-3 text-gray-400" />
//           <input
//             className="mt-1 block w-full rounded-md border border-gray-300 focus:border-indigo-600 focus:outline-none p-2 pl-10"
//             id="name"
//             type="text"
//             name="fullname"
//             placeholder="Full name"
//             required
//             value={user?.fullname ?? ''}
//             onChange={(e) => onChange('fullname', e.target.value)}
//           />
//         </div>

//         <div className="relative">
//           <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
//           <input
//             className="mt-1 block w-full rounded-md border border-gray-300 focus:border-indigo-600 focus:outline-none p-2 pl-10"
//             id="email"
//             type="email"
//             name="email"
//             placeholder="Email address"
//             required
//             value={user?.email ?? ''}
//             onChange={(e) => onChange('email', e.target.value)}
//           />
//         </div>

//         <div className="relative">
//           <FaPhone className="absolute left-3 top-3 text-gray-400" />
//           <input
//             className="mt-1 block w-full rounded-md border border-gray-300 focus:border-indigo-600 focus:outline-none p-2 pl-10"
//             id="phone"
//             type="tel"
//             name="phone"
//             placeholder="Phone"
//             required
//             value={user?.phone ?? ''}
//             onChange={(e) => onChange('phone', e.target.value)}
//           />
//         </div>

//         <div>
//           <button
//             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             type="submit"
//           >
//             {user?._id ? 'Update User' : 'Add User'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UserForm;

import {
  FaEnvelope,
  FaPhone,
  FaUser,
  FaExclamationCircle,
} from 'react-icons/fa';
import { useState, useEffect } from 'react';

const UserForm = ({ user = {}, onChange, onSubmit }) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    // Initialize touched state when user data loads (for edit mode)
    if (user?._id) {
      setTouched({
        fullname: true,
        email: true,
        phone: true,
      });
    }
  }, [user]);

  const validate = (field, value) => {
    const newErrors = { ...errors };

    switch (field) {
      case 'fullname':
        if (!value.trim()) {
          newErrors.fullname = 'Full name is required';
        } else if (value.trim().length < 2) {
          newErrors.fullname = 'Name must be at least 2 characters';
        } else {
          delete newErrors.fullname;
        }
        break;

      case 'email':
        if (!value) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Please enter a valid email';
        } else {
          delete newErrors.email;
        }
        break;

      case 'phone':
        if (!value) {
          newErrors.phone = 'Phone number is required';
        } else if (!/^[\d\s+-]{10,15}$/.test(value)) {
          newErrors.phone = 'Please enter a valid phone number (10-15 digits)';
        } else {
          delete newErrors.phone;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    onChange(field, value);
    if (touched[field]) {
      validate(field, value);
    }
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    validate(field, user[field] || '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields as touched to show errors
    const allTouched = {
      fullname: true,
      email: true,
      phone: true,
    };
    setTouched(allTouched);

    // Validate all fields
    const isValid = Object.keys(allTouched).every((field) => {
      validate(field, user[field] || '');
      return !errors[field];
    });

    if (isValid) {
      onSubmit();
    }
  };

  return (
    <div className="bg-white rounded-xl p-8 w-full max-w-sm shadow-[0px_3px_35px_rgba(0,0,0,0.01),0px_3px_25px_rgba(0,0,0,0.08)]">
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <h2 className="text-xl font-bold mb-4 text-center">
          {user?._id ? 'Edit Member' : 'Add New Member'}
        </h2>

        <div className="relative">
          <FaUser className="absolute left-3 top-3 text-gray-400" />
          <input
            className={`mt-1 block w-full rounded-md border ${
              errors.fullname && touched.fullname
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-300 focus:border-indigo-600'
            } focus:outline-none p-2 pl-10`}
            id="name"
            type="text"
            name="fullname"
            placeholder="Full name"
            value={user?.fullname ?? ''}
            onChange={(e) => handleChange('fullname', e.target.value)}
            onBlur={() => handleBlur('fullname')}
          />
          {errors.fullname && touched.fullname && (
            <div className="flex items-center mt-1 text-red-500 text-xs">
              <FaExclamationCircle className="mr-1" />
              <span>{errors.fullname}</span>
            </div>
          )}
        </div>

        <div className="relative">
          <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
          <input
            className={`mt-1 block w-full rounded-md border ${
              errors.email && touched.email
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-300 focus:border-indigo-600'
            } focus:outline-none p-2 pl-10`}
            id="email"
            type="email"
            name="email"
            placeholder="Email address"
            value={user?.email ?? ''}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
          />
          {errors.email && touched.email && (
            <div className="flex items-center mt-1 text-red-500 text-xs">
              <FaExclamationCircle className="mr-1" />
              <span>{errors.email}</span>
            </div>
          )}
        </div>

        <div className="relative">
          <FaPhone className="absolute left-3 top-3 text-gray-400" />
          <input
            className={`mt-1 block w-full rounded-md border ${
              errors.phone && touched.phone
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-300 focus:border-indigo-600'
            } focus:outline-none p-2 pl-10`}
            id="phone"
            type="tel"
            name="phone"
            placeholder="Phone"
            value={user?.phone ?? ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            onBlur={() => handleBlur('phone')}
          />
          {errors.phone && touched.phone && (
            <div className="flex items-center mt-1 text-red-500 text-xs">
              <FaExclamationCircle className="mr-1" />
              <span>{errors.phone}</span>
            </div>
          )}
        </div>

        <div>
          <button
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={Object.keys(errors).length > 0}
          >
            {user?._id ? 'Update User' : 'Add User'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
