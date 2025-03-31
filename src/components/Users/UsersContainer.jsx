import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Users } from './Users';
import { setUsersAC } from '../../redux/users-reduser';
import { setCurrentPageAC } from '../../redux/users-reduser'
import { setTotalUsersCountAC } from '../../redux/users-reduser';

export const UsersContainer = (props) => {
  const dispatch = useDispatch();
  const { users, currentPage, totalUsersCount, pageSize } = useSelector(store => store.usersPage);

  useEffect(() => {
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${props.currentPage}&count=${props.pageSize}`)
      .then(response => {
        dispatch(setUsersAC(response.data.items));
        dispatch(setTotalUsersCountAC(response.data.totalCount));
      })
      .catch(error => console.error('Ошибка при загрузке пользователей:', error));
  }, [dispatch, props.currentPage, props.pageSize]);
  
const follow = (userId) => {
  dispatch({ type: 'FOLLOW', userId });
};

const unfollow = (userId) => {
  dispatch({ type: 'UNFOLLOW', userId });
};

const onPageChanged = (pageNumber) => {
  dispatch(setCurrentPageAC(pageNumber));

  axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${pageSize}`)
    .then(response => {
      dispatch(setUsersAC(response.data.items));
    });
};

return (<Users users={users}
              currentPage={currentPage}
              totalUsersCount={totalUsersCount}
              pageSize={pageSize}
              onPageChanged={onPageChanged}
              follow={follow}
              unfollow={unfollow}
    />
  );
};
