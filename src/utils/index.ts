import { LS_LOGIN } from '../constants';

export const isAuth = () => Boolean(window.localStorage.getItem(LS_LOGIN));
