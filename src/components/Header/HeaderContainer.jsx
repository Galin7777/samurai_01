import { useEffect } from 'react';
import { Header } from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthUserData } from '../../redux/auth-reduser';
import { logout } from '../../redux/auth-reduser';


export const HeaderContainer = () => {
  const dispatch = useDispatch();

  const { isAuth, login } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(getAuthUserData());
  }, [dispatch]);

  return <Header isAuth={isAuth} login={login} logout={handleLogout} />;
};
