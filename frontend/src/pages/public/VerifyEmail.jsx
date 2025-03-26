import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useSearchParams } from 'react-router';
import { verifyEmailApi } from '../../util/ApiUtil';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('Verifying your account...');

  const verifyAccount = async (token) => {
    console.log(token);
    const apiResponse = await verifyEmailApi(token);
    console.log(apiResponse);
    if (apiResponse.status === 1) {
      setMessage('Your account has been verified.');
    } else {
      setMessage(apiResponse.payLoad.message);
    }
  };
  useEffect(() => {
    document.title = 'Verify Email | Feed App';

    const verifyToken = searchParams.get('token');

    if (verifyToken) {
      verifyAccount(verifyToken);
    } else {
      setMessage('Invalid verification request.');
    }
  }, []);
  return (
    <div className="bg-white">
      <div className="flex justify-center h-screen">
        <div className="flex items-center w-full mx-auto lg:w-full mt-20 md:mt-0 px-10 md:px-36">
          <div className="flex-1">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-center text-gray-700">
                Account Verification
              </h2>

              <p className="mt-3 text-gray-500 mb-10">{message}</p>

              <Link
                to="/user/login"
                className="w-52 p-4 tracking-wide text-white transition duration-200 transform bg-blue-600 rounded-md shadow-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                Click to Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
