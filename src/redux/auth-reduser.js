import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '../api/api';

const initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  error: null,
};

export const getAuthUserData = createAsyncThunk(
  'auth/getAuthUserData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.getHeaders();
      if (response.resultCode === 0) {
        const { id, email, login } = response.data;
        return { userId: id, email, login, isAuth: true };
      } else {
        return rejectWithValue('Пользователь не авторизован');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Ошибка сети');
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password, rememberMe }, { dispatch, rejectWithValue }) => {
    try {
      const response = await authAPI.login(email, password, rememberMe);
      if (response.resultCode === 0) {
        await dispatch(getAuthUserData()).unwrap();
      } else {
        // Ошибка авторизации
        const message = response.messages.length > 0 ? response.messages[0] : 'Some error';
        return rejectWithValue(message);
      }
    } catch (error) {
      return rejectWithValue('Network error');
    }
  },
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.logout();
      if (response.resultCode === 0) {
        return { userId: null, email: null, login: null, isAuth: false };
      }
      return rejectWithValue('Не удалось выйти');
    } catch (error) {
      return rejectWithValue('Ошибка сети при выходе');
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAuthUserData.fulfilled, (state, action) => {
        const { userId, email, login, isAuth } = action.payload;
        state.userId = userId;
        state.email = email;
        state.login = login;
        state.isAuth = isAuth;
        state.error = null;
      })
      .addCase(getAuthUserData.rejected, (state, action) => {
        state.error = action.payload || 'Ошибка при получении авторизационных данных';
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload || 'Ошибка при получении авторизационных данных';
      })
      .addCase(logout.fulfilled, (state) => {
        state.userId = null;
        state.email = null;
        state.login = null;
        state.isAuth = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload || 'Ошибка при выходе';
      });
  },
});
