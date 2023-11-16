import { getJobsByElder } from "../api";
import { CurrentUser } from "../UserContext";
import { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
const moment = require("moment");
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SingleJob from "./SingleJob";

const Stack = createNativeStackNavigator();

export default function ElderJobNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ElderJobs"
        component={ElderJobs}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="SingleJob" component={SingleJob} />
    </Stack.Navigator>
  );
}

const ElderJobs = ({ navigation }) => {
  const [elderJobsList, setElderJobsList] = useState([]);
  const { userId } = useContext(CurrentUser);
  const actualUserId = userId.user_id;

  useEffect(() => {
    getJobsByElder(actualUserId)
      .then((response) => {
        setElderJobsList(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [elderJobsList]);

  const statusMap = {
    1: "Requested",
    2: "Accepted",
    3: "Completed",
    4: "Expired",
  };

  //   const pressHandler = (job) => {
  //     navigation.navigate("SingleJob", { jobData: { job } });
  //   };

  return (
    <ScrollView vertical style={{ backgroundColor: "#ede7d7" }}>
      <SafeAreaView style={{ backgroundColor: "#ede7d7" }}>
        <View style={styles.jobsListContainer}>
          <Text style={styles.text}>Your requested jobs</Text>
          {elderJobsList.map((job) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("SingleJob", { jobData: { job } })
              }
            >
              <View key={job.job_id}>
                <View style={styles.job} key={job.job_id}>
                  <Text style={styles.jobTitle}>{job.job_title}</Text>
                  <Text style={styles.jobInfo}>{job.job_desc}</Text>

                  <Text
                    style={
                      job.status_id === 1
                        ? styles.jobTextrequested
                        : job.status_id === 2
                        ? styles.acceptedStatus
                        : job.status_id === 3
                        ? styles.jobTextCompleted
                        : job.status_id === 4
                        ? styles.jobTextExpired
                        : null
                    }
                  >
                    {statusMap[job.status_id]}
                  </Text>
                  <Text style={styles.jobTextExp}>
                    Expires:{" "}
                    {moment(job.expiry_date.slice(0, 10))
                      .endOf("day")
                      .fromNow()}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    color: "#08495d",
    marginBottom: 15,
  },
  jobsListContainer: {
    marginTop: 30,
    flex: 1,
    backgroundColor: "#ede7d7",
    padding: 8,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  job: {
    backgroundColor: "#b3e3e3",
    borderRadius: 15,
    borderColor: "#08495d",
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 18,
    paddingRight: 18,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 0,
    marginBottom: 15,
    height: "auto",
    width: 350,
    elevation: 5,
  },
  jobTitle: {
    marginTop: 10,
    color: "#08495d",
    alignSelf: "center",
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 20,
  },
  jobInfo: {
    justifyContent: "space-evenly",
    alignContent: "center",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
  },
  jobTextrequested: {
    textAlign: "center",
    color: "#08495d",
    fontSize: 20,
    marginBottom: 5,
    fontStyle: "italic",
  },
  jobTextExp: {
    textAlign: "center",
    color: "#08495d",
    fontSize: 15,
    marginBottom: 5,
  },
  acceptedStatus: {
    color: "green",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 5,
    fontWeight: "bold",
  },
  jobTextExpired: {
    color: "red",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 5,
    fontWeight: "bold",
  },
  jobTextCompleted: {
    color: "#08495d",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 5,
    fontWeight: "bold",
  },
});
