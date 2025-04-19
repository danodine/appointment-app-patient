import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import StackNavigator from "./src/navigation/StackNavigator";

const Stack = createNativeStackNavigator();

export default function App() {

  // useEffect(() => {
  //   const loadToken = async () => {
  //     const token = await SecureStore.getItemAsync("token");
  //     if (token) {
  //       return <Stack.Screen name="Home" component={HomeScreen} />;
  //     }
  //   };
  //   loadToken();
  // }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </Provider>
  );
}
