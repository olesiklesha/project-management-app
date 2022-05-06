import React, { ChangeEvent, useState } from 'react';
import { AppRoutes, LS_LOGIN } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function SigninPage() {
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
      <h1>{t('pages.signInPage.title')}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          {t('pages.signInPage.name')}:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <button type="submit">{t('pages.signInPage.signInButton')}</button>
      </form>
    </>
  );
}

export default SigninPage;
