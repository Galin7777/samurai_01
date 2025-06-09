import  classes from './MyPosts.module.scss';
import { Post } from './Post/Post';
import { useForm } from 'react-hook-form';

export const MyPosts = (props) => {
  const postsElements = props.posts.map((post) => <Post key={post.id} message={post.message} likesCount={post.likesCount} />);

  const onAddPost = (newPostText) => {
    props.addPost(newPostText);
  };

  return (
    <div className={classes.postsBlock}>
      <h3>My posts</h3>
      <AddNewPostForm addPost={onAddPost} />
      <div className={classes.posts}>
        { postsElements }
      </div>
    </div>
  );
};

export const AddNewPostForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    props.addPost(data.newPostText);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <textarea {...register('newPostText', { required: 'Заполните поле' })} />
      </div>
      {errors.newPostText && <span>{errors.newPostText.message}</span>}
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};
