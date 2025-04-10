import { useContext } from 'react';
import { AppContext } from './applicationContext';

export const useToken = () => {
  const appContext = useContext(AppContext);
  const token = appContext.getSession();
  return token;
};
