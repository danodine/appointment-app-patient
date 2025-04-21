import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackNavigator from "./HomeStackNavigator";
import AppointmentsScreen from "../screens/dashboard/AppointmentsScreen";
import AccountScreen from "../screens/dashboard/AccountScreen";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { COLORS } from "../styles/theme";

const Tab = createBottomTabNavigator();

const getTabBarIcon = (routeName, focused, color, size) => {
  let iconName;
  if (routeName === "Inicio") {
    iconName = focused ? "home" : "home-outline";
  } else if (routeName === "Citas") {
    iconName = focused ? "calendar" : "calendar-outline";
  } else if (routeName === "Cuenta") {
    iconName = focused ? "person" : "person-outline";
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};

const TabNavigator = ({ route }) => {
  const role = route?.params?.role;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: COLORS.secondary,
          borderTopWidth: 1,
          borderColor: COLORS.black,
        },
        headerShown: false,
        tabBarActiveTintColor: COLORS.selectedMenuItem,
        tabBarInactiveTintColor: COLORS.menuItem,
        tabBarIcon: ({ focused, color, size }) =>
          getTabBarIcon(route.name, focused, color, size),
      })}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeStackNavigator}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("Inicio", {
              screen: "HomeMain",
            });
          },
        })}
      />
      <Tab.Screen name="Citas" component={AppointmentsScreen} />
      <Tab.Screen name="Cuenta" component={AccountScreen} />
    </Tab.Navigator>
  );
};

TabNavigator.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      role: PropTypes.string,
    }),
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default TabNavigator;
