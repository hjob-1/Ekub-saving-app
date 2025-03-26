import Register from '../pages/public/Register';
import Login from '../pages/public/Login';
import { Navigate, Route, Routes } from 'react-router';
import VerifyEmail from '../pages/public/VerifyEmail';
import ForgotPassword from '../pages/public/ForgotPassword';
import ResetPassword from '../pages/public/ResetPassword';
const AppRoutes = () => {
  return (
    <Routes>
      <Route exact path="/user/login" element={<Login />} />
      <Route exact path="/user/register" element={<Register />} />
      <Route exact path="/user/verify-email" element={<VerifyEmail />} />
      <Route exact path="/user/forgot-password" element={<ForgotPassword />} />
      <Route exact path="/user/reset-password" element={<ResetPassword />} />
      <Route path="*" element={<Navigate to="/user/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
