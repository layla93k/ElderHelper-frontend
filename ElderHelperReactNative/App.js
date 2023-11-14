import { StyleSheet } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { UserContext } from "./UserContext";

import HomeTabs from "./Components/HomeTabs";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
//import LandingPage from "./Components/LandingPage";

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserContext>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {/* <Stack.Screen
            name="landing-page"
            component={LandingPage}
            options={{ headerShown: false }}
          /> */}
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <Stack.Screen
            name="ElderJobs"
            component={HomeTabs}
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <Stack.Screen
            name="Map"
            component={HomeTabs}
            options={{ headerShown: false, gestureEnabled: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
