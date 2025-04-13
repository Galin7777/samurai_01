import  classes from './ProfileInfo.module.scss';
import React from 'react';
import { Preloader } from '../../common/Preloader/Preloader';

export const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <div>
      <div>
        <img src='https://avatars.mds.yandex.net/i?id=c85e9599c8cbbff810260e0081cf57454b817d14-10981924-images-thumbs&n=13' alt='' />
      </div>
      <div className={classes.descriptionBlock}>
        <img src={props.profile.photos.large}/>
        {/* <div>contacts={props.profile.contacts}</div> */}
        ava + description
      </div>
    </div>
  );
};
