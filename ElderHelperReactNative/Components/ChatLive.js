import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { CurrentUser } from "../UserContext";

import { AntDesign, Ionicons } from "@expo/vector-icons";

import { io } from "socket.io-client";
// import { socket } from "../utils/index.js";

//change here for live
const socket = io("https://elderhelper.onrender.com/chatting", {
  transports: ["websocket"],
});

const ChatLive = ({ navigation }) => {
  const { userId } = useContext(CurrentUser);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [chatName, setChatName] = useState(userId.first_name || "");

  const sendMessage = (text) => {
    socket.emit("message", { text, userId: userId.user_id });
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      sendMessage(inputMessage);
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length, chatName, message: inputMessage },
      ]);
      setInputMessage("");
      Keyboard.dismiss();
    }
  };

  useEffect(() => {
    socket.on("message", (message) => {
      console.log("useEffect Message", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.chatTitle}>Chat about your job with Logan </Text>
        <View style={styles.messageContainer}>
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Text
                style={styles.messageText}
              >{`${item.chatName}: ${item.message}`}</Text>
            )}
          />
          <View style={styles.form}>
            <TextInput
              style={styles.inputMessage}
              placeholder="Type here"
              value={inputMessage}
              onChangeText={(text) => setInputMessage(text)}
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSendMessage}
            >
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
          <Ionicons
            style={styles.backToChatRoom}
            name="return-up-back"
            size={24}
            color="#0072BB"
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatLive;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,

    backgroundColor: "#EDE7D7",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderRadius: 8,
    padding: 10,
  },
  messageContainer: {
    flex: 0.88,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
  },
  messageText: {
    fontSize: 16,
    margin: 8,
    paddingLeft: 5,
  },
  form: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    paddingBottom: 10,
  },
  inputMessage: {
    flex: 0.9,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 1,
    marginLeft: 10,
  },
  sendButton: {
    flex: 0.1,
    alignItems: "center",
    backgroundColor: "#0072BB",
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 8,
  },
  sendButtonText: {
    color: "#fff",
  },
  backToChatRoom: {
    alignSelf: "flex-end",
    marginRight: 25,
    marginBottom: 5,
  },
  chatTitle: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#08495D",
  },
});

