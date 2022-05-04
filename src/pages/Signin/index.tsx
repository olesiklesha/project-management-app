import React, { ChangeEvent, useState } from 'react';
import { AppRoutes, LS_LOGIN } from '../../constants';
import { useNavigate } from 'react-router-dom';

function SigninPage() {
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
      <h1>This is sign in page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <button type="submit">Log In</button>
      </form>
    </>
  );
}

export default SigninPage;
