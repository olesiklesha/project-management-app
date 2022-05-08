export enum AppRoutes {
  R_SWITCHER = '/',
  WELCOME = '/welcome',
  ERROR = '*',
  EDIT = '/app/edit-profile',
  APP = '/app/',
  MAIN = '/app/boards',
  LOG_IN = '/log-in',
  SIGN_UP = '/sign-up',
  BOARD = '/app/boards/:id',
}

export const LS_LOGIN = 'rss-cream-login-value';

export const locales = [
  { name: 'en-EN', nativeName: 'Eng', MUIname: 'enUs' },
  { name: 'ru-RU', nativeName: 'Руc', MUIname: 'ruRU' },
];
