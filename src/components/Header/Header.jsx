import  classes from './Header.module.scss';
import { NavLink } from 'react-router-dom';

export const Header = (props) => {
  return (
    <header className={classes.header}>
      <img src='https://avatars.mds.yandex.net/i?id=a47385fd46bee368cd54ce17cf5406cee4e35f47-9151250-images-thumbs&n=13' alt='' />
      <div className={classes.loginBlock}>
        { props.isAuth
          ? <div>{props.login} <button className={classes.authButton} onClick={props.logout}>Выйти</button></div>
          : <NavLink to={'/login'}className={classes.authButton}>Войти</NavLink>
        } </div>
    </header>
  );
};
