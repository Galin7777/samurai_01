// import classes from './Profile.module.scss';
import React from 'react';
import { MyPosts } from './MyPosts/MyPosts';
import { ProfileInfo } from './ProfileInfo/ProfileInfo';
import { addPost } from '../../redux/state';

export const Profile = (props) => {
  return (
    <div>
      <ProfileInfo />
      <MyPosts posts={props.state.posts} addPost={props.addPost} />
    </div>
  );
};
