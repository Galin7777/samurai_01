import { ProfileInfo } from './ProfileInfo';
import { MyPostsContainer } from './MyPosts/MyPostsContainer';

export const Profile = (props) => {
  return (
    <div>
      <ProfileInfo savePhoto={props.savePhoto} isOwner={props.isOwner} profile={props.profile} status={props.status} updateStatus={props.updateStatus} />
      <MyPostsContainer />
    </div>
  );
};
