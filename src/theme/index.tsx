import React, { useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import * as MUIlocales from '@mui/material/locale';
import { useTranslation } from 'react-i18next';
import { locales } from '../constants';

type SupportedLocales = keyof typeof MUIlocales;

const theme = createTheme({
  palette: {
    primary: {
      main: '#7ac5c5',
    },
    secondary: {
      main: '#ffd803',
    },
    background: {
      paper: '#e3f6f5',
      default: '#fffffe',
    },
    error: {
      main: '#ff2a1b',
    },
    text: {
      primary: '#272343',
      secondary: '#2d334a',
    },
  },
});

export default function ThemeLocalesProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();

  const themeWithLocale = useMemo(() => {
    const lng = locales.find((locale) => locale.name === i18n.language)?.MUIname || 'enUS';

    return createTheme(theme, MUIlocales[lng as SupportedLocales]);
  }, [i18n.language]);

  return <ThemeProvider theme={themeWithLocale}>{children}</ThemeProvider>;
}
