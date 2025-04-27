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
  if (routeName === "Home") {
    iconName = focused ? "home" : "home-outline";
  } else if (routeName === "Appointments") {
    iconName = focused ? "calendar" : "calendar-outline";
  } else if (routeName === "Account") {
    iconName = focused ? "person" : "person-outline";
  }
  return <Ionicons name={iconName} size={size} color={color} />;
};

const TabNavigator = () => {
  const language = useSelector((state) => state.language.language);

  const getLabel = (routeName) => {
    switch (routeName) {
      case "Home":
        return language === "es" ? "Inicio" : "Start";
      case "Appointments":
        return language === "es" ? "Citas" : "Appointments";
      case "Account":
        return language === "es" ? "Cuenta" : "Account";
      default:
        return routeName;
    }
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: getLabel(route.name),
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
        name="Home"
        component={HomeStackNavigator}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("Home", {
              screen: "HomeMain",
            });
          },
        })}
      />
      <Tab.Screen
        name="Appointments"
        component={AppointmentsScreen}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
      />
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
