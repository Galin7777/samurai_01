import  classes from './Dialogs.module.scss';
import React from 'react';
import { DialogItem } from './DialogItem';
import { Message } from './Message';
import { sendMessageCreator } from '../../redux/state';
import { updateNewMessageBodyCreator } from '../../redux/state';

export const Dialogs = (props) => {

const dialogsElements = props.state.dialogs
  .map( dialog => <DialogItem name={dialog.name} id={dialog.id} photo={dialog.photo} />);

const messegesElements = props.state.messages
  .map( message => <Message message={message.message} id={message.id} dispatch={props.dispatch} />);

  const addMessage = () => {
    props.dispatch(sendMessageCreator());
  }; 

  const onNewMessageChange = (event) => {
    const body = event.target.value;
    props.dispatch(updateNewMessageBodyCreator(body));
  };

  const newMessageBody = props.state.newMessageBody;

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogs__Items}>
        { dialogsElements }
      </div>
      <div className={classes.messages}>
        { messegesElements }
        <div>
          <textarea value={newMessageBody}
                  onChange={onNewMessageChange}
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
