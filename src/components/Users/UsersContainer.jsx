import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Users } from './Users';
import { setUsersAC } from '../../redux/users-reduser';
import { setCurrentPageAC } from '../../redux/users-reduser';
import { setTotalUsersCountAC } from '../../redux/users-reduser';
import { toggleIsFetchingAC } from '../../redux/users-reduser';
import { Preloader } from '../common/Preloader/Preloader';
import { usersAPI } from '../../api/api';

export const UsersContainer = () => {
  const dispatch = useDispatch();
  const { users, currentPage, totalUsersCount, pageSize, isFetching } = useSelector((store) => store.usersPage);

  const fetchUsers = async (pageNumber = currentPage) => {
    dispatch(toggleIsFetchingAC(true));
    try {
      const response = await usersAPI.getUsers(pageNumber, pageSize);
      dispatch(setUsersAC(response.items));
      dispatch(setTotalUsersCountAC(response.totalCount));
    } catch (error) {
      console.error('Ошибка при загрузке пользователей:', error);
    }
    dispatch(toggleIsFetchingAC(false));
  };

  useEffect(() => {
    fetchUsers();
  }, [dispatch, currentPage, pageSize]);

  const onPageChanged = (pageNumber) => {
    dispatch(setCurrentPageAC(pageNumber));
    fetchUsers(pageNumber);
  };

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
          portionSize={10}
          fetchUsers={fetchUsers}
        />
      )}
    </>
  );
};
