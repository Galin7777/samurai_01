import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Users } from './Users';
import { setUsersAC } from '../../redux/users-reduser';
import { setCurrentPageAC } from '../../redux/users-reduser';
import { setTotalUsersCountAC } from '../../redux/users-reduser';
import { toggleIsFetchingAC } from '../../redux/users-reduser';
import { Preloader } from '../common/Preloader/Preloader';

export const UsersContainer = () => {
  const dispatch = useDispatch();
  const { users, currentPage, totalUsersCount, pageSize, isFetching } = useSelector((store) => store.usersPage);

  useEffect(() => {
    dispatch(toggleIsFetchingAC(true));
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`)
      .then((response) => {
        dispatch(setUsersAC(response.data.items));
        dispatch(setTotalUsersCountAC(response.data.totalCount));
        dispatch(toggleIsFetchingAC(false));
      })
      .catch((error) => {
        console.error('Ошибка при загрузке пользователей:', error);
        dispatch(toggleIsFetchingAC(false));
      });
  }, [dispatch, currentPage, pageSize]);

  const follow = (userId) => {
    dispatch({ type: 'FOLLOW', userId });
  };

  const unfollow = (userId) => {
    dispatch({ type: 'UNFOLLOW', userId });
  };

  const onPageChanged = (pageNumber) => {
    dispatch(setCurrentPageAC(pageNumber));
    dispatch(toggleIsFetchingAC(true));
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${pageSize}`)
      .then((response) => {
        dispatch(setUsersAC(response.data.items));
        dispatch(toggleIsFetchingAC(false));
      })
      .catch(() => dispatch(toggleIsFetchingAC(false)));
  };

  return (
    <>
      {isFetching ? <Preloader />
        : <Users
          users={users}
          currentPage={currentPage}
          totalUsersCount={totalUsersCount}
          pageSize={pageSize}
          onPageChanged={onPageChanged}
          follow={follow}
          unfollow={unfollow}
        />
      }
    </>
  );
};
