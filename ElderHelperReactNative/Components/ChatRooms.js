import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Animated,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";

const ChatRooms = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("07519123456"); //setting defaults for now
  const [firstName, setFirstName] = useState("Jone");
  const [userId, setUserId] = useState("2");

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

        <Button
          title="Back"
          containerStyle={{ marginTop: 100 }}
          onPress={() => navigation.goBack()}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatRooms;

const styles = StyleSheet.create({});
