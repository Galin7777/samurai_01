import  classes from './Dialogs.module.scss';
import React from 'react';
import { DialogItem } from './DialogItem';
import { Message } from './Message';

export const Dialogs = (props) => {
  console.log(props);
const dialogsElements = props.dialogs
  .map( dialog => <DialogItem {...dialog} />);
const messegesElements = props.messages
  .map( message => <Message {...message} />);

  const addMessage = () => {
    props.addMessage();
  }; 

  const onNewMessageChange = (event) => {
    const body = event.target.value;
    props.onNewMessageChange(body);
  };

  const newMessageBody = props.newMessageBody;

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogs__Items}>
        { dialogsElements }
      </div>
      <div className={classes.messages}>
        { messegesElements }
        <div>
          <textarea value={ newMessageBody }
                  onChange= { onNewMessageChange }
                  placeholder='Enter your message'>
          </textarea>
        </div>
      <div>
        <button onClick={ addMessage }>Add message</button>
      </div>
      </div>
    </div>
  );
};
