import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { profileAPI } from '../api/api';

const initialState = {
  posts: [
    { id: 1, message: 'Hi Andrey', likesCount: 5 },
    { id: 2, message: 'It s my first post', likesCount: 25 },
  ],
  profile: null,
  isLoading: false,
  status: '',
  error: null,
};

export const getUserProfile = createAsyncThunk(
  'profile/getUserProfile',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await profileAPI.getProfile(userId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Ошибка при загрузке профиля');
    }
  },
);

export const getStatus = createAsyncThunk(
  'profile/getStatus',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await profileAPI.getStatus(userId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Ошибка при загрузке профиля');
    }
  },
);

export const updateStatus = createAsyncThunk(
  'profile/updateStatus',
  async (status, { rejectWithValue }) => {
    try {
      const response = await profileAPI.updateStatus(status);
      if (response.resultCode === 0) {
        return status;
      } else {
        return rejectWithValue('Не удалось обновить статус');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Ошибка при загрузке профиля');
    }
  },
);

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    addPostActionCreator: (state, action) => {
      state.posts.push({
        id: state.posts.length + 1,
        message: action.payload,
      });
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getStatus.fulfilled, (state, action) => {
        state.status = action.payload;
      })
      .addCase(getStatus.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.status = action.payload;
      });
  },
});

export const { addPostActionCreator, deletePost } = profileSlice.actions;
