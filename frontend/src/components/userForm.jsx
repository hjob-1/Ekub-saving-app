import React, { useEffect } from 'react';
import { FaEnvelope, FaPhone, FaUser } from 'react-icons/fa';

import useValidation from '../hooks/useValidation';
import FormInput from './FormInput';

const UserForm = ({ user = {}, onSubmit, onCancel }) => {
  const initialValues = React.useMemo(
    () => ({
      fullname: user?.fullname ?? '',
      email: user?.email ?? '',
      phone: user?.phone ?? '',
    }),
    [user],
  );

  const validationRules = {
    fullname: {
      label: 'Full name',
      required: true,
      minLength: 2,
    },
    email: {
      label: 'Email',
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email',
    },
    phone: {
      label: 'Phone number',
      required: true,
      pattern: /^[\d\s+-]{10,15}$/,
      message: 'Please enter a valid phone number (10-15 digits)',
    },
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    resetForm,
  } = useValidation(initialValues, validationRules);

  useEffect(() => {
    if (user?._id) {
      setValues(initialValues);
    } else {
      resetForm();
    }
  }, [user, setValues, resetForm, initialValues]);

  const submitHandler = (formValues) => {
    onSubmit(formValues);
  };

  return (
    <div className="bg-white rounded-xl p-8 w-full max-w-sm shadow-[0px_3px_35px_rgba(0,0,0,0.01),0px_3px_25px_rgba(0,0,0,0.08)]">
      <form
        onSubmit={(e) => handleSubmit(e, submitHandler)}
        className="space-y-4"
        noValidate
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          {user?._id ? 'Edit Member' : 'Add New Member'}
        </h2>

        <FormInput
          id="name"
          label="Full name"
          name="fullname"
          placeholder="Full name"
          value={values.fullname}
          icon={<FaUser className="text-gray-400" />}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.fullname}
          touched={touched.fullname}
        />

        <FormInput
          id="email"
          label="Email address"
          type="email"
          name="email"
          placeholder="Email address"
          value={values.email}
          icon={<FaEnvelope className="text-gray-400" />}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          touched={touched.email}
        />

        <FormInput
          id="phone"
          label="Phone number"
          type="tel"
          name="phone"
          placeholder="Phone"
          value={values.phone}
          icon={<FaPhone className="text-gray-400" />}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.phone}
          touched={touched.phone}
        />
        <div className="flex flex-col gap-2">
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={Object.values(errors).some((error) => !!error)}
          >
            {user?._id ? 'Update User' : 'Add User'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-indigo-500"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserForm;
