import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// import { DialogItem } from './DialogItem';
// import { Message } from './Message';
import { Dialogs } from './Dialogs';
import { sendMessageCreator } from '../../redux/dialogs-reducer';
import { updateNewMessageBodyCreator } from '../../redux/dialogs-reducer';

export const DialogsContainer = () => {
  const dispatch = useDispatch();
  const { dialogs, messages, newMessageBody } = useSelector(state => state.dialogsPage);

  const addMessage = () => {
   dispatch(sendMessageCreator());
  }; 

  const onNewMessageChange = (body) => {
    dispatch(updateNewMessageBodyCreator(body));
  };

  return (<Dialogs addMessage={addMessage} 
                    onNewMessageChange={onNewMessageChange} 
                    dialogs={dialogs} 
                    messages={messages}
                    newMessageBody={newMessageBody} 
    />
  );
};
