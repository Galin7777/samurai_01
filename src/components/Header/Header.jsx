import React from 'react';
import  classes from './Header.module.scss';
import { NavLink } from 'react-router-dom';

export const Header = (props) => {
  return (
    <header className={classes.header}>
      <img src='https://avatars.mds.yandex.net/i?id=a47385fd46bee368cd54ce17cf5406cee4e35f47-9151250-images-thumbs&n=13' alt='' />
      <div className={classes.loginBlock}>
        { props.isAuth ? props.login
          : <NavLink to={'/login'}>Login</NavLink>
        } </div>
    </header>
  );
};
