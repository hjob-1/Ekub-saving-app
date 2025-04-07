import { Navigate, Route, Routes } from 'react-router';
import AppLayout from '../pages/app/layout';
import ProtectedRoute from './protectedRoute';
import routes from './routeConfig';
const AppRoutes = () => {
  return (
    <Routes>
      {routes.map(({ path, element, protected: isProtected }) => (
        <Route
          key={path}
          path={path}
          element={
            isProtected ? (
              <ProtectedRoute>
                <AppLayout>{element}</AppLayout>
              </ProtectedRoute>
            ) : (
              element
            )
          }
        />
      ))}
      <Route path="*" element={<Navigate to="/user/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
