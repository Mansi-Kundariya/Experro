import { Navigate, AuthService } from 'experro-storefront';

const ProtectedRoute = ({ children }: any) => {
  if (!AuthService.isUserLoggedIn()) {
    return <Navigate to="/login/" replace />;
  }
  return children;
};

export default ProtectedRoute;
