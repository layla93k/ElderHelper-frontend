import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Keyboard,
  Pressable,
  TextInput,
} from "react-native";
import React, { useContext } from "react";
import { UserType } from "../UserContext";

const ChatLive = () => {
  const { userId } = useContext(UserType);

  console.log(userId.first_name);

  return (
    <View style={styles.wrapper}>
      <View style={styles.innerWrapper}></View>
    </View>
  );
};

export default ChatLive;

const styles = StyleSheet.create({
  mainWrapper: {},
});
