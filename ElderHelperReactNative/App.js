import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//import Tabs from "./Navigation/Tabs";
import { UserContext } from "./UserContext";

import Home from "./Components/Home";
import ChatRooms from "./Components/ChatRooms";
import Profile from "./Components/Profile";
import PostJob from "./Components/PostJob";
import SingleJob from "./Components/SingleJob";
import JobsMap from "./Components/Map";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#ffffff",
          boarderRadius: 15,
          height: 90,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                source={require("./assets/Home.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                }}
              />
              <Text
                style={{ color: focused ? "#e32f45" : "#748c94", fontSize: 12 }}
              >
                {" "}
                Home{" "}
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Task Board"
        component={StackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                source={require("./assets/Jobs.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                }}
              />
              <Text
                style={{ color: focused ? "#e32f45" : "#748c94", fontSize: 12 }}
              >
                {" "}
                Task Board{" "}
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Post Job"
        component={PostJob}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                source={require("./assets/PostJob.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                }}
              />
              <Text
                style={{ color: focused ? "#e32f45" : "#748c94", fontSize: 12 }}
              >
                Post Job
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ChatRooms"
        component={ChatRooms}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("./assets/Chat.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                }}
              />
              <Text
                style={{ color: focused ? "#e32f45" : "#748c94", fontSize: 12 }}
              >
                {" "}
                Chat{" "}
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                source={require("./assets/Profile.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                }}
              />
              <Text
                style={{ color: focused ? "#e32f45" : "#748c94", fontSize: 12 }}
              >
                {" "}
                Profile{" "}
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="JobsMap" component={JobsMap} />
      <Stack.Screen name="SignleJob" component={SingleJob} />
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <UserContext>
        <TabNavigator />
      </UserContext>
    </NavigationContainer>
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
