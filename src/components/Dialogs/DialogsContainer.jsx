import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Dialogs } from './Dialogs';
import { sendMessageCreator } from '../../redux/dialogs-reducer';

export const DialogsContainer = () => {
  const dispatch = useDispatch();
  const { dialogs, messages, newMessageBody } = useSelector((state) => state.dialogsPage);

  const addMessage = (messagesText) => {
    dispatch(sendMessageCreator(messagesText));
  };

  return (<Dialogs addMessage={addMessage}
    dialogs={dialogs}
    messagesText={messages}
    newMessageBody={newMessageBody}
  />
  );
};
