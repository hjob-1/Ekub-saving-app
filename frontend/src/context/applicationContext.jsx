import React, { createElement, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

const AppContext = React.createContext();

const AppContextProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies([
    'appToken',
    'userData',
  ]);
  const [userSessionData, setUserSessionData] = useState(null);
  const [modal, setModal] = useState(null);

  // Initialize user data from cookies on mount
  useEffect(() => {
    const storedUserData = cookies.userData;
    if (storedUserData) {
      try {
        setUserSessionData(storedUserData);
      } catch (e) {
        console.error('Failed to parse user data', e);
        removeCookie('userData', { path: '/' });
      }
    }
  }, [cookies.userData, removeCookie]);

  const openModal = (component, props) => {
    setModal({ component, props });
  };
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
  const setUserData = (userData) => {
    setUserSessionData(userData);
    setCookie('userData', JSON.stringify(userData), {
      path: '/',
      maxAge: 1296000, //2weeks
      secure: true, // HTTPS only
      sameSite: 'strict', // Prevent CSRF
    });
  };

  const getUserData = () => userSessionData;
  const logout = () => {
    removeCookie('appToken', { path: '/' });
    removeCookie('userData', { path: '/' });
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
        openModal,
        setModal,
      }}
    >
      {children}
      {modal && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModal(null);
          }}
        >
          {createElement(modal.component, {
            ...modal.props,
            onClose: () => setModal(null),
          })}
        </div>
      )}
    </AppContext.Provider>
  );
};

export { AppContext };
export default AppContextProvider;
