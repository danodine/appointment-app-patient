import React from "react";
import { useSelector } from "react-redux";
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
  if (routeName === "Inicio" || routeName === "Start") {
    iconName = focused ? "home" : "home-outline";
  } else if (routeName === "Citas" || routeName === "Appointments") {
    iconName = focused ? "calendar" : "calendar-outline";
  } else if (routeName === "Cuenta" || routeName === "Account") {
    iconName = focused ? "person" : "person-outline";
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};

const TabNavigator = () => {

  const language = useSelector((state) => state.language.language);

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
        name={language === "es" ? "Inicio" : "Start"}
        component={HomeStackNavigator}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate(language === "es" ? "Inicio" : "Start", {
              screen: "HomeMain",
            });
          },
        })}
      />
      <Tab.Screen
        name={language === "es" ? "Citas" : "Appointments"}
        component={AppointmentsScreen}
      />
      <Tab.Screen name={language === "es" ? "Cuenta" : "Account"} component={AccountScreen} />
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
