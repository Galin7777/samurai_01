import React, { useEffect } from 'react';
import { Header } from './Header';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUserData } from '../../redux/auth-reduser';

export const HeaderContainer = () => {
  const dispatch = useDispatch();

  const { isAuth, login } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        const response = await axios.get('https://social-network.samuraijs.com/api/1.0/auth/me', {
          withCredentials: true,
        });

        if (response.data.resultCode === 0) {
          const { id, email, login } = response.data.data;
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
