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

import { useNavigation } from "@react-navigation/native";
import ChatLive from "./ChatLive";

import React from "react";
import { useState, useEffect, useContext } from "react";
import { CurrentUser } from "../UserContext";
import { getJobsByElderId } from "../api";

import { AntDesign } from "@expo/vector-icons";

import { socket } from "../utils";

const ChatRooms = ({ navigation }) => {
  // const [helperId, setHelperId] = useState({
  //   first_name: "Aiden",
  //   phoneNumber: "00009012345",
  //   user_id: 7,
  // });

  const [jobChats, setJobChats] = useState([]);
  const { userId, setUserId } = useContext(CurrentUser);

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
        <Text>Job Title: {job.job_title}</Text>
        <Text>Expiry Date: {job.expiry_date}</Text>
        <Pressable style={styles.enterChatButton}>
          <AntDesign name="rightcircle" size={24} color="black" />
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
          <Pressable>
            <AntDesign
              name="logout"
              size={30}
              colour="#0072BB"
              onPress={() => navigation.goBack()}
            ></AntDesign>
          </Pressable>
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

export default ChatRooms;

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
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
    backgroundColor: "#D6EAEE",
    padding: 10,
    margin: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
    flexDirection: "column",
  },
  enterChatButton: {
    backgroundColor: "#D6EAEE",
    padding: 2,
  },
});
