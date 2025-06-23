import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Profile } from './Profile';
import { getUserProfile } from '../../redux/profile-reducer';
// import { withAuthRedirect } from '../../../src/hoc/withAuthRedirect';
import { Preloader } from '../common/Preloader/Preloader';
import { getStatus } from '../../redux/profile-reducer';
import { updateStatus } from '../../redux/profile-reducer';

export const ProfileContainer = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const profile = useSelector((state) => state.profilePage.profile);
  const isLoading = useSelector((state) => state.profilePage.isLoading);
  const status = useSelector((state) => state.profilePage.status);

  useEffect(() => {
    if (userId) {
      dispatch(getUserProfile(userId));
      dispatch(getStatus(userId));
    }
  }, [dispatch, userId]);

  if (isLoading || !profile) {
    return <Preloader />;
  }
  return < Profile profile={profile} status={status} updateStatus={(status) => dispatch(updateStatus(status))}/>;
};

// export default withAuthRedirect(ProfileContainer);
