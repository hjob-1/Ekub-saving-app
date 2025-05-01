import React from 'react';
import { Link } from 'react-router';
import { FaUser, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa';
import { registerApi } from '../../util/ApiUtil';
import { notify } from '../../util/notify';
import Logo from '../../components/logo';
import FormInput from '../../components/FormInput';
import useValidation from '../../hooks/useValidation';

const Register = () => {
  const validationRules = {
    fullname: {
      label: 'Full name',
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      label: 'Email',
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address',
    },
    phone: {
      label: 'Phone',
      required: true,
      pattern: /^[\d\s+-]{10,15}$/,
      message: 'Please enter a valid phone number',
    },
    password: {
      label: 'Password',
      required: true,
      minLength: 6,
      message: 'Password must be at least 6 characters',
    },
    confirmPassword: {
      label: 'Confirm password',
      required: true,
      validate: (value, values) =>
        value === values.password || 'Passwords do not match',
    },
  };

  const {
    values: formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useValidation(
    {
      fullname: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validationRules,
  );

  const onSubmit = async () => {
    const response = await registerApi(
      formData.fullname,
      formData.email,
      formData.phone,
      formData.password,
    );
    notify(response);
    resetForm();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start md:justify-center p-4 pt-15 bg-gradient-to-br from-blue-100 to-purple-100">
      <Logo />
      <div className="bg-white rounded-xl p-8 w-full max-w-sm shadow-[0px_3px_35px_rgba(0,0,0,0.01),0px_3px_25px_rgba(0,0,0,0.08)]">
        <form onSubmit={(e) => handleSubmit(e, onSubmit)} className="space-y-4">
          <FormInput
            name="fullname"
            type="text"
            placeholder="Full name"
            value={formData.fullname}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.fullname}
            touched={touched.fullname}
            icon={<FaUser />}
          />

          <FormInput
            name="email"
            type="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
            touched={touched.email}
            icon={<FaEnvelope />}
          />

          <FormInput
            name="phone"
            type="tel"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.phone}
            touched={touched.phone}
            icon={<FaPhone />}
          />

          <FormInput
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
            touched={touched.password}
            icon={<FaLock />}
          />

          <FormInput
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.confirmPassword}
            touched={touched.confirmPassword}
            icon={<FaLock />}
          />

          <div>
            <button
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              type="submit"
              disabled={Object.values(errors).some((error) => !!error)}
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/user/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
