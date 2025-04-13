import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Users } from './Users';
import { setUsersAC } from '../../redux/users-reduser';
import { setCurrentPageAC } from '../../redux/users-reduser';
import { setTotalUsersCountAC } from '../../redux/users-reduser';
import { toggleIsFetchingAC } from '../../redux/users-reduser';
import { Preloader } from '../common/Preloader/Preloader';


export const UsersContainer = () => {
  const dispatch = useDispatch();
  const { users, currentPage, totalUsersCount, pageSize, isFetching } = useSelector((store) => store.usersPage);

  const fetchUsers = async (pageNumber) => {
    dispatch(toggleIsFetchingAC(true));
    try {
      const response = await axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${pageSize}`);
      dispatch(setUsersAC(response.data.items));
      dispatch(setTotalUsersCountAC(response.data.totalCount));
    } catch (error) {
      console.error('Ошибка при загрузке пользователей:', error);
    }
    dispatch(toggleIsFetchingAC(false));
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [dispatch, currentPage, pageSize]);

  const follow = (userId) => dispatch({ type: 'FOLLOW', userId });
  const unfollow = (userId) => dispatch({ type: 'UNFOLLOW', userId });

  const onPageChanged = (pageNumber) => {
    dispatch(setCurrentPageAC(pageNumber));
    fetchUsers(pageNumber);
  };

  // Генерация страниц с порционной пагинацией (10 страниц за раз)
  const pagesCount = Math.ceil(totalUsersCount / pageSize);
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <>
      {isFetching ? <Preloader /> : (
        <Users
          users={users}
          currentPage={currentPage}
          pages={pages}
          onPageChanged={onPageChanged}
          follow={follow}
          unfollow={unfollow}
          portionSize={10} // Размер порции страниц
        />
      )}
    </>
  );
};
