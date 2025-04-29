import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import languageReducer from "./languageSlice";
import doctorReducer from "./doctorSlice";
import appointmentsReducer from "./appointmentsSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    language: languageReducer,
    doctor: doctorReducer,
    appointments: appointmentsReducer,
    users: userReducer,
  },
});

export { store };
export default store;
