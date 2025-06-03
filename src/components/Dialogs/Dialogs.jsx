import  classes from './Dialogs.module.scss';
import { useForm } from 'react-hook-form';
import { DialogItem } from './DialogItem';
import { Message } from './Message';

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
        {/* <div>
          <textarea value={ props.newMessageBody }
            onChange={(e) => props.onNewMessageChange(e.target.value)}
            placeholder='Enter your message'>
          </textarea>
        </div>
        <div>
          <button onClick={ props.addMessage }>Add message</button>
        </div> */}
      </div>
      <AddMessageForm />
    </div>
  );
};

export const AddMessageForm = (props) => {
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          value='newMessageBody'
          onChange={(e) => props.onNewMessageChange(e.target.value)}
          placeholder="Enter your message"
        />
      </form>
      <div>
        <button>Add message</button>
      </div>
    </div>
  );
};
