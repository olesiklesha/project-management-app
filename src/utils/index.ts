import { LS_LOGIN } from '../constants';
import { useAppSelector } from '../hooks/redux';

function IsAuth() {
  const { token } = useAppSelector((state) => state.auth);
  return Boolean(token);
}

export const isAuth = () => Boolean(window.localStorage.getItem(LS_LOGIN));
