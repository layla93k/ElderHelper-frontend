import React, { useContext, useState } from "react";
import {
  Alert,
  Button,
  TextInput,
  Text,
  View,
  StyleSheet,
  Modal,
} from "react-native";
import { patchJob } from "../api";
import { CurrentUser } from "../UserContext";

import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";
import SingleJob from "./SingleJob";

export default EditTask = ({ route }) => {
  const routeJobData = route.params;

  const singleJobData = routeJobData.params.jobData.job;

  const today = new Date();
  const tomorrow = getFormatedDate(today.setDate(today.getDate() + 1));

  const [jobId, setJobId] = useState(SingleJob.job_id);
  const [elderId, setElderId] = useState(singleJobData.elder_id);
  const [expiryDate, setExpiryDate] = useState(tomorrow);
  const [helperId, setHelperId] = useState(singleJobData.helper_id);
  const [jobDescription, setJobDescription] = useState(singleJobData.job_desc);
  const [jobTitle, setJobTitle] = useState(singleJobData.job_title);
  const [postcode, setPostcode] = useState(singleJobData.postcode);
  const [postedDate, setPostedDate] = useState(singleJobData.posted_date);
  const [statusId, setStatusId] = useState(singleJobData.status_id);

  const [open, setOpen] = useState(false);

  const handleJobUpdate = (e) => {
    e.preventDefault();
    {
      patchJob(
        {
          job_id: jobId,
          job_desc: jobDescription,
          job_title: jobTitle,
          posted_date: postedDate,
          expiry_date: expiryDate,
          elder_id: elderId,
          helper_id: helperId,
          status_id: statusId,
          postcode: postcode,
        },
        2
      )
        .then((res) => {
          Alert.alert("Job updated successfully.");
        })
        .catch((err) => {
          console.log(err);
          Alert.alert("Something went wrong.");
        });
    }
  };

  const handleOnPress = () => {
    setOpen(!open);
  };

  //job_id, job_desc, job_title, posted_date, expiry_date, elder_id, helper_id, status_id, postcode

  // user_id: 4,
  // first_name: "Chloe",
  // surname: "White",
  // phoneNumber: "00009012345",
  // postcode: "M9 9II",
  // is_elder: "true",
  // avatar_url: "https://images.unsplash.com/photo-1682687981674-0927add86f2b",
  // profile_msg: "Offering my services for house-sitting.",

  return (
    <View style={styles.form}>
      <View style={styles.question}>
        <Text style={styles.labels}>Job Title</Text>
        <TextInput
          defaultValue={singleJobData.job_title}
          style={styles.textInput}
          onChangeText={(value) => setTitle(value)}
        ></TextInput>
      </View>
      <View style={styles.question}>
        <Text style={styles.labels}>Job Description</Text>
        <TextInput
          defaultValue={singleJobData.job_desc}
          style={styles.bigTextInput}
          onChangeText={(value) => setJobDescription(value)}
        ></TextInput>
      </View>

      <View>
        <Text style={styles.labels}>Deadline: {expiryDate}</Text>
        <Button title="Select deadline" onPress={handleOnPress} />
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
                onSelectedChange={(date) => setExpiryDate(date)}
              />
              <Button title="Select Date" onPress={handleOnPress} />
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.buttons}>
        <Button title="Update job" onPress={handleJobUpdate} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    padding: 10,
    height: 40,
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "#ffffff",
    borderRadius: 5,
  },
  bigTextInput: {
    height: 150,
    padding: 10,
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "#ffffff",
    borderRadius: 5,
  },
});
