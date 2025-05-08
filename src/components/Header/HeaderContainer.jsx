import React, { useEffect } from 'react';
import { Header } from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUserData } from '../../redux/auth-reduser';
import { authAPI } from '../../api/api';

export const HeaderContainer = () => {
  const dispatch = useDispatch();

  const { isAuth, login } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        const response = await authAPI.getHeaders();

        if (response.resultCode === 0) {
          const { id, email, login } = response.data;
          dispatch(setAuthUserData(id, email, login));
        }
      } catch (error) {
        console.error('Ошибка при получении авторизационных данных:', error);
      }
    };

    fetchAuthData();
  }, [dispatch]);

  return <Header isAuth={isAuth} login={login} />;
};
