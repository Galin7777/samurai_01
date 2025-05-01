import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Profile } from './Profile';
import { setUserProfile } from '../../redux/profile-reducer';
import { profileAPI } from '../../api/api';

export const ProfileContainer = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const profile = useSelector((state) => state.profilePage.profile);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await profileAPI.getProfile(userId);
        dispatch(setUserProfile(response));
      } catch (error) {
        console.error('Ошибка при загрузке профиля:', error);
      }
    };

    fetchProfile();
  }, [dispatch, userId]);

  return <Profile profile={profile}/>;
};
