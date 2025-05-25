import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Profile } from './Profile';
import { getUserProfile } from '../../redux/profile-reducer';
import { withAuthRedirect } from '../../../src/hoc/withAuthRedirect';
import { Preloader } from '../common/Preloader/Preloader';

const ProfileContainer = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const profile = useSelector((state) => state.profilePage.profile);
  const isLoading = useSelector((state) => state.profilePage.isLoading);


  useEffect(() => {
    if (userId) {
      dispatch(getUserProfile(userId));
    }
  }, [dispatch, userId]);

  if (isLoading || !profile) {
    return <Preloader />;
  }
  return <Profile profile={profile}/>;
};

export default withAuthRedirect(ProfileContainer);
