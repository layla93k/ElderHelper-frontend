import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { fetchJobsWithUsers, deleteJob, patchJob } from "../api";
import { getFormatedDate } from "react-native-modern-datepicker";
import { CurrentUser } from "../UserContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditTask from "./EditTask";

const Stack = createNativeStackNavigator();

export default SingleJobNav = ({ route }) => {
  const { jobData } = route.params;
  const SingleJob = ({ navigation }) => {
    const { userId, setUserId } = useContext(CurrentUser);
    const id = jobData.job.job_id;
    console.log(userId);

    const [jobWithUser, setJobWithUser] = useState({});
    const acceptHandler = (e) => {
      e.preventDefault();
      {
        patchJob(
          {
            job_title: jobData.job.job_title,
            job_desc: jobData.job.job_desc,
            expiry_date: jobData.job.expiry_date,
            helper_id: userId.user_id,
            status_id: 2,
          },
          jobData.job.job_id
        )
          .then((res) => {
            Alert.alert("Job accepted.", "", [
              {
                text: "OK",
                onPress: () => {
                  navigation.goBack();
                },
              },
            ]);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };

    const cancelHandler = (e) => {
      e.preventDefault();
      {
        patchJob(
          {
            job_title: jobData.job.job_title,
            job_desc: jobData.job.job_desc,
            expiry_date: jobData.job.expiry_date,
            helper_id: 1,
            status_id: 1,
          },
          id
        )
          .then((res) => {
            Alert.alert("Job cancelled.", "", [
              {
                text: "OK",
                onPress: () => {
                  navigation.goBack();
                },
              },
            ]);
          })
          .catch((err) => {
            console.log(err);
          });
      } //for deleting jobs as elder  //for cancelling previously accepted job as helper
    };

    const editOwnJobHandler = (e) => {
      e.preventDefault();
      <Button
        title="Edit job"
        onPress={navigation.navigate("EditTask", { params: { jobData } })}
      />;
    }; //for editing own job as elder
    const deleteOwnJobHandler = (e) => {
      e.preventDefault();
      deleteJob(id);
      Alert.alert("Job deleted.", "", [
        {
          text: "OK",
          onPress: () => {
            navigation.goBack();
          },
        },
      ]); //for deleting jobs as elder
    };

    useEffect(() => {
      fetchJobsWithUsers().then((jobs) => {
        const requiredJob = jobs.map((job) => {
          if (job.job_id === id) {
            setJobWithUser(job);
          }
        });
      });
    }, [id]);

    return (
      <View style={styles.container}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>{jobWithUser.job_title}</Text>
          <Text style={styles.requestedBy}>
            Requested by: {jobWithUser.first_name}
          </Text>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.userPicView}>
            <Image
              style={styles.userPic}
              source={{ uri: jobWithUser.avatar_url }}
            ></Image>
          </View>
          <View style={styles.cardInfo}>
            <View style={styles.desc}>
              <Text>{jobWithUser.job_desc}</Text>
            </View>
            <Text>Posted on: {getFormatedDate(jobWithUser.posted_date)}</Text>
            <Text>Deadline: {getFormatedDate(jobWithUser.expiry_date)}</Text>
          </View>
        </View>

        {jobWithUser.status_id === 1 &&
          userId.is_elder == "true" &&
          userId.user_id === jobWithUser.elder_id && (
            <Button title="Edit job" onPress={editOwnJobHandler}></Button>
          )}

        {jobWithUser.status_id === 1 && userId.is_elder === false && (
          <Button title="Accept job" onPress={acceptHandler}></Button>
        )}

        {jobWithUser.status_id === 2 && (
          <Button title="Job taken" disabled={true}></Button>
        )}

        {jobWithUser.status_id === 3 && (
          <Button title="Job complete" disabled={true}></Button>
        )}

        {jobWithUser.status_id === 4 && (
          <Button title="Job expired" disabled={true}></Button>
        )}

        {jobWithUser.status_id === 2 &&
          userId.is_elder === false &&
          userId.user_id === jobWithUser.helper_id && (
            <Button title="Cancel job" onPress={cancelHandler}></Button>
          )}

        {jobWithUser.status_id !== 2 &&
          userId.is_elder === true &&
          userId.user_id === jobWithUser.elder_id && (
            <Button title="Delete job" onPress={deleteOwnJobHandler}></Button>
          )}
      </View>
    );
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SingleJob2" component={SingleJob} />
      <Stack.Screen name="EditTask" component={EditTask} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    color: "#08495d",
  },
  titleBox: {
    textAlign: "center",
    margin: 15,
    paddingLeft: 20,
    paddingTop: 10,
    paddingRight: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#b3e3e3",
    backgroundColor: "#b3e3e3",
  },
  userPic: {
    width: 150,
    height: 150,
    borderRadius: 150,
    padding: 10,
    margin: 10,
  },
  requestedBy: {
    textAlign: "center",
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#08495d",
    backgroundColor: "#08495d",
    color: "#ede7d7",
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#b3e3e3",
    color: "#08495d",
    borderRadius: 10,
  },
  userPicView: {
    flex: 1,
    paddingBottom: 20,
  },
  cardInfo: {
    flex: 1,
    paddingRight: 10,
    paddingBottom: 30,
    margin: 10,

  },
  desc: {
    paddingBottom: 30,
  },

  container: {
    flex: 1,
    backgroundColor: "#ede7d7",
    padding: 8,
    flexDirection: "column",
  },
});
