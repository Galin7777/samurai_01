import React from 'react';
import classes from './Users.module.scss';

export const Users = ({ users, follow, unfollow }) => {
  return (
    <div className={classes.usersContainer}>
      {users.map(user => (
        <div key={user.id} className={classes.userCard}>
          <div className={classes.avatar}>
            <img src={user.photoUrl} alt="avatar" />
            {user.followed ? (
              <button
                className={classes.unfollowButton}
                onClick={() => unfollow(user.id)}
              >
                Unfollow
              </button>
            ) : (
              <button
                className={classes.followButton}
                onClick={() => follow(user.id)}
              >
                Follow
              </button>
            )}
          </div>
          <div className={classes.userInfo}>
            <div className={classes.userName}>{user.fullName}</div>
            <div className={classes.userStatus}>{user.status}</div>
          <div className={classes.userLocation}>
                        {user.location.country}, {user.location.city}
          </div>
          </div>
        </div>
      ))}
    </div>
  );
};
