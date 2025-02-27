import  classes from './MyPosts.module.scss';
import React from 'react';
import { Post } from './Post/Post';
import { addPostActionCreator } from '../../../redux/profile-reducer';
import { updateNewPostTextActionCreator } from '../../../redux/profile-reducer';

export const MyPosts = (props) => {
  const postsElements = props.posts.map( post => <Post message={post.message} likesCount={post.likesCount} />);
  const newPostElement = React.createRef();

  const addPost = () => {
    props.dispatch(addPostActionCreator ());
  };
  
  const onPostChange = () => {
    const text = newPostElement.current.value;
    const action = updateNewPostTextActionCreator(text);
    props.dispatch(action);
  };

  return (
    <div className={classes.postsBlock}>
      <h3>My posts</h3>
      <div>
        <div>
        <textarea onChange={ onPostChange } ref={newPostElement} value={props.newPostText} />
        </div>
        <div>
          <button onClick={ addPost }>Add post</button>
        </div>
      </div>
      <div className={classes.posts}>
        { postsElements }
      </div>
    </div>
  );
};
