// hooks/useAuth.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const useAuth = (user, allowedRoles = ['admin', 'manager']) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !allowedRoles.includes(user.role)) {
      navigate('/unauthorized');
    }
  }, [user, allowedRoles, navigate]);

  return {
    isAuthorized: user && allowedRoles.includes(user.role),
  };
};

export default useAuth;
