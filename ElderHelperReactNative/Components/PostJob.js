import React, { useContext, useState } from "react";
import { postJob } from "../api";
import {
  Alert,
  Button,
  TextInput,
  Text,
  View,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native";
import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";
import { CurrentUser } from "../UserContext";
import ElderJobs from "./ElderJobs";
const moment = require("moment");

export default PostJob = ({ navigation }) => {
  const today = new Date();
  const tomorrow = getFormatedDate(today.setDate(today.getDate() + 1));
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [expiryDate, setExpiryDate] = useState(tomorrow);
  const [submitMessage, setSubmitMessage] = useState("");
  const { userId, setUserId } = useContext(CurrentUser);
  const [confirmedExpiry, setConfirmedExpiry] = useState(false);

  const validation = () => {
    if (!title) {
      Alert.alert("Please add a title.");
    } else if (!desc) {
      Alert.alert("Please add a description.");
    } else {
      postJob({
        job_title: title,
        job_desc: desc,
        posted_date: today,
        expiry_date: expiryDate,
        elder_id: userId.user_id,
        helper_id: 1,
        postcode: userId.postcode,
      })
        .then((res) => {
          Alert.alert("Job posted successfully!", null, [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("ElderJobs");
              },
            },
          ]);
          setTitle("");
          setDesc("");
          setConfirmedExpiry("");
        })
        .catch((err) => {
          console.log(err);
          setSubmitMessage("Error");
        });
    }
  };

  const handleOnPress = () => {
    setOpen(!open);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#ede7d7", flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: 50,
          paddingHorizontal: 20,
        }}
      >
        <Text style={styles.pageTitle}>Post your job</Text>
        <View style={styles.form}>
          <View style={styles.question}>
            <Text style={styles.labels}>Job Title</Text>
            <TextInput
              placeholder="e.g. Dog walking"
              style={styles.textInput}
              onChangeText={(value) => setTitle(value)}
            ></TextInput>
          </View>
          <View style={styles.question}>
            <Text style={styles.labels}>Job Description</Text>
            <TextInput
              placeholder="e.g. I need a daily dog walker for my two dogs"
              style={styles.bigTextInput}
              multiline
              onChangeText={(value) => setDesc(value)}
            ></TextInput>
          </View>
          <View>
            <Text style={styles.labels}>When do you need this done by?</Text>

            <Pressable onPress={handleOnPress} style={styles.button}>
              <Text style={styles.buttonText}>Select Date</Text>
            </Pressable>
            <Text style={styles.date}>
              {confirmedExpiry ? expiryDate : null}
            </Text>

            <Modal animationType="slide" transparent={true} visible={open}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <DatePicker
                    options={{
                      textHeaderColor: "#0072BB",
                      textDefaultColor: "#0072BB",
                      selectedTextColor: "#0072BB",
                      mainColor: "#9DD8E7",
                      textSecondaryColor: "#D6EAEE",
                    }}
                    mode="calendar"
                    minimumDate={tomorrow}
                    selected={expiryDate}
                    onSelectedChange={(date) => {
                      setExpiryDate(date);
                      setConfirmedExpiry(true);
                    }}
                  />
                  <Pressable onPress={handleOnPress} style={styles.button}>
                    <Text style={styles.buttonText}>Select</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>
          <View>
            <Pressable onPress={validation} style={styles.button}>
              <Text style={styles.buttonText}>Post job</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 10,
    alignItems: "left",
  },
  pageTitle: {
    fontWeight: "bold",
    fontSize: 45,
    color: "#08495d",
  },
  labels: {
    fontWeight: "bold",
    paddingTop: 20,
    paddingBottom: 10,
    fontSize: 20,
    color: "#08495d",
  },
  textInput: {
    fontSize: 20,
    width: 350,
    backgroundColor: "#B3E3E3",
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 5,
  },
  bigTextInput: {
    fontSize: 20,
    height: 150,
    padding: 10,
    borderWidth: 0.5,
    width: 350,
    borderColor: "#000000",
    backgroundColor: "#B3E3E3",
    borderRadius: 5,
  },
  expDate: {
    paddingTop: 30,
    paddingBottom: 30,
  },
  modalView: {
    alignItems: "center",
    width: "90%",
    margin: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  button: {
    backgroundColor: "#08495d",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    elevation: 3,
    marginTop: 10,
    marginLeft: 80,
    width: 200,
    textAlign: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#ede7d7",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.25,
    lineHeight: 21,
  },
  date: {
    fontSize: 28,
    marginBottom: 20,
    color: "#08495d",
    padding: 5,
    marginLeft: 70,
    margin: 10,
    textAlign: "left",
    backgroundColor: "#B3E3E3",
    height: 45,
    borderWidth: 0.5,
    borderRadius: 5,
    alignContent: "center",
    textAlign: "center",
  },
});
