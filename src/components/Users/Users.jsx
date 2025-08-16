import { useSelector } from 'react-redux';
import classes from './Users.module.scss';
import { useDispatch } from 'react-redux';
import userPhoto from '../../../src/assets/images/avatar.jpg';
import { NavLink } from 'react-router-dom';
import { follow } from '../../redux/users-reduser';
import { unfollow } from '../../redux/users-reduser';
import { Pagination } from '../common/Pagination/Pagination';

export const Users = ({ users, currentPage, pages, onPageChanged, portionSize }) => {
  const dispatch = useDispatch();
  const isFollowingInProgress = useSelector((state) => state.usersPage.isFollowingInProgress);

  const handleFollow = (userId) => dispatch(follow(userId));

  const handleUnfollow = (userId) => dispatch(unfollow(userId));

  return (
    <div className={classes.usersContainer}>
      {/* Пагинация */}
      <div>
        <Pagination
          currentPage={currentPage}
          pages={pages}
          onPageChanged={onPageChanged}
          portionSize={portionSize}
        />
      </div>

      {/* Список пользователей */}
      {users.map((user) => (
        <div key={user.id} className={classes.userCard}>
          <div className={classes.avatar}>
            <NavLink to={`/profile/${user.id}`}>
              <img src={user.photos.small || userPhoto} alt='avatar' />
            </NavLink>
            <button
              disabled={isFollowingInProgress.some((id) => id === user.id)}
              className={`${user.followed ? classes.unfollowButton : classes.followButton} ${
                isFollowingInProgress.some((id) => id === user.id) ? classes.disabledButton : ''
              }`}
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
