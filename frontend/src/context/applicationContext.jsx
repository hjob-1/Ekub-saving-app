import React, { createElement, useState } from 'react';
import { useCookies } from 'react-cookie';

const AppContext = React.createContext();

const AppContextProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['appToken']);
  const [userSessionData, setUserSessionData] = useState(undefined);
  const [modal, setModal] = useState(null);

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
