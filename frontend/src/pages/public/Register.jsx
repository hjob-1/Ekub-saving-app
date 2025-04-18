import React, { useState } from 'react';
import { Link } from 'react-router';
import { FaUser, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa';

import { registerApi } from '../../util/ApiUtil';
import { notify } from '../../util/notify';
import Logo from '../../components/logo';

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    const response = await registerApi(
      formData.fullname,
      formData.email,
      formData.phone,
      formData.password,
    );
    notify(response);
    // clear the fields

    setFormData(() => ({
      fullname: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start md:justify-center p-4 pt-15 bg-gradient-to-br from-blue-100 to-purple-100">
      <Logo />
      <div className="bg-white rounded-xl  p-8 w-full max-w-sm shadow-[0px_3px_35px_rgba(0,0,0,0.01),0px_3px_25px_rgba(0,0,0,0.08)]">
        <form className="space-y-4">
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              className="mt-1 block w-full rounded-md border border-gray-300 focus:border-indigo-600 focus:outline-none p-2 pl-10"
              id="name"
              type="text"
              name="fullname"
              placeholder="Full name"
              required
              value={formData.fullname}
              onChange={handleChange}
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
              value={formData.email}
              onChange={handleChange}
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
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              className="mt-1 block w-full rounded-md border border-gray-300 focus:border-indigo-600 focus:outline-none p-2 pl-10"
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              className="mt-1 block w-full rounded-md border border-gray-300 focus:border-indigo-600 focus:outline-none p-2 pl-10"
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="submit"
              onClick={handleSubmit}
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="user/login"
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
