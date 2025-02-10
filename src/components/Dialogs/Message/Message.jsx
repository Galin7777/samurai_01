import  classes from './../Dialogs.module.scss';
import React from 'react';

export const Message = (props) => {
  return (
    <div className={classes.dialog}>{props.message}</div>
  );
};
