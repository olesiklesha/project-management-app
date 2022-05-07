import React from 'react';
import { useTranslation } from 'react-i18next';

function Edit() {
  const { t } = useTranslation();

  return <h1>{t('pages.editPage.title')}</h1>;
}

export default Edit;
