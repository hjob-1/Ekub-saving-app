// routes.js

import Register from '../pages/public/Register';
import Login from '../pages/public/Login';
import VerifyEmail from '../pages/public/VerifyEmail';
import ForgotPassword from '../pages/public/ForgotPassword';
import ResetPassword from '../pages/public/ResetPassword';
import UserManagement from '../pages/app/addMember/member';
import SavingPlans from '../pages/app/savingPlan/SavingPlan';

const routes = [
  {
    path: '/user/dashboard2',
    element: <h1>This is layout</h1>,
    protected: true,
  },
  {
    path: '/user/addmember',
    element: <UserManagement />,
    protected: true,
  },
  {
    path: '/user/saving-plan',
    element: <SavingPlans />,
    protected: true,
  },
  {
    path: '/user/login',
    element: <Login />,
  },
  {
    path: '/user/register',
    element: <Register />,
  },
  {
    path: '/user/verify-email',
    element: <VerifyEmail />,
  },
  {
    path: 'user/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/user/reset-password',
    element: <ResetPassword />,
  },
];
export default routes;
