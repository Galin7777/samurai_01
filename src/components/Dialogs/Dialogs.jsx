import  classes from './Dialogs.module.scss';
import { DialogItem } from './DialogItem';
import { Message } from './Message';
import { TextareaForm } from '../common/TextareaForm/TextareaForm';

export const Dialogs = (props) => {
  const dialogsElements = props.dialogs
    .map((dialog) => <DialogItem key={dialog.id} {...dialog} />);
  const messegesElements = props.messages
    .map((message) => <Message {...message} />);

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogs__Items}>
        { dialogsElements }
      </div>
      <div className={classes.messages}>
        { messegesElements }
      </div>
      <TextareaForm
        name='message'
        placeholder='Enter your message'
        onSubmitForm={props.addMessage}
        buttontext='Add message'
      />
    </div>
  );
};
