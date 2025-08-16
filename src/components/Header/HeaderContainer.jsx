import { useEffect } from 'react';
import { Header } from './Header';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
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
    if (!isAuth) {
      navigate('/login');
    }
  }, [userId, isAuth, navigate]);

  return <Header isAuth={isAuth} login={login} logout={handleLogout} />;
};
