import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Profile } from './Profile';
import { getUserProfile } from '../../redux/profile-reducer';
import { Preloader } from '../common/Preloader/Preloader';
import { getStatus } from '../../redux/profile-reducer';
import { updateStatus } from '../../redux/profile-reducer';

export const ProfileContainer = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const profile = useSelector((state) => state.profilePage.profile);
  const isLoading = useSelector((state) => state.profilePage.isLoading);
  const status = useSelector((state) => state.profilePage.status);

  const handleUpdateStatus = useCallback(
    (status) => dispatch(updateStatus(status)),
    [dispatch],
  );

  useEffect(() => {
    if (userId) {
      dispatch(getUserProfile(userId));
      dispatch(getStatus(userId));
    }
  }, [dispatch, userId]);

  if (isLoading || !profile) {
    return <Preloader />;
  }

  return < Profile profile={profile} status={status} updateStatus={handleUpdateStatus}/>;
};
