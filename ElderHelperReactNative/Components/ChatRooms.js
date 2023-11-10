import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Animated,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import React from "react";
import { useState, useEffect } from "react";

const ChatRooms = ({ navigation }) => {
  const [elderId, setElderId] = useState({
    first_name: "Chloe",
    phoneNumber: "00009012345",
    user_id: 4,
  });

  const [helperId, setHelperId] = useState({
    first_name: "Aiden",
    phoneNumber: "00009012345",
    user_id: 7,
  });

  console.log("\n", "elder:", elderId, "\n", "helper:", helperId);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#D6EAEE",
        padding: 10,
        alignItems: "center",
      }}
    >
      <KeyboardAvoidingView behavior="margin">
        <View style={{ marginTop: 100 }}>
          <Text
            style={{
              alignSelf: "center",
              color: "#0072BB",
              fontSize: 24,
              fontWeight: 600,
              margin: 15,
            }}
          >
            Elder Helper Chat Rooms
          </Text>
          <Text style={{ alignSelf: "center", color: "#0072BB" }}>
            talk with your elder/helper
          </Text>
        </View>
      </KeyboardAvoidingView>

      <View>
        <Text> Your Chat Rooms</Text>
      </View>

      <Button
        title="Back"
        containerStyle={{ marginTop: 100 }}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

export default ChatRooms;

const styles = StyleSheet.create({});
