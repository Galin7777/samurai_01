import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { toggleProfileLoading } from '../redux/profile-reducer';

export const withAuthRedirect = (Component) => {
  return (props) => {
    const isAuth = useSelector((state) => state.auth.isAuth);
    if (!isAuth && !toggleProfileLoading) return <Navigate to={'/login'} />;
    return <Component {...props} />;
  };
};
