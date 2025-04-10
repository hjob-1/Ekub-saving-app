import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

const AppContext = React.createContext();

const AppContextProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['appToken']);
  const [userSessionData, setUserSessionData] = useState(undefined);
  const setSession = (token) => {
    setCookie('appToken', token, {
      path: '/',
      maxAge: 1296000, //2weeks
    });
  };
  const getSession = () => {
    const token = cookies.appToken || null;
    return token;
  };
  const setUserData = (userData) => setUserSessionData(userData);
  const getUserData = () => userSessionData;
  const logout = () => {
    removeCookie('appToken', { path: '/' });
    setUserData(undefined);
  };
  return (
    <AppContext.Provider
      value={{
        setSession,
        getSession,
        setUserData,
        getUserData,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext };
export default AppContextProvider;
