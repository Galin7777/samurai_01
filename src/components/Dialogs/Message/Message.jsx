import classes from './../Dialogs.module.scss';
import React from 'react';

export const Message = (props) => {
  const isLeft = props.id % 2 === 0; // Чётные id — слева, нечётные — справа
  const messageClass = isLeft ? classes.messageLeft : classes.messageRight;
  const avatar = 'https://avatars.mds.yandex.net/i?id=2a0000017a084214d23eefb4c49e5ade2f46-4234071-images-thumbs&n=13';

  const newMessageElement = React.createRef();

  const addMessage = () => {
    const text = newMessageElement.current.value;
    alert(text);
  }; 

  return (
    <div className={`${classes.message} ${messageClass}`}>
      <div>
        <textarea ref={newMessageElement}></textarea>
      </div>
      <div>
        <button onClick={ addMessage }>Add message</button>
      </div>
        <img src={avatar} alt='Avatar' className={classes.avatar} />
      <div className={classes.messageText}>{props.message}</div>
    </div>
  );
};
