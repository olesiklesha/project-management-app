import { AUTH, TOKEN_LIFETIME } from '../constants';
import { IRequestError } from '../models/apiModels';

export function getLocalAuth() {
  const localStorageAuth = window.localStorage.getItem(AUTH);
  return localStorageAuth ? JSON.parse(localStorageAuth) : null;
}

export function isAuth() {
  const auth = getLocalAuth();
  if (auth) {
    const hours = Math.floor((Date.now() - auth.tokenDate) / (3600 * 1000));
    return hours < TOKEN_LIFETIME;
  }
  return false;
}

export function apiErrorParser(error: IRequestError, t: (arg0: string) => string) {
  if (!error) return;
  if ('data' in error && 'message' in error.data)
    return `${t('api.errors.message')}: ${error.data.message}`;
  if ('status' in error) return `${t('api.errors.status')}: ${error.status}`;
  return t('api.errors.default');
}
