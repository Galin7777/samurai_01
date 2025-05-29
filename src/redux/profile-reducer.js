import { profileAPI } from '../api/api';

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const TOGGLE_PROFILE_LOADING = 'TOGGLE_PROFILE_LOADING';
const SET_STATUS = 'SET_STATUS';


const initialState = {
  posts: [
    { id: 1, message: 'Hi Andrey', likesCount: 5 },
    { id: 2, message: 'It s my first post', likesCount: 25 },
  ],
  newPostText: 'it-kamasutra.com',
  profile: null,
  isLoading: false,
  status: '',
};

export const profileReducer = (state = initialState, action) => {

  switch (action.type) {
    case ADD_POST:
      const newPost = {
        id: state.posts.length + 1,
        message: state.newPostText,
        likesCount: 0,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: '',
      };
    case UPDATE_NEW_POST_TEXT:
      return {
        ...state,
        newPostText: action.newText,
      };

    case SET_STATUS:
      return {
        ...state,
        status: action.status,
      };

    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };

    case TOGGLE_PROFILE_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    default:
      return state;
  }
};

export const addPostActionCreator = () => ({ type: ADD_POST });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const updateNewPostTextActionCreator = (text) =>
  ({ type: UPDATE_NEW_POST_TEXT, newText: text });
export const toggleProfileLoading = (isLoading) => ({ type: TOGGLE_PROFILE_LOADING, isLoading });
export const setStatus = (status) => ({ type: SET_STATUS, status });

export const getUserProfile = (userId) => async (dispatch) => {
  dispatch(toggleProfileLoading(true));
  try {
    const response = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(response));
  } catch (error) {
    console.error('Ошибка при загрузке профиля:', error);
  } finally {
    dispatch(toggleProfileLoading(false));
  }
};

export const getStatus = (userId) => async (dispatch) => {
  try {
    const response = await profileAPI.getStatus(userId);
    console.log('GET status:', response);
    dispatch(setStatus(response));
  } catch (error) {
    console.error('Ошибка при загрузке профиля:', error);
  }
};

export const updateStatus = (status) => async (dispatch) => {
  try {
    const response = await profileAPI.updateStatus(status);
    console.log('PUT status response:', response);
    if (response.resultCode === 0) {
      dispatch(setStatus(status));
    }
  } catch (error) {
    console.error('Ошибка при загрузке профиля:', error);
  }
};
