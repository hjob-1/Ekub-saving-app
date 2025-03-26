import React from 'react';
import Register from './pages/public/Register';
import Login from './pages/public/Login';
import ForgotPassword from './pages/public/ForgotPassword';
import ResetPassword from './pages/public/ResetPassword';
import AppRoutes from './appRoutes/routes';
import { BrowserRouter as Router } from 'react-router';
import AppContextProvider from './context/applicationContext';
import { CookiesProvider } from 'react-cookie';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <CookiesProvider>
      <AppContextProvider>
        <Toaster />
        <Router>
          <AppRoutes />
        </Router>
      </AppContextProvider>
    </CookiesProvider>
  );
}

export default App;
