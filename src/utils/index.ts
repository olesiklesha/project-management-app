import { AUTH, TOKEN_LIFETIME } from '../constants';
import { IBoard, IRequestError, IUserData } from '../models';

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
  if ('error' in error) return `${t('api.errors.message')}: ${error.error}`;
  if ('status' in error) return `${t('api.errors.status')}: ${error.status}`;
  return t('api.errors.default');
}

export function getCurrentUser(data: IUserData[]) {
  const { login } = getLocalAuth();
  return data.find((user) => user.login === login) ?? { id: '', login, name: '' };
}

export function logOut() {
  window.localStorage.removeItem(AUTH);
}

export function sortBoards(x: IBoard, y: IBoard) {
  return x.title.localeCompare(y.title);
}

export function changeElOrder<T>(arr: Array<T>, from: number, to: number) {
  const cloneArr = arr.slice();
  const moved = cloneArr.splice(from, 1);
  cloneArr.splice(to, 0, moved[0]);
  return cloneArr;
}
