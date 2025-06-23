import { getAuthUserData } from './auth-reduser';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

const initialState = {
  initialized: false,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      };

    default:
      return state;

  };
};

export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS });

export const initializeApp = () => async (dispatch) => {
  try {
    await dispatch(getAuthUserData()); // просто ждём завершения
  } catch (error) {
    console.error('Ошибка при получении авторизационных данных:', error);
  } finally {
    dispatch(initializedSuccess()); // вызывается всегда, даже при ошибке
  }
};
