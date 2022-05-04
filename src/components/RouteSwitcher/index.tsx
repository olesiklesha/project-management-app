import { isAuth } from '../../utils';
import { Navigate } from 'react-router-dom';
import { AppRoutes } from '../../constants';

export default function RouteSwitcher() {
  const auth = isAuth();

  return auth ? <Navigate to={AppRoutes.MAIN} /> : <Navigate to={AppRoutes.WELCOME} />;
}
