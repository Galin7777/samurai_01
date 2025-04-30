import classes from './../Dialogs.module.scss';
import React from 'react';

export const Message = (props) => {
  const isLeft = props.id % 2 === 0; // Чётные id — слева, нечётные — справа
  const messageClass = isLeft ? classes.messageLeft : classes.messageRight;
  const avatar = 'https://avatars.mds.yandex.net/i?id=2a0000017a084214d23eefb4c49e5ade2f46-4234071-images-thumbs&n=13';

  return (
    <div className={`${classes.message} ${messageClass}`}>
      <img src={avatar} alt='Avatar' className={classes.avatar} />
      <div className={classes.messageText}>{props.message}</div>
    </div>
  );
};
