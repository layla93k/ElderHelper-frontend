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
          <Text style={styles.text}>Your accepted jobs</Text>
          {jobsList.map((job, index) => (
            <View index={job.job_id} style={styles.card}>
              <Text style={styles.jobTitle}>{job.job_title}</Text>
              <Text style={styles.jobInfo}>{job.job_desc}</Text>
              <Text style={styles.jobTextExp}>
                {" "}
                Expires:{" "}
                {moment(job.expiry_date.slice(0, 10)).endOf("day").fromNow()}
              </Text>
              <Text style={styles.acceptedStatus}> Status: {statusMap[job.status_id]}</Text>
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
      backgroundColor: "#ede7d7",
      padding: 8,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  text: {
    fontSize: 40,
    color: "#08495d",
    marginBottom: 15,
    textAlign: "center",
  
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
  },
 
  card: {
    backgroundColor: "#b3e3e3",
    borderRadius: 15,
    // borderWidth: 1,
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
    color: "#08495d",
    alignSelf: "center",
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 20,
  },
  jobInfo: {
    justifyContent: "space-evenly",
    alignContent: "center",
    fontSize: 17,
    textAlign: "center",
    marginBottom: 10,
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
});
