import  classes from './Dialogs.module.scss';
import React from 'react';
import { DialogItem } from './DialogItem';
import { Message } from './Message';

export const Dialogs = (props) => {

const dialogsElements = props.state.dialogs
  .map( dialog => <DialogItem name={dialog.name} id={dialog.id}/> );

const messegesElements = props.state.messages
  .map( message => <Message message={message.message}/> );

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogs__Items}>
        { dialogsElements }
      </div>
      <div className={classes.messages}>
        { messegesElements } 
      </div>
    </div>
  );
};
