import { authReducer } from './auth-reduser';
import { setAuthUserData } from './auth-reduser';
import { getAuthUserData } from './auth-reduser';

const userId = 123;
const email = 'cnwjkcnq@com.ru';
const login = 'tanya';
const isAuth = true;

const state = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
};

it('should set user data correctly in authReducer', () => {
  //1. test data
  const action = setAuthUserData(userId, email, login, isAuth);
  //2.action
  const newState = authReducer(state, action);
  //3.expectation
  expect(newState.userId).toBe(123);
  expect(newState.email).toBe('cnwjkcnq@com.ru');
  expect(newState.login).toBe('tanya');
  expect(newState.isAuth).toBe(true);
});
