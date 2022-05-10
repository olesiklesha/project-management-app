import { AUTH, TOKEN_LIFETIME } from '../constants';

export function getLocalAuth() {
  const localStorageAuth = window.localStorage.getItem(AUTH);
  return localStorageAuth ? JSON.parse(localStorageAuth) : null;
}

export function isAuth() {
  const auth = getLocalAuth();
  if (auth) {
    const hours = Math.floor((Date.now() - auth.tokenDate) / (3600 * 1000));
    console.log(hours);
    return hours < TOKEN_LIFETIME;
  } else return false;
}
