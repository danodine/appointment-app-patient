import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import SingUpScreen from "../screens/auth/SingUpScreen";
import TabNavigator from "./TabNavigator";
// import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  // const { user } = useSelector((state) => state.auth);

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
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SingUp" component={SingUpScreen} />
      <Stack.Screen name="Dashboard" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
