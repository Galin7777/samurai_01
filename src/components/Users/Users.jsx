import React from 'react';
import classes from './Users.module.scss';
import userPhoto from '../../../src/assets/images/avatar.jpg';

export const Users = (props) => {
  const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  const portionSize = 10;
  const portionNumber = Math.ceil(props.currentPage / portionSize);
  const startIndex = (portionNumber - 1) * portionSize;
  const paginatedPages = pages.slice(startIndex, startIndex + portionSize);

  return (
    <div className={classes.usersContainer}>
      <div>
        {startIndex > 0 && (
          <button onClick={() => props.onPageChanged(startIndex)}>{'<'}</button>
        )}

        {paginatedPages.map((p) => (
          <span
            key={p}
            className={props.currentPage === p ? classes.selectedPage : ''}
            onClick={() => props.onPageChanged(p)}
          >
            {p}
          </span>
        ))}

        {startIndex + portionSize < pagesCount && (
          <button onClick={() => props.onPageChanged(startIndex + portionSize + 1)}>{'>'}</button>
        )}
      </div>
      {props.users.map((user) => (
        <div key={user.id} className={classes.userCard}>
          <div className={classes.avatar}>
            <img src={user.photos.small !== null ? user.photos.small : userPhoto} alt="avatar" />
            {user.followed ? (
              <button className={classes.unfollowButton} onClick={() => props.unfollow(user.id)}>
                Unfollow
              </button>
            ) : (
              <button className={classes.followButton} onClick={() => props.follow(user.id)}>
                Follow
              </button>
            )}
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

