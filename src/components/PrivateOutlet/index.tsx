import { isAuth } from '../../utils';
import Header from '../Header';
import { Navigate, Outlet } from 'react-router-dom';
import Footer from '../Footer';

export default function PrivateOutlet() {
  const auth = isAuth();

  return auth ? (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  ) : (
    <Navigate to="/" />
  );
}
