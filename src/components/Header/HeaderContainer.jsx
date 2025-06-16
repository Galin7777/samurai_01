import { useEffect } from 'react';
import { Header } from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthUserData } from '../../redux/auth-reduser';
import { logout } from '../../redux/auth-reduser';
import { useNavigate } from 'react-router-dom';


export const HeaderContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuth, login, userId } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(getAuthUserData());
  }, [dispatch]);

  useEffect(() => {
    if (!userId && !isAuth) {
      navigate('/login');
    }
  }, [userId, navigate]);

  return <Header isAuth={isAuth} login={login} logout={handleLogout} />;
};
