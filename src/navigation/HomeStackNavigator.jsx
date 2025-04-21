import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/dashboard/HomeScreen";
import DoctorSearchScreen from "../screens/dashboard/DoctorSearchScreen";
import DoctorProfileScreen from "../screens/dashboard/DoctorProfileScreen";
import PropTypes from "prop-types";

const Stack = createNativeStackNavigator();

const HomeStackNavigator = ({ route }) => {
  const role = route?.params?.role;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain">
        {(props) => <HomeScreen {...props} role={role} />}
      </Stack.Screen>
      <Stack.Screen name="DoctorSearch" component={DoctorSearchScreen} />
      <Stack.Screen name="DoctorProfile" component={DoctorProfileScreen} />
    </Stack.Navigator>
  );
};
HomeStackNavigator.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      role: PropTypes.string,
    }),
  }),
};

export default HomeStackNavigator;
