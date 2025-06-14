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
      };

    default:
      return state;

  };
};

export const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, data: { userId, email, login, isAuth } });

export const getAuthUserData = () => async (dispatch) => {
  try {
    const response = await authAPI.getHeaders();

    if (response.resultCode === 0) {
      const { id, email, login } = response.data;
      dispatch(setAuthUserData(id, email, login, true));
    }
  } catch (error) {
    console.error('Ошибка при получении авторизационных данных:', error);
  }
};

export const login = (email, password, rememberMe) => async (dispatch) => {
  try {
    const response = await authAPI.login(email, password, rememberMe);

    if (response.resultCode === 0) {
      dispatch(getAuthUserData());
    }
  } catch (error) {
    console.error('Ошибка при получении авторизационных данных:', error);
  }
};


export const logout = () => async (dispatch) => {
  try {
    const response = await authAPI.logout();

    if (response.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  } catch (error) {
    console.error('Ошибка при получении авторизационных данных:', error);
  }
};
