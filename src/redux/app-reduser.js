import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAuthUserData } from './auth-reduser';

const initialState = {
  initialized: false,
};

export const initializeApp = createAsyncThunk(
  'app/initializeApp',
  async (_, { dispatch }) => {
    await dispatch(getAuthUserData());
    return true;
  },
);

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initializeApp.fulfilled, (state) => {
      state.initialized = true;
    });
  },
});
