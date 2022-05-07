import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Stack, Typography } from '@mui/material';
import LangSwitch from './switch.styled';

function LocaleSwitcher() {
  const { i18n } = useTranslation();
  const [checked, setChecked] = useState(i18n.language !== 'en-EN');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  useEffect(() => {
    checked ? i18n.changeLanguage('ru-RU') : i18n.changeLanguage('en-EN');
  }, [checked, i18n]);

  return (
    <Stack direction="row" spacing={0.5} alignItems="center" sx={{ marginRight: '5px' }}>
      <Typography sx={{ fontWeight: 'bold', fontSize: '14px' }}>En</Typography>
      <LangSwitch checked={checked} onChange={handleChange} />
      <Typography sx={{ fontWeight: 'bold', fontSize: '14px' }}>Ru</Typography>
    </Stack>
  );
}

export default LocaleSwitcher;
