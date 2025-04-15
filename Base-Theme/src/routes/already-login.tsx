import { Navigate, AuthService } from 'experro-storefront';

const AlreadyLogin: any = ({ Component, path }: any) => {
  if (AuthService.isUserLoggedIn()) return <Navigate to={path} replace />;
  else return <Component />;
};

export default AlreadyLogin;
