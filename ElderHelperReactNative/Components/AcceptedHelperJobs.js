import { getAcceptedHelperJobs } from "../api";
import { CurrentUser } from "../UserContext";
import { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
const moment = require("moment");

export default function ElderJobs() {
  const [jobsList, setJobsList] = useState([]);
  const { userId } = useContext(CurrentUser);
  const actualUserId = userId.user_id;

  useEffect(() => {
    getAcceptedHelperJobs(actualUserId)
      .then((response) => {
        setJobsList(response.acceptedJobs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [jobsList]);

  const statusMap = {
    1: "Requested",
    2: "Accepted",
    3: "Completed",
    4: "Expired",
  };

  return (
    <ScrollView vertical>
      <View style={styles.container}>
        <SafeAreaView>
          <Text style={styles.text}>Your Accepted jobs</Text>
          {jobsList.map((job, index) => (
            <View index={job.job_id} style={styles.card}>
              <Text style={styles.title}>{job.job_title}</Text>
              <Text style={styles.description}>{job.job_desc}</Text>
              <Text>
                {" "}
                Expires:{" "}
                {moment(job.expiry_date.slice(0, 10)).endOf("day").fromNow()}
              </Text>
              <Text> Status: {statusMap[job.status_id]}</Text>
            </View>
          ))}
        </SafeAreaView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D6EAEE",
  },
  text: {
    fontSize: 30,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
  },
  description: {
    fontSize: 20,
    marginBottom: 10,
  },
  card: {
    shadowOffset: {
      width: 3,
      height: 5,
    },
    marginTop: 10,
    height: 150,
    backgroundColor: "#D6EAEE",
    borderColor: "#0072BB",
    borderWidth: 3,
    borderStyle: "solid",
    borderRadius: 20,
  },
});
