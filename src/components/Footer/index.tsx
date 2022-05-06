import React from 'react';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();

  return <div>{t('components.footer.title')}</div>;
}

export default Footer;
