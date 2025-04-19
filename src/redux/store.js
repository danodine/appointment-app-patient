import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import languageReducer from './languageSlice';
import doctorReducer from './doctorSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    language: languageReducer,
    doctor: doctorReducer,
  },
});

export { store };
export default store;