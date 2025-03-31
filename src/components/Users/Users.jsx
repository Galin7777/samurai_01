import React from 'react';
import classes from './Users.module.scss';
import userPhoto from '../../../src/assets/images/avatar.jpg';

export const Users = (props) => {

  const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div className={classes.usersContainer}>
      <div>
        {pages.map((p) => {
          return <span key={p} className={props.currentPage === p ? classes.selectedPage : ''}
            onClick={(e) => props.onPageChanged(p)}>{p}</span>;
        },
        )}
      </div>
      {props.users.map((user) => (
        <div key={user.id} className={classes.userCard}>
          <div className={classes.avatar}>
            <img src={user.photos.small !== null ? user.photos.small : userPhoto} alt="avatar" />
            {user.followed ? (
              <button
                className={classes.unfollowButton}
                onClick={() => props.unfollow(user.id)}
              >
                Unfollow
              </button>
            ) : (
              <button
                className={classes.followButton}
                onClick={() => props.follow(user.id)}
              >
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
