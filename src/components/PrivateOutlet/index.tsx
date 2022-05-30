import { isAuth } from '../../utils';
import { Header, Footer } from '..';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateOutlet() {
  const auth = isAuth();

  return auth ? (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  ) : (
    <Navigate to="/" />
  );
}
