import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import settingsReducer from './slices/settingsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    settings: settingsReducer,
  },
});

export default store;