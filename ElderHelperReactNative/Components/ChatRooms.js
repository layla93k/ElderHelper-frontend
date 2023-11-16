import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Animated,
  Pressable,
  FlatList,
} from "react-native";

import React from "react";
import { useState, useEffect, useContext } from "react";
import { CurrentUser } from "../UserContext";
import { getJobsByElderId } from "../api";

import { AntDesign } from "@expo/vector-icons";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatLive from "./ChatLive";
const Stack = createNativeStackNavigator();
export default ChatRoomNav = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChatRooms" component={ChatRooms} />
      <Stack.Screen name="ChatLive" component={ChatLive} />
    </Stack.Navigator>
  );
};

const ChatRooms = ({ navigation }) => {
  const [jobChats, setJobChats] = useState([]);
  const { userId, setUserId } = useContext(CurrentUser);
  // console.log(userId);

  useEffect(() => {
    let user_id = userId.user_id;
    getJobsByElderId(user_id)
      .then((response) => {
        setJobChats(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const JobChats = ({ job }) => {
    return (
      <View style={styles.jobContainer}>
        <Text style={styles.job_title}>Chat for: {job.job_title}</Text>
        <Text style={styles.expiry_date}>
          Expiry Date: {job.expiry_date.slice(0, 10)}
        </Text>
        <Pressable style={styles.enterChatButton}>
          <AntDesign
            name="rightcircle"
            size={24}
            color="#0072BB"
            onPress={() => navigation.navigate("ChatLive")}
          />
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.topContainer}>
        <View style={styles.header}>
          <Text style={styles.heading}>
            Hello {userId.first_name}! Here are your available job chats!
          </Text>
        </View>
      </View>

      <View style={styles.listContainer}>
        <View>
          {jobChats && jobChats.length > 0 ? (
            <FlatList
              data={jobChats}
              renderItem={({ item }) => <JobChats job={item} />}
            />
          ) : null}
        </View>
      </View>

      <View style={styles.bottomContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: "#ede7d7",
    alignItems: "center",
  },
  topContainer: {
    backgroundColor: "#fff",
    width: "100%",
    justifyContent: "center",
    flex: 0.15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
  },
  listContainer: {
    flex: 3,
    paddingHorizontal: 10,
  },
  jobContainer: {
    backgroundColor: "#b3e3e3",
    borderRadius: 15,
    borderColor: "#08495d",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 18,
    paddingRight: 18,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 15,
    width: 350,
    elevation: 5,
    backgroundColor: "#b3e3e3",
    padding: 10,
    margin: 10,
    borderRadius: 8,
    flexDirection: "column",
  },
  enterChatButton: {
    backgroundColor: "#b3e3e3",
    padding: 2,
    alignSelf: "center",
    paddingTop: 5,
    margin: 5,
  },
  job_title: {
    color: "#08495d",
    alignSelf: "center",
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 20,
  },
  expiry_date: {
    alignSelf: "center",
  },
});
