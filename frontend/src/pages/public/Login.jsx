import React, { useState } from 'react';
import { Link } from 'react-router';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { GiPayMoney } from 'react-icons/gi';
import { notify } from '../../util/notify';
import { loginApi } from '../../util/ApiUtil';
import Logo from '../../components/logo';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [res, setRes] = useState();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await loginApi(formData.email, formData.password);
    notify(response);
    setRes(response.payload.message);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start md:justify-center p-4 pt-15">
      <Logo />
      {res}
      <div className="bg-white rounded-xl  p-8 w-full max-w-sm shadow-[0px_3px_35px_rgba(0,0,0,0.01),0px_3px_25px_rgba(0,0,0,0.08)]">
        <form className="space-y-4">
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              className="mt-1 block w-full rounded-md border border-gray-300 focus:border-indigo-600 focus:outline-none p-2 pl-10"
              id="email"
              type="email"
              name="email"
              placeholder="Email address"
              required
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
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="submit"
              onClick={handleSubmit}
            >
              Sign In
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/user/forgot-password"
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            Forgot password?
          </Link>
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/user/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
