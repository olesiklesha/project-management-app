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

export const AUTH = 'AUTH';

export const TOKEN_LIFETIME = 24;

export const TEAM_INFO = [
  {
    avatar: './alex.jpg',
    name: 'Alex',
    description: `pages.welcomePage.teamDescriptions.Alex`,
    gh: 'https://github.com/olesiklesha',
  },
  {
    avatar: './tyoma.jpg',
    name: 'Artyom',
    description: `pages.welcomePage.teamDescriptions.Artyom`,
    gh: 'https://github.com/ArtyomKr',
  },
  {
    avatar: './roma.jpg',
    name: 'Roma',
    description: `pages.welcomePage.teamDescriptions.Roma`,
    gh: 'https://github.com/romasho',
  },
];

export const locales = [
  { name: 'en-EN', nativeName: 'Engish', MUIname: 'enUs' },
  { name: 'ru-RU', nativeName: 'Руcский', MUIname: 'ruRU' },
];
