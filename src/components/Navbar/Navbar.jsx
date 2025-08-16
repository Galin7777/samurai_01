import classes from './Navbar.module.scss';
import { NavLink } from 'react-router-dom';

export const Navbar = (props) => {

  const getLinkClass = ({ isActive }) =>
    isActive ? `${classes.item} ${classes.activeLink}` : classes.item;

  return (
    <nav className={classes.nav}>
      <div className={classes.item}>
        <NavLink to="/profile" className={getLinkClass}>
          Profile
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/dialogs" className={getLinkClass}>
          Messages
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/news" className={getLinkClass}>
          News
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/music" className={getLinkClass}>
          Music
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/settings" className={getLinkClass}>
          Settings
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/users" className={getLinkClass}>
          Users
        </NavLink>
      </div>
      <div className={classes.sidebar}>
        <h3>Friends</h3>
        <div className={classes.sidebarList}>
          {props.state.map((friend) =>
            <div key={friend.id} className={classes.sidebarCard}>
              <p className={classes.sidebarName}>{friend.name}</p>
              <img src={friend.img} alt={friend.name} className={classes.sidebarAvatar} />
            </div>,
          )}
        </div>
      </div>
    </nav>
  );
};
