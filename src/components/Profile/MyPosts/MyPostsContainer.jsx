import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { MyPosts } from './MyPosts';
import { addPostActionCreator } from '../../../redux/profile-reducer';

export const MyPostsContainer = () => {
  const dispatch = useDispatch();
  const { posts, newPostText } = useSelector((state) => state.profilePage);

  const addPost = (newPostText) => {
    dispatch(addPostActionCreator(newPostText));
  };

  // const onPostChange = (text) => {
  //   dispatch(updateNewPostTextActionCreator(text));
  // };

  return (<MyPosts addPost={addPost}
    posts={posts}
    newPostText={newPostText} />);
};
