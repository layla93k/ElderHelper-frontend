import { getAcceptedHelperJobs } from "../api";
import { CurrentUser } from "../UserContext";
import { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

export default function ElderJobs() {
  const [jobsList, setJobsList] = useState([]);
  const { userId } = useContext(CurrentUser);
  const actualUserId = userId.user_id;

  useEffect(() => {
    getAcceptedHelperJobs(actualUserId)
      .then((response) => {
        setJobsList(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.text}>Your Accepted jobs</Text>
        {jobsList.map((job, index) => (
          <View style={styles.card}>
            <Text style={styles.title}>{job.job_title}</Text>
            <Text style={styles.description}>{job.job_desc}</Text>
            <Text>Expires: {job.expiry_date.slice(0, 10)}</Text>
            <Text> Status: {job.status_id}</Text>
          </View>
        ))}
      </SafeAreaView>
    </View>
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
