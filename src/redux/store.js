import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import languageReducer from './languageSlice';
import doctorReducer from './doctorSlice';
import appointmentsReducer from './appointmentsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    language: languageReducer,
    doctor: doctorReducer,
    appointments: appointmentsReducer,
  },
});

export { store };
export default store;