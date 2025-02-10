import  classes from './../Dialogs.module.scss';
import React from 'react';
import { NavLink } from 'react-router-dom';

export const DialogItem = (props) => {
  const path = `/dialogs/${props.id}`;

  return (
    <div className={classes.dialog + classes.active}>
      <img src='https://avatars.mds.yandex.net/i?id=2a00000194dc294e86d966c04fc76c0c24c4-1766800-fast-images&n=13' alt=''/>
      <NavLink to={path}>{props.name}</NavLink>
    </div>
  );
};
