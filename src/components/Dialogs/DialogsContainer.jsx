import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Dialogs } from './Dialogs';
import { sendMessageCreator } from '../../redux/dialogs-reducer';
import { withAuthRedirect } from '../../../src/hoc/withAuthRedirect';

const DialogsContainer = () => {
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

export default withAuthRedirect(DialogsContainer);
