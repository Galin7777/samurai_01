import  classes from './ProfileInfo.module.scss';
import React from 'react';

export const ProfileInfo = () => {
  return (
    <div>
      <div>
        <img src='https://avatars.mds.yandex.net/i?id=c85e9599c8cbbff810260e0081cf57454b817d14-10981924-images-thumbs&n=13' alt='' />
      </div>
      <div className={classes.descriptionBlock}>
        ava + description
      </div>
    </div>
  );
};
