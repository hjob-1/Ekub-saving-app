import { useContext, useEffect } from 'react';
import { AppContext } from '../context/applicationContext';
import { useNavigate } from 'react-router';

const ProtectedRoute = ({ children }) => {
  const appContext = useContext(AppContext);
  const token = appContext.getSession();
  const userData = appContext.getUserData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token && !userData) {
      navigate('/user/login');
    }
  }, []);

  if (!token && !userData) return null;
  return <>{children}</>;
};

export default ProtectedRoute;
