export enum AppRoutes {
  R_SWITCHER = '/',
  WELCOME = '/welcome',
  ERROR = '*',
  EDIT = '/app/edit-profile',
  APP = '/app/',
  MAIN = '/app/boards',
  LOG_IN = '/log-in',
  SIGN_IN = '/sign-in',
  BOARD = '/app/boards/:id',
}

export const LS_LOGIN = 'rss-cream-login-value';

export interface ITEAM_INFO {
  avatar: string;
  name: string;
  description: string;
}

export const TEAM_INFO: ITEAM_INFO[] = [
  {
    avatar: './alex.jpg',
    name: 'Alex',
    description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam dolorum eum
excepturi consectetur, molestias ut velit itaque autem aliquid minima laboriosam
voluptas voluptates, quas quia fugit obcaecati, culpa illo! Ab?`,
  },
  {
    avatar: './tyoma.jpg',
    name: 'Artyom',
    description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam dolorum eum
excepturi consectetur, molestias ut velit itaque autem aliquid minima laboriosam
voluptas voluptates, quas quia fugit obcaecati, culpa illo! Ab?`,
  },
  {
    avatar: './roma.jpg',
    name: 'Roma',
    description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam dolorum eum
excepturi consectetur, molestias ut velit itaque autem aliquid minima laboriosam
voluptas voluptates, quas quia fugit obcaecati, culpa illo! Ab?`,
  },
];

export const locales = [
  { name: 'en-EN', nativeName: 'Eng', MUIname: 'enUs' },
  { name: 'ru-RU', nativeName: 'Руc', MUIname: 'ruRU' },
];
