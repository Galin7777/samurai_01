import  classes from './MyPosts.module.scss';
import { Post } from './Post/Post';
import { TextareaForm } from '../../common/TextareaForm/TextareaForm';
import React, { useMemo } from 'react';

export const MyPosts = React.memo((props) => {
  const postsElements = useMemo(() => {
    return props.posts.map((post) => (
      <Post key={post.id} message={post.message} likesCount={post.likesCount} />
    ));
  }, [props.posts]);

  console.log('RENDER');

  const onAddPost = (newPostText) => {
    props.addPost(newPostText);
  };

  return (
    <div className={classes.postsBlock}>
      <h3>My posts</h3>
      <TextareaForm
        name='newPostText'
        placeholder='Post message'
        onSubmitForm={onAddPost}
        buttontext='Add Post'
      />
      <div className={classes.posts}>
        { postsElements }
      </div>
    </div>
  );
});
