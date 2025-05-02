// hooks/useAuth.js

const useAuth = (user, allowedRoles = ['admin', 'manager']) => {
  return {
    isAuthorized: user && allowedRoles.includes(user.role),
  };
};

export default useAuth;
