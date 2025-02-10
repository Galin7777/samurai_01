import  classes from './MyPosts.module.scss';
import React from 'react';
import { Post } from './Post/Post';

export const MyPosts = (props) => {

 
  const postsElements = props.posts.map( post => <Post message={post.message} likesCount={post.likesCount} />);

  return (
    <div className={classes.postsBlock}>
      <h3>My posts</h3>
      <div>
        <div>
          <textarea></textarea>
        </div>
        <div>
          <button>Add post</button>
        </div>
      </div>
      <div className={classes.posts}>
        { postsElements }
      </div>
    </div>
  );
};
