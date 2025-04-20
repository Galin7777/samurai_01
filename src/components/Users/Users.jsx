import React from 'react';
import classes from './Users.module.scss';
import userPhoto from '../../../src/assets/images/avatar.jpg';
import { NavLink } from 'react-router-dom';

export const Users = ({ users, currentPage, pages, onPageChanged, follow, unfollow, portionSize }) => {
  const portionNumber = Math.ceil(currentPage / portionSize);
  const startIndex = (portionNumber - 1) * portionSize;
  const paginatedPages = pages.slice(startIndex, startIndex + portionSize);

  return (
    <div className={classes.usersContainer}>
      {/* Пагинация с порциями и стрелками */}
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
            <NavLink to={'/profile/' + user.id}>
              <img src={user.photos.small || userPhoto} alt='avatar' />
            </NavLink>
            <button
              className={user.followed ? classes.unfollowButton : classes.followButton}
              onClick={() => (user.followed ? unfollow(user.id) : follow(user.id))}
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
