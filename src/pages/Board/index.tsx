import React from 'react';
import { useTranslation } from 'react-i18next';

function Board() {
  const { t } = useTranslation();

  return <h1>{t('pages.boardPage.title')}</h1>;
}

export default Board;
