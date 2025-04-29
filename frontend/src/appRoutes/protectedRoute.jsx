import { useContext, useEffect } from 'react';
import { AppContext } from '../context/applicationContext';
import { useNavigate } from 'react-router';
import { sessionApi } from '../util/ApiUtil';

// protected route component to check if the user is logged in
const ProtectedRoute = ({ children }) => {
  const appContext = useContext(AppContext);
  const token = appContext.getSession();
  const userData = appContext.getUserData();
  const navigate = useNavigate();
  const getSession = async () => {
    const apiResponse = await sessionApi(token);
    if (apiResponse.status === 1) {
      appContext.setUserData(apiResponse.payload.user);
    }
  };
  useEffect(() => {
    if (token && !userData) {
      getSession();
    }
    if (!token && !userData) {
      navigate('/user/login');
    }
  }, []);

  if (!token && !userData) return null;
  return <>{children}</>;
};

export default ProtectedRoute;
