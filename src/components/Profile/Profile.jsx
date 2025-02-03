import classes from './Profile.module.scss';
import React from 'react';
import { MyPosts } from './MyPosts/MyPosts';
import { ProfileInfo } from './ProfileInfo/ProfileInfo';


export const Profile = () => {
  return (
    <div>
      <ProfileInfo />
      <MyPosts />
    </div>
  );
};
