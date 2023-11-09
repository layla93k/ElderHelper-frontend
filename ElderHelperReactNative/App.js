import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./Navigation/Tabs";
import { UserContext } from "./UserContext";

export default function App() {
  return (
    <NavigationContainer>
      <UserContext>
        <Tabs />
      </UserContext>
    </NavigationContainer>
  );
}
