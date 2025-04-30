import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/dashboard/Home/Index";
import DoctorSearchScreen from "../screens/dashboard/DoctorSearch/Index";
import DoctorProfileScreen from "../screens/dashboard/DoctorProfile/Index";
import BookAppointmentScreen from "../screens/dashboard/BookAppoitnmet/Index";
import MyProfileScreen from "../screens/dashboard/MyProfile/Index";
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
      <Stack.Screen name="BookAppointment" component={BookAppointmentScreen} />
      <Stack.Screen name="MyProfile" component={MyProfileScreen} />
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
