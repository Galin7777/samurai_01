import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Dialogs } from './Dialogs';
import { sendMessageCreator } from '../../redux/dialogs-reducer';

export const DialogsContainer = () => {
  const dispatch = useDispatch();
  const { dialogs, messages, newMessageBody } = useSelector((state) => state.dialogsPage);

  const addMessage = (messages) => {
    dispatch(sendMessageCreator(messages));
  };

  return (<Dialogs addMessage={addMessage}
    dialogs={dialogs}
    messages={messages}
    newMessageBody={newMessageBody}
  />
  );
};
