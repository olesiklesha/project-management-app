import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppRoutes, LS_LOGIN } from '../../constants';

function LoginPage() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.localStorage.setItem(LS_LOGIN, name);
    navigate(AppRoutes.MAIN);
  };

  return (
    <>
      <h1>{t('pages.loginPage.title')}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          {t('pages.loginPage.name')}:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <button type="submit">{t('pages.loginPage.logInButton')}</button>
      </form>
    </>
  );
}

export default LoginPage;
