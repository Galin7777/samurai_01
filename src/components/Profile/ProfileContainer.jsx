import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Profile } from './Profile';
import { getUserProfile } from '../../redux/profile-reducer';
import { withAuthRedirect } from '../../../src/hoc/withAuthRedirect';


const ProfileContainer = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const profile = useSelector((state) => state.profilePage.profile);

  useEffect(() => {
    if (userId) {
      dispatch(getUserProfile(userId));
    }
  }, [dispatch, userId]);

  return <Profile profile={profile}/>;
};

export default withAuthRedirect(ProfileContainer);
