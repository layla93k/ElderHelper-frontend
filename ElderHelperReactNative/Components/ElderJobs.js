import { getJobsByElder } from "../api";
import { CurrentUser } from "../UserContext";
import { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ElderJobs() {
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
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your requested jobs</Text>
      {elderJobsList.map((job) => (
        <View style={styles.card} key={job.job_id}>
          <Text style={styles.title}>{job.job_title}</Text>
          <Text style={styles.description}>{job.job_desc}</Text>
          <Text>Expires: {job.expiry_date.slice(0, 10)}</Text>
          <Text> Status: {job.status_id}</Text>
        </View>
      ))}
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
