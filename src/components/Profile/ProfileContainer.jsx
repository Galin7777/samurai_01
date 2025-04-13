import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Profile } from './Profile';
import { setUserProfile } from '../../redux/profile-reducer';

export const ProfileContainer = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const profile = useSelector((state) => state.profilePage.profile);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`);
        dispatch(setUserProfile(response.data));
      } catch (error) {
        console.error('Ошибка при загрузке профиля:', error);
      }
    };

    fetchProfile();
  }, [dispatch, userId]);

  return <Profile profile={profile}/>;
};
