import  classes from './Post.module.scss';

export const Post = (props) => {
  return (
    <div>
      <div className={classes.item}>
        <img src='https://avatars.mds.yandex.net/i?id=620690b4324738e8bc21085d860ddbf160d4b499-10471476-images-thumbs&n=13' alt=''/>
        { props.message }
      </div>
      <span>like</span> { props.likesCount }
    </div>
  );
};
