import React, { useState } from 'react';
import classes from './Users.module.scss';
import { useDispatch } from 'react-redux';
import userPhoto from '../../../src/assets/images/avatar.jpg';
import { NavLink } from 'react-router-dom';
import { followAC } from '../../redux/users-reduser';
import { unfollowAC } from '../../redux/users-reduser';
import { followAPI } from '../../api/api';

export const Users = ({ users, currentPage, pages, onPageChanged, portionSize, fetchUsers }) => {
  const dispatch = useDispatch();
  const [loadingIds, setLoadingIds] = useState([]);

  // const API_URL = 'https://social-network.samuraijs.com/api/1.0/';
  // const API_KEY = '96903f6e-7c99-43f5-8eb7-569b44830df5';

  const portionNumber = Math.ceil(currentPage / portionSize);
  const startIndex = (portionNumber - 1) * portionSize;
  const paginatedPages = pages.slice(startIndex, startIndex + portionSize);

  const handleFollow = async (userId) => {
    setLoadingIds((prev) => [...prev, userId]);

    try {
      const response = await followAPI.postFollow(userId);

      if (response.resultCode === 0) {
        dispatch(followAC(userId));
        await fetchUsers(); // обновляем список после Follow
      }
    } catch (error) {
      console.error('Ошибка при подписке:', error);
    } finally {
      setLoadingIds((prev) => prev.filter((id) => id !== userId));
    }
  };

  const handleUnfollow = async (userId) => {
    setLoadingIds((prev) => [...prev, userId]);

    try {
      const response = await followAPI.deleteFollow(userId);

      if (response.resultCode === 0) {
        dispatch(unfollowAC(userId));
        await fetchUsers(); // обновляем список после Unfollow
      }
    } catch (error) {
      console.error('Ошибка при отписке:', error);
    } finally {
      setLoadingIds((prev) => prev.filter((id) => id !== userId));
    }
  };

  return (
    <div className={classes.usersContainer}>
      {/* Пагинация */}
      <div>
        {startIndex > 0 && (
          <button onClick={() => onPageChanged(startIndex)}>{'<'}</button>
        )}

        {paginatedPages.map((p) => (
          <span
            key={p}
            className={currentPage === p ? classes.selectedPage : ''}
            onClick={() => onPageChanged(p)}
          >
            {p}
          </span>
        ))}

        {startIndex + portionSize < pages.length && (
          <button onClick={() => onPageChanged(startIndex + portionSize + 1)}>{'>'}</button>
        )}
      </div>

      {/* Список пользователей */}
      {users.map((user) => (
        <div key={user.id} className={classes.userCard}>
          <div className={classes.avatar}>
            <NavLink to={`/profile/${user.id}`}>
              <img src={user.photos.small || userPhoto} alt='avatar' />
            </NavLink>
            <button
              // disabled = {loadingIds.includes(user.id)}
              className={user.followed ? classes.unfollowButton : classes.followButton}
              onClick={() => user.followed ? handleUnfollow(user.id) : handleFollow(user.id)}
            >
              {user.followed ? 'Unfollow' : 'Follow'}
            </button>
          </div>
          <div className={classes.userInfo}>
            <div className={classes.name}>{user.name}</div>
            <div className={classes.userStatus}>{user.status}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
