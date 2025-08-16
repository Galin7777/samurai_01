import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// import { shallowEqual } from 'react-redux';
import { MyPosts } from './MyPosts';
import { addPostActionCreator } from '../../../redux/profile-reducer';

export const MyPostsContainer = () => {
  const dispatch = useDispatch();
  const { posts, newPostText } = useSelector((state) => state.profilePage);

  const addPost = useCallback((newPostText) => {
    dispatch(addPostActionCreator(newPostText));
  }, [dispatch]);

  return (<MyPosts addPost={addPost}
    posts={posts}
    newPostText={newPostText} />);
};
