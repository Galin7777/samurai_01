import { authAPI } from '../api/api';

const SET_USER_DATA = 'SET_USER_DATA';

const initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.data,
        isAuth: true,
      };

    default:
      return state;

  };
};

export const setAuthUserData = (userId, email, login) => ({ type: SET_USER_DATA, data: { userId, email, login } });

export const getAuthUserData = () => async (dispatch) => {
  try {
    const response = await authAPI.getHeaders();

    if (response.resultCode === 0) {
      const { id, email, login } = response.data;
      dispatch(setAuthUserData(id, email, login));
    }
  } catch (error) {
    console.error('Ошибка при получении авторизационных данных:', error);
  }
};
