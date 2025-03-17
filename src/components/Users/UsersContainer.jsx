import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Users } from './Users'

export const UsersContainer = () => {
  const dispatch = useDispatch();
  const { users } = useSelector(store => store.usersPage);

const follow = (userId) => {
  dispatch({ type: 'FOLLOW', userId });
};

const unfollow = (userId) => {
  dispatch({ type: 'UNFOLLOW', userId });
};

const setUsers = (users) => {
  dispatch({ type: 'SET_USERS', users })
};

return (<Users users={users}
              follow={follow}
              unfollow={unfollow}
              setUsersAC={setUsers}
    />
  );
};
