import  classes from './../Dialogs.module.scss';
import { NavLink } from 'react-router-dom';

export const DialogItem = (props) => {
  const path = `/dialogs/${props.id}`;

  return (
    <div className={classes.dialog + classes.active}>
      <img src={props.photo} alt='' />
      <NavLink to={path}>{props.name}</NavLink>
    </div>
  );
};
