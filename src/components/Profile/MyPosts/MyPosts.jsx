import  classes from './MyPosts.module.scss';
import React from 'react';
import { Post } from './Post/Post';

export const MyPosts = (props) => {
  const postsElements = props.posts.map( post => <Post message={post.message} likesCount={post.likesCount} />);
  const newPostElement = React.createRef();

  const onAddPost = () => {
    props.addPost();
  };
  
  const onPostChange = () => {
    const text = newPostElement.current.value;
    props.updateNewPostText(text);
  };

  return (
    <div className={classes.postsBlock}>
      <h3>My posts</h3>
      <div>
        <div>
        <textarea onChange={ onPostChange } ref={newPostElement} value={props.newPostText} />
        </div>
        <div>
          <button onClick={ onAddPost }>Add post</button>
        </div>
      </div>
      <div className={classes.posts}>
        { postsElements }
      </div>
    </div>
  );
};
