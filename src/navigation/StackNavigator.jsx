import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/Login/Index";
import SingUpScreen from "../screens/auth/SingUp/Index";
import ForgotPasswordRequestScreen from '../screens/auth/ForgotPasswordRequest/Index';
import ForgotPasswordResetScreen from '../screens/auth/ForgotPasswordReset/Index';
import TabNavigator from "./TabNavigator";
import DoctorSearchScreen from "../screens/dashboard/DoctorSearch/Index";
import DoctorProfileScreen from "../screens/dashboard/DoctorProfile/Index";
import BookAppointmentScreen from "../screens/dashboard/BookAppoitnmet/Index";
import MyProfileScreen from "../screens/dashboard/MyProfile/Index";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        // Dispatch action to restore user from token (optional)
        console.log("Logged in with saved token:", token);
      }
    };
    loadToken();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SingUp" component={SingUpScreen} />
      <Stack.Screen name="ForgotPasswordRequest" component={ForgotPasswordRequestScreen} />
      <Stack.Screen name="ForgotPasswordReset" component={ForgotPasswordResetScreen} />
      <Stack.Screen name="Dashboard" component={TabNavigator} />
      <Stack.Screen name="DoctorSearch" component={DoctorSearchScreen} />
      <Stack.Screen name="DoctorProfile" component={DoctorProfileScreen} />
      <Stack.Screen name="BookAppointment" component={BookAppointmentScreen} />
      <Stack.Screen name="MyProfile" component={MyProfileScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
