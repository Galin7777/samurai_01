import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { MyPosts } from './MyPosts';
import { addPostActionCreator } from '../../../redux/profile-reducer';
import { updateNewPostTextActionCreator } from '../../../redux/profile-reducer';

export const MyPostsContainer = () => {
  const dispatch = useDispatch();
  const { posts, newPostText } = useSelector(state => state.profilePage);

  const addPost = () => {
    dispatch(addPostActionCreator ());
  };
  
  const onPostChange = (text) => {
    dispatch(updateNewPostTextActionCreator(text));
  };

  return (<MyPosts updateNewPostText={onPostChange} addPost={addPost} 
                  posts={posts}
                  newPostText={newPostText} />);
};
