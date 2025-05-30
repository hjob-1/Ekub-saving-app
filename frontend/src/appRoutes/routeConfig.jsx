// routes.js

import Register from '../pages/public/Register';
import Login from '../pages/public/Login';
import VerifyEmail from '../pages/public/VerifyEmail';
import ForgotPassword from '../pages/public/ForgotPassword';
import ResetPassword from '../pages/public/ResetPassword';

import SavingPlans from '../pages/app/SavingPlan';
import SavingPlanDetailPage from '../pages/app/SavingPlanDetailPage';
import Dashboard from '../pages/app/dashboard';
import UserManagement from '../pages/app/member';
import Unauthorized from '../pages/app/Unauthorized';

const routes = [
  {
    path: '/user/saving-plan/:id',
    element: <SavingPlanDetailPage />,
    protected: true,
  },
  {
    path: '/user/members',
    element: <UserManagement />,
    protected: true,
  },
  {
    path: '/user/saving-plans',
    element: <SavingPlans />,
    protected: true,
  },
  {
    path: '/user/',
    element: <Dashboard />,
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
    path: '/user/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/user/reset-password',
    element: <ResetPassword />,
  },
  {
    path: '/user/unauthorized',
    element: <Unauthorized />,
  },
];
export default routes;
