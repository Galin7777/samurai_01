import  classes from './MyPosts.module.scss';
import React from 'react';
import { Post } from './Post/Post';

export const MyPosts = (props) => {

  const posts = [
    {id: 1, message: 'Hi Andrey', likesCount: 5},
    {id: 2, message: 'It s my first post', likesCount: 25},
  ];
  
  const postsElements = posts.map( post => <Post message={posts.message} likesCount={posts.likesCount}/>);

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
