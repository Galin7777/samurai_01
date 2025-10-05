import { usersAPI } from '../api/api';
import { followAPI } from '../api/api';
import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  isFollowingInProgress: [],
  error: null,
};

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async ({ pageNumber, pageSize }, { rejectWithValue }) => {
    try {
      const response = await usersAPI.getUsers(pageNumber, pageSize);
      return {
        users: response.items,
        totalCount: response.totalCount,
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Ошибка при загрузке пользователей');
    }
  },
);

export const follow = createAsyncThunk(
  'users/follow',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await followAPI.postFollow(userId);
      if (response.resultCode === 0) {
        return userId;
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Ошибка при подписке');
    };
  },
);

export const unfollow = createAsyncThunk(
  'users/unfollow',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await followAPI.deleteFollow(userId);
      if (response.resultCode === 0) {
        return userId;
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Ошибка при отписке');
    }
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentPageAC: (state, action) => {
      state.currentPage = action.payload;
    },
    toggleIsFetchingAC: (state, action) => {
      state.isFetching = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.totalUsersCount = action.payload.totalCount;
        state.users = action.payload.users;
        state.isFetching = false;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
      })
      .addCase(follow.fulfilled, (state, action) => {
        state.users = state.users.map((user) =>
          user.id === action.payload ? { ...user, followed: true } : user,
        );
        state.isFollowingInProgress = state.isFollowingInProgress.filter((id) => id !== action.payload);
      })
      .addCase(follow.rejected, (state, action) => {
        state.error = action.payload;
        state.isFollowingInProgress = state.isFollowingInProgress.filter((id) => id !== action.meta.arg);
      })
      .addCase(unfollow.fulfilled, (state, action) => {
        state.users = state.users.map((user) =>
          user.id === action.payload ? { ...user, followed: false } : user,
        );
        state.isFollowingInProgress = state.isFollowingInProgress.filter((id) => id !== action.payload);
      })
      .addCase(unfollow.rejected, (state, action) => {
        state.error = action.payload;
        state.isFollowingInProgress = state.isFollowingInProgress.filter((id) => id !== action.meta.arg);
      });
  },
});

export const { setCurrentPageAC, toggleIsFetchingAC } = usersSlice.actions;
