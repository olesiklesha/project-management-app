import { AUTH, TOKEN_LIFETIME } from '../constants';
import { IColumnData, IColumnTask, IRequestError, IUserData } from '../models';

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
  return data.find((user) => user.login === login) || { id: '', login, name: '' };
}

export function logOut() {
  window.localStorage.removeItem(AUTH);
}

export function getNextOrder(data: IColumnData[], columnsId = '') {
  if (!data.length) return 1;
  let orders: number[];

  if (columnsId) {
    const column = data.find((el) => el.id === columnsId);

    if (!column) return 1;

    const { tasks } = column;

    if (!tasks.length) return 1;

    orders = tasks.map((el) => el.order);
  } else {
    orders = data.map((el) => el.order);
  }

  orders.sort((a, b) => b - a);
  return orders[0] + 1;
}

export function sortByOrder(data: IColumnData[]) {
  if (!data.length) return data;
  const arr = [...data];
  // console.log(arr.sort((a, b) => Number(a.order) - Number(b.order)));
  return arr.sort((a, b) => a.order - b.order);
}
