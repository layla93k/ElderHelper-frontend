import React from 'react';
import { Alert, Text, View, StyleSheet, FlatList, Image, Button, Pressable } from 'react-native';
import { useContext, useState, useEffect } from 'react';
import { getJobsByElderId } from '../api';
import { CurrentUser } from "../UserContext";
import { deleteJob } from '../api';
const moment = require("moment");

export default function ElderJobList({navigation }) {
  const { userId } = useContext(CurrentUser)
    const [jobs, setJobs] = useState([])
    
    useEffect(() => {
        getJobsByElderId(userId.user_id).then((jobs) => {
            setJobs(jobs)
        })
    })

    const pressHandler = (job) => {navigation.navigate("SingleJob", {
        jobData: {job}
      })
    }

    const deleteOwnJobHandler = (job_id) => {
        deleteJob(job_id);
        Alert.alert("Job deleted."); //for deleting jobs as elder
      };

    return (
        <View style={styles.jobsListContainer}>
            <View style={styles.jobsContainer}>
                <FlatList
                    style={styles.jobsList}
                    keyExtractor={(item) => item.job_id }
                    data={jobs}
                    renderItem={({ item }) => (
                        <View style={styles.job} onPress={() => pressHandler(item)}>
                            <Text style={styles.jobTitle}>{item.job_title}</Text>
                            <View style={styles.row}>
                                <Image style={styles.jobImg}src={(userId.avatar_url)}/>
                                <View style={styles.jobInfo}>
                                    <View style={styles.jobUserInfo}>
                                        <Text style={styles.jobTextUserInfo}>{item.first_name}</Text>
                                        </View>
                                        <Text style={styles.jobText}>Posted: {new Date (item.posted_date).toLocaleDateString()}</Text>
                                        {item.status_id === 1 && (
                                        <Text style={styles.jobText}>
                                        Deadline: {new Date (item.expiry_date).toLocaleDateString()}
                                        </Text>
                                         )}
                                        {item.status_id === 1 && (
                                        <Text style={styles.jobText}>
                                        Status: Posted
                                        </Text>
                                         )}
                                         {item.status_id === 2 && (
                                        <Text style={styles.jobText}>
                                        Status: Taken
                                        </Text>
                                         )}
                                         {item.status_id === 3 && (
                                        <Text style={styles.jobText}>
                                        Status: Completed
                                        </Text>
                                         )}
                                         {item.status_id === 4 && (
                                        <Text style={styles.jobText}>
                                        Status: Expired
                                        </Text>
                                         )}
                                         
                                </View>
                            </View>
                            <View style = {styles.buttonView}>
                                          <View style = {styles.editButton}>
                                        <Button title = 'Edit'></Button></View>
                                        <View style = {styles.editButton}><Button title = 'Delete'></Button></View>
                                        </View>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    jobsListContainer: {
      flex: 1,
      backgroundColor: '#ede7d7',
      padding: 8,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonContainer: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonView: {
     flex: 1 
    },
    jobsContainer: {
        flex: 4,
        marginTop: 10,
        alignSelf: 'stretch',
        borderColor: 'black',
    },
    button: {
        backgroundColor: '#08495d',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 5,
        elevation: 3,
        marginTop: 10,
      },
      buttonText: {
        color: '#ede7d7',
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 0.25,
        lineHeight: 21,
      },
    job: {
        backgroundColor: '#b3e3e3',
        borderRadius: 15,
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 18,
        paddingRight: 18,
        marginLeft: 12,
        marginRight: 12,
        marginTop: 0,
        marginBottom: 15,
        height: 'auto',
        elevation: 5,
    },
    jobTitle: {
        color: '#08495d',
        alignSelf: 'center',
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 18,
    },
    jobInfo: {
        justifyContent: 'space-evenly',
        alignContent: 'center',
    },
    jobUserInfo: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    jobImg: {
        width: 70,
        height: 70,
        borderRadius: 50,
    },
    jobTextUserInfo: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#08495d',
        fontSize: 16,
    },
    jobText: {
        textAlign: 'center',
        color: '#08495d',
    }
  });