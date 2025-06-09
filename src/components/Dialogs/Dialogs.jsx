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
      </div>
      <AddMessageForm addMessage={props.addMessage} />
    </div>
  );
};

export const AddMessageForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    props.addMessage(data.message);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <textarea {...register('message', { required: 'Заполните поле' })}
        placeholder="Enter your message"
      />
      {errors.message && <span>{errors.message.message}</span>}
      <div>
        <button>Add message</button>
      </div>
    </form>
  );
};
