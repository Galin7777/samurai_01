import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Users } from './Users';
import { setCurrentPageAC } from '../../redux/users-reduser';
import { Preloader } from '../common/Preloader/Preloader';
import { getUsers } from '../../redux/users-reduser';

export const UsersContainer = () => {
  const dispatch = useDispatch();
  const { users, currentPage, totalUsersCount, pageSize, isFetching } = useSelector((store) => store.usersPage);

  useEffect(() => {
    dispatch(getUsers(currentPage, pageSize));
  }, [dispatch, currentPage, pageSize]);

  const onPageChanged = (pageNumber) => {
    dispatch(setCurrentPageAC(pageNumber));
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
        />
      )}
    </>
  );
};
