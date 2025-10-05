import { combineReducers } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { profileSlice } from './profile-reducer';
import { dialogsSlice } from './dialogs-reducer';
import { sidebarReducer } from './sidebar-reducer';
import { usersSlice } from './users-reduser';
import { authSlice } from './auth-reduser';
import { appSlice } from './app-reduser';

export const reducer = combineReducers({
  profilePage: profileSlice.reducer,
  dialogsPage: dialogsSlice.reducer,
  sidebar: sidebarReducer,
  usersPage: usersSlice.reducer,
  auth: authSlice.reducer,
  app: appSlice.reducer,
});

export const store = configureStore({
  reducer,
});
