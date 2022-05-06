import { useTranslation } from 'react-i18next';

function ErrorPage() {
  const { t } = useTranslation();

  return <div>{t('pages.page404.message')}</div>;
}

export default ErrorPage;
